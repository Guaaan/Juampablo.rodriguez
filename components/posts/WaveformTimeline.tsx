import React, { useState, useRef, useEffect } from 'react';
import type PostType from '@/interfaces/post';

// Post type with visualization-specific fields
interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
}

interface WaveformTimelineProps {
  posts: Post[];
  waveColor?: string;
  glowIntensity?: number;
  animate?: boolean;
  onPostClick?: (slug: string) => void;
}

const WaveformTimeline: React.FC<WaveformTimelineProps> = ({ 
  posts, 
  waveColor = '#00ff88',
  glowIntensity = 0.8,
  animate = true,
  onPostClick 
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [playingPost, setPlayingPost] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [animationPhase, setAnimationPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Ordenar posts por fecha
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Filtrar posts por tags seleccionados
  const filteredPosts = filterTags.length > 0
    ? sortedPosts.filter(p => p.tags?.some(t => filterTags.includes(t)))
    : sortedPosts;

  // Obtener todos los tags únicos
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || [])));

  // Animación de onda
  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 0.1) % (Math.PI * 2));
    }, 50);

    return () => clearInterval(interval);
  }, [animate]);

  // Calcular altura de la barra basado en engagement
  const getBarHeight = (post: Post, index: number) => {
    const baseHeight = 40;
    const tagModifier = (post.tags?.length || 0) * 15;
    const waveModifier = animate 
      ? Math.sin(animationPhase + index * 0.3) * 10 
      : 0;
    return baseHeight + tagModifier + waveModifier;
  };

  const handlePostClick = (post: Post) => {
    if (playingPost === post.slug) {
      setPlayingPost(null);
      onPostClick?.(post.slug);
    } else {
      setPlayingPost(post.slug);
      setTimeout(() => setPlayingPost(null), 1500);
    }
  };

  const toggleTagFilter = (tag: string) => {
    setFilterTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Grid de fondo estilo audio editor */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-full border-t border-green-500"
            style={{ top: `${(i + 1) * 5}%` }}
          />
        ))}
      </div>

      {/* Header con controles */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black via-black/80 to-transparent p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-green-400 text-3xl font-black mb-1 tracking-wider" style={{ fontFamily: 'monospace' }}>
              WAVEFORM TIMELINE
            </h2>
            <p className="text-green-500/70 text-sm" style={{ fontFamily: 'monospace' }}>
              {filteredPosts.length} TRACKS LOADED • {playingPost ? '▶ PLAYING' : '⏸ PAUSED'}
            </p>
          </div>

          {/* Simulación de VU meter */}
          <div className="flex gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-16 rounded-full transition-all duration-100 ${
                  playingPost && i < (Math.sin(animationPhase * 4) + 1) * 10
                    ? 'bg-green-400 shadow-[0_0_10px_#00ff88]'
                    : 'bg-green-900/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Ecualizador de tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => {
            const isActive = filterTags.includes(tag);
            const count = posts.filter(p => p.tags?.includes(tag)).length;
            
            return (
              <button
                key={tag}
                onClick={() => toggleTagFilter(tag)}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-green-400 text-black shadow-[0_0_20px_#00ff88]'
                    : 'bg-green-900/20 text-green-400 border border-green-400/30 hover:bg-green-900/40'
                }`}
              >
                {tag.toUpperCase()} [{count}]
              </button>
            );
          })}
        </div>
      </div>

      {/* Waveform scrollable */}
      <div 
        ref={containerRef}
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-900/20"
        onScroll={handleScroll}
        style={{ height: '60vh' }}
      >
        <div 
          ref={waveformRef}
          className="relative flex items-center gap-2 px-8"
          style={{ 
            minWidth: `${filteredPosts.length * 80}px`,
            height: '100%'
          }}
        >
          {/* Línea central */}
          <div className="absolute left-0 right-0 h-0.5 bg-green-400/20" style={{ top: '50%' }} />

          {/* Barras de waveform */}
          {filteredPosts.map((post, index) => {
            const barHeight = getBarHeight(post, index);
            const isHovered = hoveredBar === index;
            const isPlaying = playingPost === post.slug;
            const scaleFactor = isPlaying ? 1.5 : isHovered ? 1.3 : 1;

            return (
              <div
                key={post.slug}
                className="relative flex flex-col items-center cursor-pointer group"
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                onClick={() => handlePostClick(post)}
              >
                {/* Barra principal */}
                <div 
                  className="relative transition-all duration-300"
                  style={{
                    width: '60px',
                    height: `${barHeight * scaleFactor}px`,
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-t-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(to top, ${waveColor}, ${waveColor}88)`,
                      boxShadow: isPlaying || isHovered 
                        ? `0 0 ${20 * glowIntensity}px ${waveColor}, 0 0 ${40 * glowIntensity}px ${waveColor}66`
                        : `0 0 ${10 * glowIntensity}px ${waveColor}44`
                    }}
                  />

                  {/* Onda expansiva al reproducir */}
                  {isPlaying && (
                    <>
                      <div 
                        className="absolute inset-0 rounded-t-lg animate-ping"
                        style={{
                          background: waveColor,
                          opacity: 0.4
                        }}
                      />
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full animate-pulse"
                        style={{
                          background: `radial-gradient(circle, ${waveColor}88, transparent)`,
                          transform: 'scale(3)'
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Info card al hover */}
                {isHovered && (
                  <div 
                    className="absolute bottom-full mb-4 w-72 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                    style={{ zIndex: 100 }}
                  >
                    <div 
                      className="bg-black/95 backdrop-blur-xl rounded-2xl p-5 border-2 shadow-2xl"
                      style={{
                        borderColor: waveColor,
                        boxShadow: `0 0 30px ${waveColor}66`
                      }}
                    >
                      {/* Cover */}
                      {post.coverImage && (
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-4">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Timestamp */}
                      <div 
                        className="font-mono text-xs font-bold mb-2"
                        style={{ color: waveColor }}
                      >
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        }).replace(/\//g, '.')}
                      </div>

                      {/* Título */}
                      <h3 className="text-white text-lg font-black mb-2 leading-tight">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Tags como botones de canal */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map(tag => (
                            <span 
                              key={tag}
                              className="px-2 py-1 font-mono text-xs font-bold rounded"
                              style={{
                                backgroundColor: `${waveColor}22`,
                                color: waveColor,
                                border: `1px solid ${waveColor}44`
                              }}
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="mt-4 pt-4 border-t border-green-400/20 flex justify-between items-center">
                        <span className="text-green-400/70 text-xs font-mono">
                          TRACK {index + 1} / {filteredPosts.length}
                        </span>
                        <span 
                          className="text-xs font-mono font-bold"
                          style={{ color: waveColor }}
                        >
                          ▶ CLICK TO PLAY
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fecha debajo */}
                <div className="mt-2 text-green-400/50 text-xs font-mono whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }).toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollbar indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64">
        <div className="bg-green-900/20 h-2 rounded-full overflow-hidden backdrop-blur-sm border border-green-400/30">
          <div 
            className="h-full bg-green-400 rounded-full transition-all duration-300 shadow-[0_0_10px_#00ff88]"
            style={{ 
              width: `${((scrollPosition / (waveformRef.current?.scrollWidth || 1)) * 100)}%` 
            }}
          />
        </div>
        <p className="text-center text-green-400/70 text-xs font-mono mt-2">
          TIMELINE POSITION
        </p>
      </div>

      {/* Instrucciones */}
      <div className="absolute bottom-8 right-8 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-green-400/30">
        <div className="space-y-1 text-green-400 text-xs font-mono">
          <p>↔ Scroll horizontal</p>
          <p>🎵 Click para reproducir</p>
          <p>🎚️ Filtros en el header</p>
        </div>
      </div>
    </div>
  );
};

export default WaveformTimeline;
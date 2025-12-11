import React, { useState, useEffect, useRef } from 'react';

interface Post {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  coverImage?: string;
  author?: { name?: string; picture?: string };
  tags?: string[];
}

interface TimelineOrbitProps {
  posts: Post[];
  autoRotate?: boolean;
  rotationSpeed?: number;
  onPostClick?: (slug: string) => void;
}

const TimelineOrbit: React.FC<TimelineOrbitProps> = ({ 
  posts, 
  autoRotate = true, 
  rotationSpeed = 0.2,
  onPostClick 
}) => {
  const [rotation, setRotation] = useState(0);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ordenar posts por fecha
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Auto-rotación
  useEffect(() => {
    if (!autoRotate || isPaused || selectedPost) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + rotationSpeed) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, rotationSpeed, isPaused, selectedPost]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setRotation(prev => (prev + e.deltaY * 0.1) % 360);
  };

  const handlePostClick = (slug: string) => {
    if (selectedPost === slug) {
      setSelectedPost(null);
      onPostClick?.(slug);
    } else {
      setSelectedPost(slug);
    }
  };

  // Calcular posición de cada post en el círculo
  const getPostPosition = (index: number, total: number) => {
    const angle = (index / total) * 360 + rotation;
    const radian = (angle * Math.PI) / 180;
    const radius = 250;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
      angle
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 overflow-hidden"
      onWheel={handleWheel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Grid de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Centro - Timeline circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Círculo orbital */}
        <div className="relative">
          <div className="w-[500px] h-[500px] rounded-full border-2 border-white/20 border-dashed animate-spin-slow" 
               style={{ animationDuration: '60s' }} />
          
          {/* Marcadores de meses */}
          {[0, 90, 180, 270].map((angle, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white/40 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-250px)`
              }}
            />
          ))}

          {/* Posts orbitando */}
          {sortedPosts.map((post, index) => {
            const pos = getPostPosition(index, sortedPosts.length);
            const isHovered = hoveredPost === post.slug;
            const isSelected = selectedPost === post.slug;
            const scale = isSelected ? 3 : isHovered ? 2.5 : 1;

            return (
              <div
                key={post.slug}
                className="absolute transition-all duration-500 ease-out cursor-pointer"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  zIndex: isHovered || isSelected ? 50 : 1
                }}
                onMouseEnter={() => setHoveredPost(post.slug)}
                onMouseLeave={() => setHoveredPost(null)}
                onClick={() => handlePostClick(post.slug)}
              >
                {/* Post círculo base */}
                <div className={`relative transition-all duration-500 ${
                  isHovered || isSelected ? 'w-64 h-64' : 'w-16 h-16'
                }`}>
                  {!isHovered && !isSelected ? (
                    // Vista compacta
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {new Date(post.date).getDate()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Vista expandida
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-purple-500/80 to-pink-500/80 backdrop-blur-xl border-2 border-white/30 shadow-[0_0_60px_rgba(168,85,247,0.8)] overflow-hidden">
                      {/* Cover Image con blur */}
                      {post.coverImage && (
                        <div className="absolute inset-0">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover blur-sm opacity-40"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                        </div>
                      )}
                      
                      {/* Contenido */}
                      <div className="relative h-full flex flex-col justify-between p-6">
                        <div>
                          <div className="text-white/70 text-xs font-semibold mb-2">
                            {new Date(post.date).toLocaleDateString('es-ES', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <h3 className="text-white text-2xl font-black mb-3 leading-tight">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-white/80 text-sm line-clamp-3">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map(tag => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Línea conectora al centro */}
                {(isHovered || isSelected) && (
                  <div 
                    className="absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-white/20 origin-left"
                    style={{
                      width: '250px',
                      transform: `translate(-250px, -50%) rotate(${180 - pos.angle}deg)`,
                      transition: 'opacity 0.3s'
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Centro logo/info */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              <div className="text-center">
                <div className="text-white text-3xl font-black">
                  {sortedPosts.length}
                </div>
                <div className="text-white/70 text-xs font-semibold">
                  POSTS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instrucciones */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className="bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
          <p className="text-white/80 text-sm">
            Hover sobre los posts • Scroll para rotar • Click para enfocar
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineOrbit;
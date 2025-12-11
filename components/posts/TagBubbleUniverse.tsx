import React, { useState, useEffect, useRef } from 'react';
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

interface TagBubbleUniverseProps {
  posts: Post[];
  onPostClick?: (slug: string) => void;
}

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const TagBubbleUniverse: React.FC<TagBubbleUniverseProps> = ({ posts, onPostClick }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [bubbles, setBubbles] = useState<Map<string, Bubble>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Calcular tags y frecuencias
  const tagFrequency = posts.reduce((acc, post) => {
    post.tags?.forEach(tag => {
      acc.set(tag, (acc.get(tag) || 0) + 1);
    });
    return acc;
  }, new Map<string, number>());

  const maxCount = Math.max(...Array.from(tagFrequency.values()));

  // Inicializar burbujas
  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newBubbles = new Map<string, Bubble>();

    Array.from(tagFrequency.entries()).forEach(([tag, count]) => {
      const radius = 30 + (count / maxCount) * 80;
      newBubbles.set(tag, {
        x: Math.random() * (rect.width - radius * 2) + radius,
        y: Math.random() * (rect.height - radius * 2) + radius,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius
      });
    });

    setBubbles(newBubbles);
  }, [posts]);

  // Animación física
  useEffect(() => {
    if (!containerRef.current || selectedTag) return;

    const animate = () => {
      setBubbles(prev => {
        const newBubbles = new Map(prev);
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return prev;

        newBubbles.forEach((bubble, tag) => {
          let { x, y, vx, vy, radius } = bubble;

          x += vx;
          y += vy;

          // Rebote en bordes
          if (x - radius < 0 || x + radius > rect.width) vx *= -0.8;
          if (y - radius < 0 || y + radius > rect.height) vy *= -0.8;

          x = Math.max(radius, Math.min(rect.width - radius, x));
          y = Math.max(radius, Math.min(rect.height - radius, y));

          newBubbles.set(tag, { x, y, vx, vy, radius });
        });

        return newBubbles;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const filteredPosts = selectedTag 
    ? posts.filter(p => p.tags?.includes(selectedTag))
    : [];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0">
        {/* Estrellas de fondo */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>

        {/* Burbujas de tags */}
        {Array.from(tagFrequency.entries()).map(([tag, count]) => {
          const bubble = bubbles.get(tag);
          if (!bubble) return null;

          const isHovered = hoveredTag === tag;
          const isSelected = selectedTag === tag;
          const scale = isHovered ? 1.15 : isSelected ? 1.3 : 1;

          return (
            <div
              key={tag}
              className="absolute cursor-pointer transition-all duration-300"
              style={{
                left: bubble.x,
                top: bubble.y,
                transform: `translate(-50%, -50%) scale(${scale})`,
              }}
              onMouseEnter={() => setHoveredTag(tag)}
              onMouseLeave={() => setHoveredTag(null)}
              onClick={() => handleTagClick(tag)}
            >
              <div
                className={`relative flex items-center justify-center rounded-full backdrop-blur-md border-2 transition-all duration-300 ${
                  isSelected
                    ? 'bg-purple-500/40 border-purple-300 shadow-[0_0_40px_rgba(168,85,247,0.6)]'
                    : isHovered
                    ? 'bg-blue-500/30 border-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                    : 'bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                }`}
                style={{
                  width: bubble.radius * 2,
                  height: bubble.radius * 2,
                }}
              >
                <div className="text-center px-2">
                  <div className="font-bold text-white text-sm mb-1">
                    #{tag}
                  </div>
                  <div className="text-xs text-white/70">
                    {count} post{count !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Posts explosionados */}
        {selectedTag && (
          <div className="absolute inset-0 flex items-center justify-center">
            {filteredPosts.map((post, index) => {
              const angle = (index / filteredPosts.length) * Math.PI * 2;
              const distance = 200;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <div
                  key={post.slug}
                  className="absolute cursor-pointer group"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animation: `float 3s ease-in-out infinite ${index * 0.2}s`
                  }}
                  onClick={() => onPostClick?.(post.slug)}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1 shadow-[0_0_30px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <div className="text-white text-xs font-bold text-center px-3 line-clamp-3">
                          {post.title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Instrucciones */}
        <div className="absolute top-8 left-8 text-white/60 text-sm backdrop-blur-sm bg-black/20 px-4 py-2 rounded-lg">
          {selectedTag ? (
            <p>Click en la burbuja central o en un post para interactuar</p>
          ) : (
            <p>Click en las burbujas para explorar posts por tag</p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(var(--x), var(--y)) translateY(0px); }
          50% { transform: translate(var(--x), var(--y)) translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default TagBubbleUniverse;
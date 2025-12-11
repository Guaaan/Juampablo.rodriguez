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

interface MagneticGridProps {
  posts: Post[];
  columns?: number;
  magneticStrength?: number;
  elasticity?: number;
  onPostClick?: (slug: string) => void;
}

interface CardState {
  offsetX: number;
  offsetY: number;
  scale: number;
  rotation: number;
}

const MagneticGrid: React.FC<MagneticGridProps> = ({ 
  posts, 
  columns = 3,
  magneticStrength = 80,
  elasticity = 0.15,
  onPostClick 
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [cardStates, setCardStates] = useState<Map<string, CardState>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Inicializar estados de cards
  useEffect(() => {
    const initial = new Map<string, CardState>();
    posts.forEach(post => {
      initial.set(post.slug, { offsetX: 0, offsetY: 0, scale: 1, rotation: 0 });
    });
    setCardStates(initial);
  }, [posts]);

  // Seguimiento del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Física magnética
  useEffect(() => {
    if (hoveredCard) return;

    const animate = () => {
      setCardStates(prev => {
        const next = new Map(prev);
        
        cardRefs.current.forEach((cardEl, slug) => {
          const rect = cardEl.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (!containerRect) return;

          const cardCenterX = rect.left + rect.width / 2 - containerRect.left;
          const cardCenterY = rect.top + rect.height / 2 - containerRect.top;

          const deltaX = mousePos.x - cardCenterX;
          const deltaY = mousePos.y - cardCenterY;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          const currentState = prev.get(slug) || { offsetX: 0, offsetY: 0, scale: 1, rotation: 0 };

          if (distance < 300) {
            const force = Math.max(0, (300 - distance) / 300);
            const targetOffsetX = (deltaX / distance) * magneticStrength * force;
            const targetOffsetY = (deltaY / distance) * magneticStrength * force;
            const targetRotation = (deltaX / distance) * force * 5;

            next.set(slug, {
              offsetX: currentState.offsetX + (targetOffsetX - currentState.offsetX) * elasticity,
              offsetY: currentState.offsetY + (targetOffsetY - currentState.offsetY) * elasticity,
              scale: 1 + force * 0.1,
              rotation: currentState.rotation + (targetRotation - currentState.rotation) * elasticity
            });
          } else {
            next.set(slug, {
              offsetX: currentState.offsetX * (1 - elasticity * 2),
              offsetY: currentState.offsetY * (1 - elasticity * 2),
              scale: 1 + (currentState.scale - 1) * (1 - elasticity * 2),
              rotation: currentState.rotation * (1 - elasticity * 2)
            });
          }
        });

        return next;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos, hoveredCard, magneticStrength, elasticity]);

  const handleCardClick = (slug: string) => {
    onPostClick?.(slug);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Efecto de onda en el cursor */}
      <div 
        className="fixed w-32 h-32 rounded-full border-2 border-purple-400/30 pointer-events-none transition-all duration-300"
        style={{
          left: mousePos.x - 64,
          top: mousePos.y - 64,
          transform: hoveredCard ? 'scale(1.5)' : 'scale(1)'
        }}
      />
      <div 
        className="fixed w-64 h-64 rounded-full border border-purple-400/10 pointer-events-none"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128
        }}
      />

      {/* Grid de posts */}
      <div 
        className="grid gap-6 mx-auto max-w-7xl"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` 
        }}
      >
        {posts.map((post) => {
          const state = cardStates.get(post.slug) || { offsetX: 0, offsetY: 0, scale: 1, rotation: 0 };
          const isHovered = hoveredCard === post.slug;

          return (
            <div
              key={post.slug}
              ref={(el) => {
                if (el) cardRefs.current.set(post.slug, el);
              }}
              className="relative cursor-pointer"
              style={{
                transform: `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale}) rotate(${state.rotation}deg)`,
                transition: isHovered ? 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
              }}
              onMouseEnter={() => setHoveredCard(post.slug)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(post.slug)}
            >
              <div className={`relative h-96 rounded-2xl overflow-hidden transition-all duration-300 ${
                isHovered 
                  ? 'shadow-[0_0_60px_rgba(168,85,247,0.6)] scale-110 z-50' 
                  : 'shadow-[0_0_30px_rgba(0,0,0,0.3)]'
              }`}>
                {/* Background con efecto glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md" />
                
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="absolute inset-0">
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isHovered ? 'scale-110 blur-sm opacity-40' : 'opacity-30'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                )}

                {/* Contenido */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {/* Fecha flotante */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-purple-500/80 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-white text-sm font-bold">
                        {new Date(post.date).toLocaleDateString('es-ES', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className={`flex flex-wrap gap-2 mb-4 transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-white/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Título */}
                  <h3 className={`text-white font-black mb-3 transition-all duration-300 ${
                    isHovered ? 'text-4xl' : 'text-2xl'
                  }`}>
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`text-white/80 transition-all duration-300 ${
                    isHovered 
                      ? 'opacity-100 max-h-32 text-base' 
                      : 'opacity-0 max-h-0 text-sm'
                  } overflow-hidden`}>
                    {post.excerpt}
                  </p>

                  {/* Indicador de interacción */}
                  <div className={`mt-4 flex items-center gap-2 text-purple-300 transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <span className="text-sm font-semibold">Leer más</span>
                    <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Borde animado */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                  isHovered 
                    ? 'border-2 border-purple-400/50' 
                    : 'border border-white/10'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Título e instrucciones */}
      <div className="fixed top-8 left-8 z-50">
        <h2 className="text-white text-4xl font-black mb-2">Magnetic Grid</h2>
        <p className="text-white/60 text-sm">Mueve el cursor para interactuar</p>
      </div>
    </div>
  );
};

export default MagneticGrid;
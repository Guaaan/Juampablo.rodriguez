import { useState, useEffect } from 'react';

interface Post {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  coverImage?: string;
  author?: { name?: string; picture?: string };
  tags?: string[];
  contentHtml?: string;
  raw?: string;
}

interface FloatingBubblesVisualizationProps {
  posts: Post[];
}

interface BubblePosition {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
}

export default function FloatingBubblesVisualization({ posts }: FloatingBubblesVisualizationProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [bubblePositions, setBubblePositions] = useState<Record<string, BubblePosition>>({});

  // Inicializar posiciones aleatorias para cada burbuja
  useEffect(() => {
    const initialPositions: Record<string, BubblePosition> = {};
    posts.forEach((post, idx) => {
      const size = 80 + Math.random() * 60; // Tamaño entre 80-140px
      initialPositions[post.slug] = {
        x: Math.random() * 80 + 10, // Porcentaje 10-90%
        y: Math.random() * 80 + 10,
        size,
        velocityX: (Math.random() - 0.5) * 0.3,
        velocityY: (Math.random() - 0.5) * 0.3
      };
    });
    setBubblePositions(initialPositions);
  }, [posts]);

  // Animación de las burbujas
  useEffect(() => {
    if (hoveredPost) return; // No mover si hay hover

    const interval = setInterval(() => {
      setBubblePositions(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(slug => {
          const bubble = updated[slug];
          let newX = bubble.x + bubble.velocityX;
          let newY = bubble.y + bubble.velocityY;
          let newVelocityX = bubble.velocityX;
          let newVelocityY = bubble.velocityY;

          // Rebotar en los bordes
          if (newX <= 5 || newX >= 90) {
            newVelocityX = -bubble.velocityX;
            newX = newX <= 5 ? 5 : 90;
          }
          if (newY <= 5 || newY >= 85) {
            newVelocityY = -bubble.velocityY;
            newY = newY <= 5 ? 5 : 85;
          }

          updated[slug] = {
            ...bubble,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY
          };
        });
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [hoveredPost]);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden">
      <h3 className="absolute top-6 left-6 text-2xl font-bold text-white z-10">
        Explora los Posts
      </h3>
      
      {posts.map((post) => {
        const position = bubblePositions[post.slug];
        if (!position) return null;

        const isHovered = hoveredPost === post.slug;
        const displaySize = isHovered ? position.size * 2 : position.size;

        return (
          <div
            key={post.slug}
            className="absolute cursor-pointer transition-all duration-500 ease-out"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              width: `${displaySize}px`,
              height: `${displaySize}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: isHovered ? 50 : 1
            }}
            onMouseEnter={() => setHoveredPost(post.slug)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            {/* Burbuja */}
            <div 
              className="w-full h-full rounded-full shadow-2xl relative overflow-hidden
                border-4 border-white/20 hover:border-white/40 transition-all"
              style={{
                backgroundImage: post.coverImage 
                  ? `url(${post.coverImage})` 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay con gradiente */}
              <div className={`absolute inset-0 bg-gradient-to-b from-transparent 
                ${isHovered ? 'via-black/50 to-black/80' : 'to-black/60'}
                transition-all duration-500`}
              />

              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                {!isHovered ? (
                  // Título pequeño cuando no hay hover
                  <h4 className="text-white font-bold text-sm line-clamp-2">
                    {post.title}
                  </h4>
                ) : (
                  // Información expandida en hover
                  <div className="space-y-2 animate-fadeIn">
                    <h4 className="text-white font-bold text-xl leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-white/90 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <p className="text-white/70 text-xs">
                      {new Date(post.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap justify-center">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Efecto de brillo */}
              <div className={`absolute inset-0 bg-gradient-to-br from-white/20 to-transparent 
                opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-500`}
              />
            </div>
          </div>
        );
      })}

      {/* Instrucción */}
      <div className="absolute bottom-6 right-6 text-white/50 text-sm">
        Hover sobre las burbujas para ver más
      </div>
    </div>
  );
}
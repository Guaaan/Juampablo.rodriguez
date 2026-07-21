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

interface ConstellationExplorerProps {
  posts: Post[];
  connectionDistance?: number;
  onPostClick?: (slug: string) => void;
}

interface StarPosition {
  x: number;
  y: number;
  size: number;
  brightness: number;
}

const ConstellationExplorer: React.FC<ConstellationExplorerProps> = ({
  posts,
  connectionDistance = 300,
  onPostClick
}) => {
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, zoom: 1 });
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [starPositions, setStarPositions] = useState<Map<string, StarPosition>>(new Map());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generar posiciones de estrellas
  useEffect(() => {
    const positions = new Map<string, StarPosition>();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 400;

    posts.forEach((post, index) => {
      const angle = (index / posts.length) * Math.PI * 2;
      const distance = radius + Math.random() * 200;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      positions.set(post.slug, {
        x,
        y,
        size: 8 + Math.random() * 6,
        brightness: 0.6 + Math.random() * 0.4
      });
    });

    setStarPositions(positions);
  }, [posts]);

  // Calcular conexiones entre posts relacionados
  const getConnections = () => {
    const connections: Array<[string, string, number]> = [];

    posts.forEach((post1, i) => {
      posts.slice(i + 1).forEach(post2 => {
        const commonTags = post1.tags?.filter(t => post2.tags?.includes(t)) || [];
        if (commonTags.length > 0) {
          const pos1 = starPositions.get(post1.slug);
          const pos2 = starPositions.get(post2.slug);

          if (pos1 && pos2) {
            const distance = Math.sqrt(
              Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2)
            );

            if (distance < connectionDistance) {
              connections.push([post1.slug, post2.slug, commonTags.length]);
            }
          }
        }
      });
    });

    return connections;
  };

  const connections = getConnections();

  // Manejo de drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cameraPos.x, y: e.clientY - cameraPos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });

    if (isDragging) {
      setCameraPos({
        ...cameraPos,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(0.5, cameraPos.zoom + delta), 2);
    setCameraPos({ ...cameraPos, zoom: newZoom });
  };

  const handleStarClick = (slug: string) => {
    if (selectedPost === slug) {
      setSelectedPost(null);
      onPostClick?.(slug);
    } else {
      setSelectedPost(slug);
    }
  };

  // Obtener posts conectados
  const getConnectedPosts = (slug: string) => {
    return connections
      .filter(([a, b]) => a === slug || b === slug)
      .map(([a, b]) => a === slug ? b : a);
  };

  const connectedToSelected = selectedPost ? getConnectedPosts(selectedPost) : [];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-white overflow-hidden cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Puntos de fondo decorativos */}
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-accent-7 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.15 + 0.05
            }}
          />
        ))}
      </div>

      {/* Espacio de constelaciones */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${cameraPos.x}px, ${cameraPos.y}px) scale(${cameraPos.zoom})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Conexiones entre posts */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map(([slug1, slug2, strength]) => {
            const pos1 = starPositions.get(slug1);
            const pos2 = starPositions.get(slug2);
            if (!pos1 || !pos2) return null;

            const isHighlighted =
              selectedPost === slug1 ||
              selectedPost === slug2 ||
              hoveredPost === slug1 ||
              hoveredPost === slug2;

            return (
              <line
                key={`${slug1}-${slug2}`}
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke={isHighlighted ? '#7f5af0' : '#333333'}
                strokeWidth={isHighlighted ? 2 : 1}
                opacity={isHighlighted ? 0.7 : 0.15}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Posts como estrellas */}
        {posts.map((post) => {
          const pos = starPositions.get(post.slug);
          if (!pos) return null;

          const isSelected = selectedPost === post.slug;
          const isHovered = hoveredPost === post.slug;
          const isConnected = connectedToSelected.includes(post.slug);
          const shouldGlow = isSelected || isHovered || isConnected;

          // Efecto parallax basado en distancia al mouse
          const deltaX = mousePos.x - pos.x;
          const deltaY = mousePos.y - pos.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const parallaxOffset = Math.max(0, (500 - distance) / 500) * 5;

          return (
            <div
              key={post.slug}
              className="absolute cursor-pointer"
              style={{
                left: pos.x,
                top: pos.y,
                transform: `translate(-50%, -50%) translate(${parallaxOffset}px, ${parallaxOffset}px)`,
                transition: 'transform 0.1s ease-out'
              }}
              onMouseEnter={() => setHoveredPost(post.slug)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleStarClick(post.slug);
              }}
            >
              {/* Estrella base */}
              <div
                className={`relative rounded-full transition-all duration-300 ${
                  shouldGlow
                    ? 'bg-accent'
                    : 'bg-accent-7'
                }`}
                style={{
                  width: pos.size * (isSelected ? 3 : isHovered ? 2 : 1),
                  height: pos.size * (isSelected ? 3 : isHovered ? 2 : 1),
                  opacity: pos.brightness,
                  boxShadow: shouldGlow
                    ? `0 0 ${isSelected ? 20 : 10}px rgba(127, 90, 240, ${isSelected ? 0.5 : 0.3})`
                    : 'none'
                }}
              />

              {/* Info card al hacer hover o seleccionar */}
              {(isHovered || isSelected) && (
                <div
                  className={`absolute left-full ml-4 w-80 transition-all duration-300 ${
                    isSelected ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
                  }`}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  <div className="bg-white rounded-2xl p-6 border-2 border-accent shadow-lg">
                    {/* Cover */}
                    {post.coverImage && (
                      <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Contenido */}
                    <div className="text-accent-7/60 text-xs mb-2">
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="text-black text-xl font-black mb-3 leading-tight">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-accent-7/80 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-accent/10 rounded-full text-accent text-xs font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Indicador de conexiones */}
                    {getConnectedPosts(post.slug).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-accent-7/10">
                        <p className="text-accent-7/60 text-xs">
                          Conectado con {getConnectedPosts(post.slug).length} post{getConnectedPosts(post.slug).length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Controles e info */}
      <div className="absolute top-8 left-8 space-y-4">
        <div className="bg-white px-6 py-4 rounded-2xl border border-accent-7/10 shadow-sm">
          <h2 className="text-black text-2xl font-black mb-2">
            Constellation Explorer
          </h2>
          <p className="text-accent-7/60 text-sm mb-4">
            {posts.length} posts • {connections.length} conexiones
          </p>
          <div className="space-y-2 text-accent-7/50 text-xs">
            <p>🖱️ Arrastra para navegar</p>
            <p>🔍 Scroll para zoom</p>
            <p>⭐ Click en las estrellas</p>
          </div>
        </div>

        {/* Zoom indicator */}
        <div className="bg-white px-4 py-3 rounded-xl border border-accent-7/10 shadow-sm">
          <p className="text-accent-7/50 text-xs mb-1">Zoom</p>
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 bg-accent-7/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${((cameraPos.zoom - 0.5) / 1.5) * 100}%` }}
              />
            </div>
            <span className="text-black text-xs font-bold">
              {Math.round(cameraPos.zoom * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstellationExplorer;

import { useState } from 'react';

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

interface GridVisualizationProps {
  posts: Post[];
}

export default function GridVisualization({ posts }: GridVisualizationProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Explorar Posts</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer
              transform transition-all duration-300 hover:scale-105 hover:z-10 shadow-md hover:shadow-2xl"
            onMouseEnter={() => setHoveredPost(post.slug)}
            onMouseLeave={() => setHoveredPost(null)}
            style={{
              backgroundImage: post.coverImage 
                ? `url(${post.coverImage})` 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Overlay siempre visible con título */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
              flex flex-col justify-end p-4">
              <h4 className="text-white font-bold text-lg">{post.title}</h4>
              
              {/* Info expandida en hover */}
              <div className={`transition-all duration-300 overflow-hidden ${
                hoveredPost === post.slug ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-white/90 text-sm mb-2">{post.excerpt}</p>
                <p className="text-white/70 text-xs mb-2">
                  {new Date(post.date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {post.tags?.map(tag => (
                    <span key={tag} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
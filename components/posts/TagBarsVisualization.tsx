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

interface TagBarsVisualizationProps {
  posts: Post[];
}

export default function TagBarsVisualization({ posts = [] }: TagBarsVisualizationProps) {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  
  // Verificar que posts existe y es un array
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-800">Posts por Categoría</h3>
        <p className="text-gray-500">No hay posts disponibles</p>
      </div>
    );
  }
  
  // Agrupar posts por tags
  const tagGroups = posts.reduce((acc, post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(post);
      });
    }
    return acc;
  }, {} as Record<string, Post[]>);

  const colors = [
    'bg-emerald-500', 
    'bg-sky-500', 
    'bg-violet-500', 
    'bg-amber-500', 
    'bg-rose-500', 
    'bg-indigo-500'
  ];

  // Si no hay tags, mostrar mensaje
  if (Object.keys(tagGroups).length === 0) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-2xl font-bold text-gray-800">Posts por Categoría</h3>
        <p className="text-gray-500">No hay posts con tags disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
      <h3 className="text-2xl font-bold text-gray-800">Posts por Categoría</h3>
      {Object.entries(tagGroups).map(([tag, tagPosts], idx) => (
        <div 
          key={tag}
          className="space-y-2"
          onMouseEnter={() => setHoveredTag(tag)}
          onMouseLeave={() => setHoveredTag(null)}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              {tag}
            </span>
            <span className="text-xs text-gray-500">{tagPosts.length} posts</span>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {tagPosts.map((post) => (
              <div
                key={post.slug}
                className={`w-8 h-8 rounded-full ${colors[idx % colors.length]} 
                  transform transition-all duration-300 cursor-pointer
                  ${hoveredTag === tag ? 'scale-125 shadow-lg' : 'scale-100'}
                  hover:scale-150 relative group`}
                title={post.title}
              >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
                  bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {post.title}
                </div>
              </div>
            ))}
          </div>
          <div className={`h-2 ${colors[idx % colors.length]} rounded-full 
            transition-all duration-500 ${hoveredTag === tag ? 'opacity-100' : 'opacity-30'}`}
            style={{ width: `${(tagPosts.length / posts.length) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}
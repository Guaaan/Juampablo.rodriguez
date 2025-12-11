import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type PostType from '@/interfaces/post';

// Dynamic imports (client-only) to avoid SSR/client markup mismatch
const TagBubbleUniverse = dynamic(() => import('@/components/posts/TagBubbleUniverse'), { ssr: false });
const TimelineOrbit = dynamic(() => import('@/components/posts/TimeLineOrbit'), { ssr: false });
const MagneticGrid = dynamic(() => import('@/components/posts/MagneticGrid'), { ssr: false });
const ConstellationExplorer = dynamic(() => import('@/components/posts/ConstellationExplorer'), { ssr: false });
const WaveformTimeline = dynamic(() => import('@/components/posts/WaveformTimeline'), { ssr: false });

interface ShowcaseProps {
  posts: PostType[];
  onPostClick?: (slug: string) => void;
}

type ComponentId = 'bubble' | 'orbit' | 'magnetic' | 'constellation' | 'waveform';

interface ShowcaseComponent {
  id: ComponentId;
  name: string;
  description: string;
  icon: string;
  color: string;
  component: React.ComponentType<any>;  // Accept any PostType-compatible props
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function PostsShowcase({ posts }: { posts: PostType[] }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');


  const availableComponents: ShowcaseComponent[] = useMemo(() => [
    {
      id: 'bubble',
      name: 'Bubble Universe',
      description: 'Explora posts como burbujas flotantes',
      icon: '🫧',
      color: 'from-purple-500 to-pink-500',
      component: TagBubbleUniverse
    },
    {
      id: 'orbit',
      name: 'Orbital Timeline',
      description: 'Línea temporal circular e interactiva',
      icon: '🌌',
      color: 'from-indigo-500 to-purple-500',
      component: TimelineOrbit
    },
    {
      id: 'magnetic',
      name: 'Magnetic Grid',
      description: 'Grid con física magnética',
      icon: '🧲',
      color: 'from-slate-500 to-purple-500',
      component: MagneticGrid
    },
    {
      id: 'constellation',
      name: 'Constellation Map',
      description: 'Navega constelaciones de contenido',
      icon: '⭐',
      color: 'from-blue-500 to-cyan-500',
      component: ConstellationExplorer
    },
    {
      id: 'waveform',
      name: 'Waveform Audio',
      description: 'Timeline estilo editor de audio',
      icon: '🎵',
      color: 'from-green-500 to-emerald-500',
      component: WaveformTimeline
    }
  ], []);

  // Randomizar orden al montar
  const randomizedComponents = useMemo(() => 
    shuffleArray(availableComponents),
    [] // Solo randomiza una vez
  );

  const currentComponent = randomizedComponents[currentIndex];
  const CurrentDisplay = currentComponent.component;

  // Navegación
  const navigate = (newIndex: number, dir: 'next' | 'prev') => {
    if (isTransitioning) return;
    setDirection(dir);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % randomizedComponents.length;
    navigate(nextIndex, 'next');
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 
      ? randomizedComponents.length - 1 
      : currentIndex - 1;
    navigate(prevIndex, 'prev');
  };

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    navigate(index, index > currentIndex ? 'next' : 'prev');
  };

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isTransitioning]);

  // Handler de navegación a posts
  const handlePostClick = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Componente activo */}
      <div 
        className={`absolute inset-0 transition-all duration-300 ${
          isTransitioning 
            ? direction === 'next' 
              ? 'opacity-0 translate-x-full' 
              : 'opacity-0 -translate-x-full'
            : 'opacity-100 translate-x-0'
        }`}
      >
        <CurrentDisplay posts={posts} onPostClick={handlePostClick} />
      </div>

      {/* UI de controles (resto del código del artifact) */}
      {/* ... */}
    </div>
  );
}
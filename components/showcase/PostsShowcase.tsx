import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type PostType from '@/interfaces/post';

// Dynamic imports (client-only) to avoid SSR/client markup mismatch
const loading = () => (
  <div className="w-full h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 rounded-full border-2 border-accent-7/15 border-t-black animate-spin" />
  </div>
);

const TagBubbleUniverse = dynamic(() => import('@/components/posts/TagBubbleUniverse'), { ssr: false, loading });
const TimelineOrbit = dynamic(() => import('@/components/posts/TimeLineOrbit'), { ssr: false, loading });
const MagneticGrid = dynamic(() => import('@/components/posts/MagneticGrid'), { ssr: false, loading });
const ConstellationExplorer = dynamic(() => import('@/components/posts/ConstellationExplorer'), { ssr: false, loading });
const WaveformTimeline = dynamic(() => import('@/components/posts/WaveformTimeline'), { ssr: false, loading });

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
      color: 'bg-magenta',
      component: TagBubbleUniverse
    },
    {
      id: 'orbit',
      name: 'Orbital Timeline',
      description: 'Línea temporal circular e interactiva',
      icon: '🌌',
      color: 'bg-primary',
      component: TimelineOrbit
    },
    {
      id: 'magnetic',
      name: 'Magnetic Grid',
      description: 'Grid con física magnética',
      icon: '🧲',
      color: 'bg-accent',
      component: MagneticGrid
    },
    {
      id: 'constellation',
      name: 'Constellation Map',
      description: 'Navega constelaciones de contenido',
      icon: '⭐',
      color: 'bg-slateCustom',
      component: ConstellationExplorer
    },
    {
      id: 'waveform',
      name: 'Waveform Audio',
      description: 'Timeline estilo editor de audio',
      icon: '🎵',
      color: 'bg-success',
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
    <div className="relative w-full h-screen overflow-hidden bg-white">
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

      {/* Barra superior: volver + info del modo actual */}
      <div className="absolute top-0 inset-x-0 z-40 flex items-start justify-between gap-4 p-4 md:p-6 pointer-events-none bg-gradient-to-b from-white via-white/70 to-transparent">
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-accent-7/10 shadow-sm text-black text-sm font-medium hover:bg-accent-7/5 transition-colors"
        >
          ‹ inicio
        </Link>

        <div
          className="pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full bg-white border border-accent-7/10 shadow-sm"
          title={currentComponent.name}
          aria-label={currentComponent.name}
        >
          <span className="text-xl leading-none">{currentComponent.icon}</span>
        </div>
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={goToPrevious}
        aria-label="Vista anterior"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-11 h-11 rounded-full bg-white border border-accent-7/10 shadow-sm text-black hover:bg-accent-7/5 transition-colors"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        aria-label="Siguiente vista"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-11 h-11 rounded-full bg-white border border-accent-7/10 shadow-sm text-black hover:bg-accent-7/5 transition-colors"
      >
        ›
      </button>

      {/* Selector de vistas + atajos de teclado */}
      <div className="absolute bottom-0 inset-x-0 z-40 flex flex-col items-center gap-3 p-4 md:p-6 pointer-events-none bg-gradient-to-t from-white via-white/70 to-transparent">
        <div className="pointer-events-auto flex items-center gap-2 px-2 py-2 rounded-full bg-white border border-accent-7/10 shadow-sm">
          {randomizedComponents.map((comp, index) => (
            <button
              key={comp.id}
              onClick={() => goToIndex(index)}
              aria-label={comp.name}
              title={comp.name}
              className={`flex items-center justify-center w-9 h-9 rounded-full text-base transition-all duration-300 ${
                index === currentIndex
                  ? `${comp.color} scale-110 shadow-md`
                  : 'bg-accent-7/5 hover:bg-accent-7/10 opacity-70 hover:opacity-100'
              }`}
            >
              {comp.icon}
            </button>
          ))}
        </div>
        <p className="hidden md:block text-accent-7/40 text-xs">
          Usá las flechas ← → del teclado para cambiar de vista
        </p>
      </div>
    </div>
  );
}

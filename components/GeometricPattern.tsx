import React, { useState, useEffect, useRef } from 'react'

type Shape =
  | { type: 'circle'; cx: number; cy: number; r: number; opacity: number; colorIndex: 0 | 1 | 2; depth?: number }
  | { type: 'rect'; x: number; y: number; size: number; rotate: number; opacity: number; colorIndex: 0 | 1 | 2; depth?: number }
  | { type: 'triangle'; points: string; opacity: number; colorIndex: 0 | 1 | 2; depth?: number }

// Versión normalizada (0-1) para mejor escalabilidad
const LAYOUTS: Shape[][] = [
  [
    { type: 'circle', cx: 0.175, cy: 0.767, r: 0.325, opacity: 0.9, colorIndex: 0, depth: 0.2 },
    { type: 'rect', x: 0.475, y: 0.133, size: 0.375, rotate: 45, opacity: 0.8, colorIndex: 1, depth: 0.5 },
    { type: 'triangle', points: '0.65,1 1,0.5 1,1', opacity: 0.85, colorIndex: 2, depth: 0.8 },
  ],
  [
    { type: 'triangle', points: '0,1 0.45,0.2 0.8,1', opacity: 0.85, colorIndex: 1, depth: 0.3 },
    { type: 'circle', cx: 0.825, cy: 0.233, r: 0.25, opacity: 0.85, colorIndex: 2, depth: 0.7 },
    { type: 'rect', x: 0.05, y: 0.067, size: 0.275, rotate: 20, opacity: 0.75, colorIndex: 0, depth: 0.4 },
  ],
  [
    { type: 'rect', x: 0.1, y: 0.3, size: 0.475, rotate: 12, opacity: 0.85, colorIndex: 2, depth: 0.6 },
    { type: 'circle', cx: 0.75, cy: 0.733, r: 0.3, opacity: 0.8, colorIndex: 0, depth: 0.2 },
    { type: 'triangle', points: '0.375,0 0.65,0.4 0.1,0.4', opacity: 0.85, colorIndex: 1, depth: 0.9 },
  ],
  [
    { type: 'circle', cx: 0.5, cy: 0.5, r: 0.28, opacity: 0.75, colorIndex: 1, depth: 0.5 },
    { type: 'rect', x: 0.1, y: 0.1, size: 0.2, rotate: 25, opacity: 0.8, colorIndex: 2, depth: 0.3 },
    { type: 'rect', x: 0.7, y: 0.7, size: 0.25, rotate: -15, opacity: 0.7, colorIndex: 0, depth: 0.8 },
    { type: 'triangle', points: '0.15,0.15 0.35,0.05 0.25,0.35', opacity: 0.8, colorIndex: 2, depth: 0.4 },
  ],
  [
    { type: 'triangle', points: '0.5,0 1,0.866 0,0.866', opacity: 0.9, colorIndex: 0, depth: 0.2 },
    { type: 'circle', cx: 0.2, cy: 0.3, r: 0.15, opacity: 0.75, colorIndex: 1, depth: 0.7 },
    { type: 'circle', cx: 0.8, cy: 0.4, r: 0.12, opacity: 0.7, colorIndex: 2, depth: 0.6 },
    { type: 'rect', x: 0.35, y: 0.65, size: 0.3, rotate: 45, opacity: 0.8, colorIndex: 1, depth: 0.9 },
  ],
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

// Generador pseudoaleatorio mejorado basado en seed
class SeededRandom {
  private seed: number

  constructor(seedStr: string) {
    this.seed = hashString(seedStr)
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  range(min: number, max: number): number {
    return min + this.next() * (max - min)
  }

  choice<T>(array: readonly T[]): T {
    return array[Math.floor(this.next() * array.length)]
  }
}

// Generar figuras aleatorias
function generateRandomShapes(seedStr: string): Shape[] {
  const rng = new SeededRandom(seedStr + Math.random())
  const numShapes = Math.floor(rng.range(4, 7))
  const shapes: Shape[] = []
  const shapeTypes = ['circle', 'rect', 'triangle'] as const

  for (let i = 0; i < numShapes; i++) {
    const type = rng.choice(shapeTypes)
    const colorIndex = Math.floor(rng.next() * 3) as 0 | 1 | 2
    const depth = rng.range(0.1, 1)

    if (type === 'circle') {
      shapes.push({
        type: 'circle',
        cx: rng.range(0.1, 0.9),
        cy: rng.range(0.1, 0.9),
        r: rng.range(0.08, 0.35),
        opacity: rng.range(0.6, 0.95),
        colorIndex,
        depth,
      })
    } else if (type === 'rect') {
      const size = rng.range(0.15, 0.4)
      const x = rng.range(0, 1 - size)
      const y = rng.range(0, 1 - size)
      shapes.push({
        type: 'rect',
        x,
        y,
        size,
        rotate: rng.range(0, 360),
        opacity: rng.range(0.6, 0.95),
        colorIndex,
        depth,
      })
    } else {
      // Triangle
      const x1 = rng.range(0.1, 0.9)
      const y1 = rng.range(0.1, 0.9)
      const x2 = rng.range(0.1, 0.9)
      const y2 = rng.range(0.1, 0.9)
      const x3 = rng.range(0.1, 0.9)
      const y3 = rng.range(0.1, 0.9)
      shapes.push({
        type: 'triangle',
        points: `${x1},${y1} ${x2},${y2} ${x3},${y3}`,
        opacity: rng.range(0.6, 0.95),
        colorIndex,
        depth,
      })
    }
  }

  return shapes
}

type Props = {
  /** [análogo -30°, color base, análogo +30°] */
  colors: [string, string, string]
  /** Determina qué composición de figuras usar (misma sección = misma composición) */
  seed?: string
  className?: string
  /** Habilitar efecto parallax */
  enableParallax?: boolean
  /** Intensidad del parallax (0-1) */
  parallaxIntensity?: number
  /** Usar figuras completamente aleatorias (true) o layouts predefinidos (false) */
  randomize?: boolean
}

const GeometricPattern: React.FC<Props> = ({ 
  colors, 
  seed = '', 
  className = '',
  enableParallax = true,
  parallaxIntensity = 0.15,
  randomize = true,
}) => {
  // Generar un seed aleatorio una vez al montar si no hay seed y randomize es true
  const [randomSeed] = useState(() => Math.random().toString())
  const [isMounted, setIsMounted] = useState(false)
  const finalSeed = seed || randomSeed
  const layout = randomize 
    ? generateRandomShapes(finalSeed)
    : LAYOUTS[hashString(finalSeed) % LAYOUTS.length]
  
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Marcar como montado para evitar errores de hidratación
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!enableParallax || !isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      setOffset({ x: x * parallaxIntensity, y: y * parallaxIntensity })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [enableParallax, parallaxIntensity])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden ${className}`}
      style={{ backgroundColor: `${colors[1]}14` }}
    >
      {isMounted && (
        <svg 
          viewBox="0 0 1 1" 
          preserveAspectRatio="xMidYMid slice" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        >
          {layout.map((shape, i) => {
            const fill = colors[shape.colorIndex]
            const depth = shape.depth ?? 0.5
            const parallaxOffset = {
              x: offset.x * depth,
              y: offset.y * depth,
            }
            const duration = 8 + i * 2

            if (shape.type === 'circle') {
              return (
                <g key={i}>
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 0.5 0.5`}
                    to={`360 0.5 0.5`}
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                  />
                  <circle 
                    cx={shape.cx + parallaxOffset.x} 
                    cy={shape.cy + parallaxOffset.y} 
                    r={shape.r} 
                    fill={fill} 
                    opacity={shape.opacity}
                  />
                </g>
              )
            }
            if (shape.type === 'rect') {
              const cx = shape.x + shape.size / 2 + parallaxOffset.x
              const cy = shape.y + shape.size / 2 + parallaxOffset.y
              return (
                <g key={i}>
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 0.5 0.5`}
                    to={`360 0.5 0.5`}
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                  />
                  <rect
                    x={shape.x + parallaxOffset.x}
                    y={shape.y + parallaxOffset.y}
                    width={shape.size}
                    height={shape.size}
                    fill={fill}
                    opacity={shape.opacity}
                    transform={`rotate(${shape.rotate} ${cx} ${cy})`}
                  />
                </g>
              )
            }
            
            const basePoints = shape.points.split(' ').map(p => {
              const [px, py] = p.split(',').map(Number)
              return `${px + parallaxOffset.x},${py + parallaxOffset.y}`
            }).join(' ')
            
            return (
              <g key={i}>
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from={`0 0.5 0.5`}
                  to={`360 0.5 0.5`}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
                <polygon 
                  points={basePoints} 
                  fill={fill} 
                  opacity={shape.opacity}
                />
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}

export default GeometricPattern

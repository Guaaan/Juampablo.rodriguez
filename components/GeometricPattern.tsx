import React, { useState, useEffect } from 'react'

type Shape =
  | { type: 'circle'; cx: number; cy: number; r: number; opacity: number; colorIndex: 0 | 1 | 2; depth?: number }
  | { type: 'square'; cx: number; cy: number; size: number; opacity: number; colorIndex: 0 | 1 | 2; depth?: number }
  | { type: 'rect'; cx: number; cy: number; width: number; height: number; opacity: number; colorIndex: 0 | 1 | 2; depth?: number }
  | { type: 'triangle'; cx: number; cy: number; r: number; rotation: number; opacity: number; colorIndex: 0 | 1 | 2; depth?: number }

// Versión normalizada (0-1) para mejor escalabilidad
const LAYOUTS: Shape[][] = [
  [
    { type: 'circle', cx: 0.175, cy: 0.767, r: 0.2, opacity: 0.9, colorIndex: 0, depth: 0.2 },
    { type: 'rect', cx: 0.6625, cy: 0.32, width: 0.3, height: 0.2, opacity: 0.8, colorIndex: 1, depth: 0.5 },
    { type: 'triangle', cx: 0.85, cy: 0.83, r: 0.2, rotation: 160, opacity: 0.85, colorIndex: 2, depth: 0.8 },
  ],
  [
    { type: 'triangle', cx: 0.42, cy: 0.65, r: 0.28, rotation: 0, opacity: 0.85, colorIndex: 1, depth: 0.3 },
    { type: 'circle', cx: 0.825, cy: 0.233, r: 0.15, opacity: 0.85, colorIndex: 2, depth: 0.7 },
    { type: 'square', cx: 0.19, cy: 0.2, size: 0.22, opacity: 0.75, colorIndex: 0, depth: 0.4 },
  ],
  [
    { type: 'rect', cx: 0.34, cy: 0.54, width: 0.38, height: 0.24, opacity: 0.85, colorIndex: 2, depth: 0.6 },
    { type: 'circle', cx: 0.75, cy: 0.733, r: 0.18, opacity: 0.8, colorIndex: 0, depth: 0.2 },
    { type: 'triangle', cx: 0.35, cy: 0.15, r: 0.22, rotation: 30, opacity: 0.85, colorIndex: 1, depth: 0.9 },
  ],
  [
    { type: 'circle', cx: 0.5, cy: 0.5, r: 0.16, opacity: 0.75, colorIndex: 1, depth: 0.5 },
    { type: 'square', cx: 0.2, cy: 0.2, size: 0.16, opacity: 0.8, colorIndex: 2, depth: 0.3 },
    { type: 'rect', cx: 0.8, cy: 0.8, width: 0.22, height: 0.16, opacity: 0.7, colorIndex: 0, depth: 0.8 },
    { type: 'triangle', cx: 0.22, cy: 0.78, r: 0.14, rotation: 210, opacity: 0.8, colorIndex: 2, depth: 0.4 },
  ],
  [
    { type: 'triangle', cx: 0.5, cy: 0.58, r: 0.32, rotation: 0, opacity: 0.9, colorIndex: 0, depth: 0.2 },
    { type: 'circle', cx: 0.2, cy: 0.3, r: 0.11, opacity: 0.75, colorIndex: 1, depth: 0.7 },
    { type: 'circle', cx: 0.8, cy: 0.4, r: 0.09, opacity: 0.7, colorIndex: 2, depth: 0.6 },
    { type: 'square', cx: 0.5, cy: 0.8, size: 0.18, opacity: 0.8, colorIndex: 1, depth: 0.9 },
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

type Placed = { cx: number; cy: number; footprint: number }
type Candidate = { cx: number; cy: number; footprint: number; shape: Shape }

const MAX_PLACEMENT_ATTEMPTS = 40
const MIN_GAP_FACTOR = 0.85

function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by)
}

// Qué tan "libre" queda una figura candidata respecto a las ya colocadas
// (valor >= 0 significa que no se solapa)
function clearance(candidate: { cx: number; cy: number; footprint: number }, placed: Placed[]): number {
  if (placed.length === 0) return Infinity
  return Math.min(
    ...placed.map(
      (p) => distance(candidate.cx, candidate.cy, p.cx, p.cy) - (candidate.footprint + p.footprint) * MIN_GAP_FACTOR
    )
  )
}

function buildCandidate(
  type: 'circle' | 'rect' | 'triangle' | 'square',
  rng: SeededRandom,
  colorIndex: 0 | 1 | 2,
  depth: number,
  opacity: number
): Candidate {
  if (type === 'circle') {
    const r = rng.range(0.08, 0.2)
    const cx = rng.range(r, 1 - r)
    const cy = rng.range(r, 1 - r)
    return { cx, cy, footprint: r, shape: { type: 'circle', cx, cy, r, opacity, colorIndex, depth } }
  }

  if (type === 'square') {
    const size = rng.range(0.15, 0.3)
    const half = size / 2
    const cx = rng.range(half, 1 - half)
    const cy = rng.range(half, 1 - half)
    return { cx, cy, footprint: half * Math.SQRT2, shape: { type: 'square', cx, cy, size, opacity, colorIndex, depth } }
  }

  if (type === 'rect') {
    // Ancho y alto varían de forma independiente: son dos lados distintos, no un cuadrado
    const width = rng.range(0.15, 0.32)
    const height = rng.range(0.15, 0.32)
    const cx = rng.range(width / 2, 1 - width / 2)
    const cy = rng.range(height / 2, 1 - height / 2)
    return {
      cx,
      cy,
      footprint: Math.hypot(width, height) / 2,
      shape: { type: 'rect', cx, cy, width, height, opacity, colorIndex, depth },
    }
  }

  // Triángulo equilátero: los 3 lados miden siempre lo mismo
  const r = rng.range(0.14, 0.3)
  const cx = rng.range(r, 1 - r)
  const cy = rng.range(r, 1 - r)
  const rotation = rng.range(0, 360)
  return { cx, cy, footprint: r, shape: { type: 'triangle', cx, cy, r, rotation, opacity, colorIndex, depth } }
}

// Genera figuras aleatorias evitando que se amontonen siempre en el mismo lugar
function generateRandomShapes(seedStr: string): Shape[] {
  const rng = new SeededRandom(seedStr + Math.random())
  const numShapes = Math.floor(rng.range(4, 7))
  const shapeTypes = ['circle', 'rect', 'triangle', 'square'] as const
  const shapes: Shape[] = []
  const placed: Placed[] = []

  for (let i = 0; i < numShapes; i++) {
    const type = rng.choice(shapeTypes)
    const colorIndex = Math.floor(rng.next() * 3) as 0 | 1 | 2
    const depth = rng.range(0.1, 1)
    const opacity = rng.range(0.6, 0.95)

    let best: Candidate | null = null
    let bestClearance = -Infinity

    for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
      const candidate = buildCandidate(type, rng, colorIndex, depth, opacity)
      const c = clearance(candidate, placed)
      if (c > bestClearance) {
        bestClearance = c
        best = candidate
      }
      if (c >= 0) break
    }

    if (best) {
      placed.push({ cx: best.cx, cy: best.cy, footprint: best.footprint })
      shapes.push(best.shape)
    }
  }

  return shapes
}

function triangleVertices(cx: number, cy: number, r: number, rotation: number): string {
  return [0, 1, 2]
    .map((k) => {
      const angle = ((rotation - 90 + k * 120) * Math.PI) / 180
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
    })
    .join(' ')
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
  // Las figuras se generan una única vez para la vida del componente:
  // regenerarlas en cada render (p. ej. al mover el mouse) provocaba un
  // parpadeo caótico de posiciones.
  const [layout] = useState<Shape[]>(() =>
    randomize ? generateRandomShapes(finalSeed) : LAYOUTS[hashString(finalSeed) % LAYOUTS.length]
  )

  const [scrollY, setScrollY] = useState(0)

  // Marcar como montado para evitar errores de hidratación
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!enableParallax || !isMounted) return

    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [enableParallax, isMounted])

  return (
    <div
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
            // Fase propia por figura para que no se muevan todas en sincronía
            const phase = shape.cx * 7 + shape.cy * 13

            let dx = 0
            let dy = 0
            if (depth < 0.5) {
              // Figuras de fondo: desplazamiento tipo parallax, acotado y suave
              const t = scrollY * 0.0015 + phase
              dx = Math.sin(t) * parallaxIntensity * depth
              dy = Math.sin(t * 0.7 + 1) * parallaxIntensity * depth
            } else {
              // Figuras cercanas: orbitan alrededor de su posición base
              const angle = scrollY * 0.0025 + phase
              const radius = parallaxIntensity * depth
              dx = Math.cos(angle) * radius
              dy = Math.sin(angle) * radius
            }

            const cx = shape.cx + dx
            const cy = shape.cy + dy

            if (shape.type === 'circle') {
              return <circle key={i} cx={cx} cy={cy} r={shape.r} fill={fill} opacity={shape.opacity} />
            }

            if (shape.type === 'square') {
              return (
                <rect
                  key={i}
                  x={cx - shape.size / 2}
                  y={cy - shape.size / 2}
                  width={shape.size}
                  height={shape.size}
                  fill={fill}
                  opacity={shape.opacity}
                />
              )
            }

            if (shape.type === 'rect') {
              return (
                <rect
                  key={i}
                  x={cx - shape.width / 2}
                  y={cy - shape.height / 2}
                  width={shape.width}
                  height={shape.height}
                  fill={fill}
                  opacity={shape.opacity}
                />
              )
            }

            return (
              <polygon
                key={i}
                points={triangleVertices(cx, cy, shape.r, shape.rotation)}
                fill={fill}
                opacity={shape.opacity}
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}

export default GeometricPattern

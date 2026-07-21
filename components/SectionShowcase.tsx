import React from 'react'
import GeometricPattern from './GeometricPattern'
import { getAnalogousColors } from '@/lib/color'

type Variant = 'normal' | 'parallax' | 'static3d'

type Props = {
  title: string
  description: string
  imageSrc?: string
  variant?: Variant
  reverse?: boolean
  /** Tailwind class for the title color, e.g. 'text-sky-600' */
  titleColorClass?: string
  /** Tailwind class for the description color, e.g. 'text-white' */
  descriptionColorClass?: string
  /** Tailwind classes for the overlay (parallax) e.g. 'bg-indigo-900/40' */
  overlayClass?: string
  /** Si es false, en vez de imageSrc se dibujan figuras geométricas con 3 colores análogos */
  hasPhoto?: boolean
  /** Color base (hex) usado para derivar la paleta análoga cuando hasPhoto=false */
  color?: string
}

const SectionShowcase: React.FC<Props> = ({
  title,
  description,
  imageSrc,
  variant = 'normal',
  reverse = false,
  titleColorClass,
  descriptionColorClass,
  overlayClass,
  hasPhoto = true,
  color = '#6366f1',
}) => {
  const titleColor = titleColorClass ?? (variant === 'parallax' ? 'text-white' : 'text-slate-900')
  const palette = !hasPhoto ? getAnalogousColors(color) : null
  // Sin foto de fondo, la descripción es negra; con foto de fondo, blanca (para
  // contrastar contra la imagen, que suele ir oscurecida con overlay/filtro).
  const autoTextColor = hasPhoto ? 'text-white' : 'text-slate-900'

  if (variant === 'parallax') {
    const bgStyle = hasPhoto && imageSrc
      ? { backgroundImage: `url(${imageSrc})` }
      : undefined

    return (
      <section
        className="w-full bg-center bg-cover bg-no-repeat parallax-section relative"
        style={bgStyle}
      >
        {!hasPhoto && palette && (
          <div className="absolute inset-0">
            <GeometricPattern colors={palette} seed={title} />
          </div>
        )}
        <div className={`relative ${overlayClass ?? (hasPhoto ? 'bg-black/40' : '')}`}>
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
            <h2 className={`${titleColor} text-4xl md:text-6xl font-extrabold mb-4`}>{title}</h2>
            <p className={`text-lg md:text-xl max-w-3xl ${descriptionColorClass ?? autoTextColor}`}>{description}</p>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'static3d') {
    return (
      <section className="w-full relative overflow-hidden static-3d-section">
        <div
          className="static-3d-bg"
          style={hasPhoto && imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className={reverse ? 'order-2' : ''}>
              <h2 className={`${titleColor} text-4xl md:text-5xl font-extrabold mb-4`}>{title}</h2>
              <p className={`text-lg md:text-xl max-w-3xl ${descriptionColorClass ?? autoTextColor}`}>{description}</p>
            </div>
            <div className="transform-style-3d">
              {!hasPhoto && palette ? (
                <div className="relative w-full h-64 md:h-96 shadow-lg rounded-lg overflow-hidden">
                  <GeometricPattern colors={palette} seed={title} />
                </div>
              ) : imageSrc ? (
                <div className="relative w-full h-64 md:h-96 shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="w-full h-64 md:h-96 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600" />
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // normal layout (two-column)
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-24">
        <div className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
          <div>
            <h2 className={`${titleColor} text-3xl md:text-4xl font-extrabold mb-4`}>{title}</h2>
            <p className={`text-base md:text-lg max-w-3xl ${descriptionColorClass ?? 'text-slate-700'}`}>{description}</p>
          </div>
          <div>
            {!hasPhoto && palette ? (
              <div className="w-full h-56 md:h-80 rounded-lg overflow-hidden shadow">
                <GeometricPattern colors={palette} seed={title} />
              </div>
            ) : imageSrc ? (
              <div className="w-full h-56 md:h-80 rounded-lg overflow-hidden shadow">
                <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full h-56 md:h-80 rounded-lg bg-slate-200" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionShowcase

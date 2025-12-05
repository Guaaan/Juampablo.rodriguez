import React from 'react'

type Props = {
  title: string
  description: string
  icon?: 'server' | 'code' | 'vr' | 'gamepad'
  color?: string // Tailwind base color e.g. 'emerald', 'sky'
  invert?: boolean
}

const ICONS: Record<string, JSX.Element> = {
  server: (
    <svg viewBox="0 0 24 24" fill="none" width="36" height="36" aria-hidden>
      <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="7" r="0.8" fill="currentColor" />
      <circle cx="8" cy="17" r="0.8" fill="currentColor" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" width="36" height="36" aria-hidden>
      <path d="M8 9L4 12l4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  vr: (
    <svg viewBox="0 0 24 24" fill="none" width="36" height="36" aria-hidden>
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11h.01M16 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  gamepad: (
    <svg viewBox="0 0 24 24" fill="none" width="36" height="36" aria-hidden>
      <rect x="3" y="7" width="18" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="12" r="1" fill="currentColor" />
      <path d="M15 11v2M13 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
}

const SectionShowcaseCreative = ({ title, description, icon = 'server', color = 'emerald', invert = false }: Props) => {
  // Color map matches values in tailwind.config.js for predictable styling
  const colorMap: Record<string, string> = {
    primary: '#0000ff',
    seccondary: '#1DE0FF',
    danger: '#fe2a4e',
    success: '#00e436',
    warning: '#ffec2e',
    pink: '#ff77a8',
    magenta: '#6b29e0',
    warm: '#ffa31d',
    slateCustom: '#264653',
    accent: '#008750',
    emerald: '#10b981',
    sky: '#0ea5e9',
    violet: '#8b5cf6',
    amber: '#f59e0b',
  }

  const bgColor = '#ffffff'
  const textColor = '#0f172a' // dark slate for normal mode
  const accent = colorMap[color] || colorMap['accent']

  return (
    <section className="w-full">
      <div
        className="rounded-2xl p-6 flex items-center gap-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
        style={{ background: bgColor }}
      >
        <div className="relative flex-shrink-0">
          <div
            className="rounded-full w-20 h-20 flex items-center justify-center shadow-md"
            style={{ background: `linear-gradient(135deg, ${accent}22 0%, #ffffff 60%)` }}
          >
            <div style={{ color: accent, transition: 'transform 300ms' }} className="group-hover:scale-105">
              {ICONS[icon]}
            </div>
          </div>
          {/* decorative accent ring */}
          <div
            className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full"
            style={{ background: accent, opacity: 0.12 }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-extrabold mb-1" style={{ color: textColor }}>{title}</h3>
          <p style={{ color: textColor, opacity: 0.9 }}>{description}</p>
          {/* decorative underline accent */}
          <div className="mt-3 h-1 w-24 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }} />
        </div>
        {/* Button hidden: not used yet */}
      </div>
    </section>
  )
}

export default SectionShowcaseCreative

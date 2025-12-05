import React from 'react'

type Props = {
  title: string
  description: string
  iconClass?: string // full FontAwesome classes e.g. 'fa-solid fa-server'
  bgClass?: string
  titleColorClass?: string
  invert?: boolean
}

const SectionShowcaseNoPicture = ({
  title,
  description,
  iconClass = 'fa-solid fa-circle-info',
  bgClass = 'bg-gray-900',
  titleColorClass = 'text-white',
  invert = false,
}: Props) => {
  const baseBg = invert ? 'bg-white' : bgClass
  const baseText = invert ? 'text-black' : 'text-white'
  const iconBg = invert ? 'bg-black text-white' : 'bg-white text-black'

  return (
    <section className={`w-full py-6`}> 
      <div className={`rounded-lg p-6 flex items-center gap-6 ${baseBg}`}>
        <div
          className={`flex-shrink-0 rounded-full w-16 h-16 flex items-center justify-center ${iconBg}`}
          aria-hidden
        >
          <i className={`${iconClass} text-2xl`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-semibold mb-1 ${titleColorClass} ${baseText}`}>{title}</h3>
          <p className={`text-sm ${baseText} opacity-90`}>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default SectionShowcaseNoPicture

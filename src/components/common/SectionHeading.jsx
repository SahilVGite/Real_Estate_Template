import { cn } from '../../utils/format'
import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'left', light = false, action, className }) {
  const centered = align === 'center'
  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', centered && 'md:flex-col md:items-center', className)}>
      <Reveal className={cn('max-w-2xl', centered && 'mx-auto text-center')}>
        {eyebrow && <span className={cn('eyebrow', light && 'eyebrow-light', centered && 'justify-center')}>{eyebrow}</span>}
        <h2 className={cn('mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.85rem]', light && 'text-white')}>{title}</h2>
        {description && (
          <p className={cn('mt-4 text-[1.0625rem] leading-relaxed', light ? 'text-white/70' : 'text-muted')}>{description}</p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1} className="shrink-0">{action}</Reveal>}
    </div>
  )
}

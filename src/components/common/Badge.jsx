import { cn } from '../../utils/format'

const tones = {
  navy: 'bg-navy text-white',
  gold: 'bg-gold text-navy',
  light: 'bg-white/95 text-navy backdrop-blur-sm',
  beige: 'bg-beige-100 text-navy',
  success: 'bg-success/10 text-success',
  outline: 'border border-line bg-white text-ink',
  muted: 'bg-cream text-muted border border-line',
}

export default function Badge({ tone = 'light', className, children }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase', tones[tone], className)}>
      {children}
    </span>
  )
}

import { useCountUp } from '../../hooks'
import { cn, formatNumber } from '../../utils/format'

export default function StatCounter({ value, suffix = '', label, light = false, className }) {
  const [ref, current] = useCountUp(value)
  return (
    <div ref={ref} className={className}>
      <p className={cn('font-serif text-[2.5rem] leading-none sm:text-5xl', light ? 'text-white' : 'text-navy')}>
        {formatNumber(current)}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className={cn('mt-2 text-sm', light ? 'text-white/60' : 'text-muted')}>{label}</p>
    </div>
  )
}

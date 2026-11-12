import { Star } from 'lucide-react'
import { cn } from '../../utils/format'

export default function Rating({ value = 5, max = 5, className }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} role="img" aria-label={`Rated ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} className={cn('h-4 w-4', i < value ? 'fill-gold text-gold' : 'fill-transparent text-[#d6d1c7]')} strokeWidth={1.5} />
      ))}
    </div>
  )
}

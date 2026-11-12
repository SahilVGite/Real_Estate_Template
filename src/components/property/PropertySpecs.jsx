import { BedDouble, Bath, Maximize2, Car } from 'lucide-react'
import { cn, formatNumber } from '../../utils/format'

/** Compact beds / baths / area row. Hides beds & baths for plots and commercial units where irrelevant. */
export default function PropertySpecs({ property, className, showParking = false }) {
  const items = []
  if (property.beds > 0) items.push({ icon: BedDouble, value: property.beds, label: property.beds === 1 ? 'Bed' : 'Beds' })
  if (property.baths > 0) items.push({ icon: Bath, value: property.baths, label: property.baths === 1 ? 'Bath' : 'Baths' })
  items.push({ icon: Maximize2, value: formatNumber(property.area), label: 'sq ft' })
  if (showParking && property.parking > 0) items.push({ icon: Car, value: property.parking, label: 'Parking' })

  return (
    <ul className={cn('flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted', className)}>
      {items.map(({ icon: Icon, value, label }) => (
        <li key={label} className="flex items-center gap-1.5">
          <Icon className="h-4 w-4 text-gold-dark" strokeWidth={1.7} aria-hidden />
          <span>
            <span className="font-medium text-ink">{value}</span> {label}
          </span>
        </li>
      ))}
    </ul>
  )
}

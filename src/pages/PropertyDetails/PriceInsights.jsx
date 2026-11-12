import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { properties } from '../../data/properties'
import { getLocation } from '../../data/locations'
import { formatCompactPrice, formatNumber } from '../../utils/format'

/**
 * Compares this listing with other Abode listings of the same status in the same city.
 * All figures are computed from the catalogue — no invented market data.
 */
export default function PriceInsights({ property }) {
  const city = getLocation(property.city)?.name
  const peers = properties.filter((p) => p.city === property.city && p.status === property.status && p.type !== 'plot' && p.id !== property.id)
  const rate = (p) => p.price / p.area
  const own = rate(property)
  const avg = peers.length ? peers.reduce((s, p) => s + rate(p), 0) / peers.length : null
  const diff = avg ? ((own - avg) / avg) * 100 : 0
  const unit = property.status === 'rent' ? '/sq ft/month' : '/sq ft'
  const fmt = (n) => (property.status === 'rent' ? `₹${n.toFixed(0)}` : `₹${formatNumber(Math.round(n))}`)

  const prices = peers.map((p) => p.price).concat(property.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const position = max === min ? 50 : ((property.price - min) / (max - min)) * 100

  const Trend = Math.abs(diff) < 3 ? Minus : diff > 0 ? TrendingUp : TrendingDown
  const verdict = !avg ? null : Math.abs(diff) < 3 ? 'In line with' : diff > 0 ? `${Math.abs(diff).toFixed(0)}% above` : `${Math.abs(diff).toFixed(0)}% below`

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-lg bg-cream p-5">
        <p className="text-sm text-muted">This property</p>
        <p className="mt-1 font-serif text-2xl text-navy">
          {fmt(own)}
          <span className="font-sans text-xs text-muted">{unit}</span>
        </p>
      </div>
      <div className="rounded-lg bg-cream p-5">
        <p className="text-sm text-muted">Avg. of our {city} listings</p>
        <p className="mt-1 font-serif text-2xl text-navy">
          {avg ? fmt(avg) : '—'}
          {avg && <span className="font-sans text-xs text-muted">{unit}</span>}
        </p>
      </div>
      <div className="rounded-lg bg-cream p-5">
        <p className="text-sm text-muted">Compared</p>
        <p className="mt-1 flex items-center gap-2 font-serif text-2xl text-navy">
          <Trend className="h-5 w-5 text-gold-dark" /> {verdict ?? 'Unique listing'}
        </p>
        {verdict && <p className="text-xs text-muted">the {city} average</p>}
      </div>
      {peers.length > 0 && (
        <div className="sm:col-span-3">
          <div className="relative mt-3 h-2 rounded-full bg-gradient-to-r from-beige-100 via-beige to-gold">
            <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-navy shadow-soft" style={{ left: `${position}%` }} aria-hidden />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted">
            <span>{formatCompactPrice(min)}</span>
            <span>
              Price range of {peers.length + 1} {property.status === 'rent' ? 'rentals' : 'homes for sale'} in {city}
            </span>
            <span>{formatCompactPrice(max)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

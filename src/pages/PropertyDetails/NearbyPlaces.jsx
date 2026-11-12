import { useState } from 'react'
import { GraduationCap, HeartPulse, TrainFront, ShoppingBag } from 'lucide-react'
import { cityDetails } from '../../data/locations'
import { cn } from '../../utils/format'

const TABS = [
  { id: 'schools', label: 'Schools', icon: GraduationCap },
  { id: 'health', label: 'Hospitals', icon: HeartPulse },
  { id: 'transit', label: 'Transport', icon: TrainFront },
  { id: 'leisure', label: 'Shopping & leisure', icon: ShoppingBag },
]

/** Deterministic pseudo-distance so each listing shows stable figures. */
function distance(seed, i) {
  const n = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) + i * 37
  return (0.6 + (n % 70) / 10).toFixed(1)
}

export default function NearbyPlaces({ property }) {
  const [tab, setTab] = useState('schools')
  const places = cityDetails[property.city]?.nearby?.[tab] ?? []

  return (
    <div>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="tablist" aria-label="Nearby places">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition',
              tab === t.id ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy/30',
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>
      <ul className="mt-5 divide-y divide-line">
        {places.map((name, i) => (
          <li key={name} className="flex items-center justify-between gap-4 py-3.5">
            <span className="text-ink">{name}</span>
            <span className="shrink-0 text-sm text-muted tabular-nums">{distance(property.id + tab, i)} km</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Approximate road distances, for guidance only.</p>
    </div>
  )
}

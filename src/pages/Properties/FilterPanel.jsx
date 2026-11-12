import { RotateCcw } from 'lucide-react'
import { Select } from '../../components/forms/Field'
import { locations } from '../../data/locations'
import { categories } from '../../data/categories'
import { priceOptions, AREA_STEPS, countActiveFilters } from '../../utils/filters'
import { cn, formatNumber } from '../../utils/format'

function Group({ title, children }) {
  return (
    <div role="group" aria-label={title} className="border-b border-line py-5 first:pt-0 last:border-b-0">
      <p className="mb-3 text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase" aria-hidden>
        {title}
      </p>
      {children}
    </div>
  )
}

function Pills({ value, onChange, options, name }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'h-9 min-w-[2.75rem] rounded-md border px-3 text-sm font-medium transition',
            value === o.value ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy/40',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

const countOptions = [{ value: '', label: 'Any' }, ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+` }))]
const areaOptions = AREA_STEPS.map((v) => ({ value: String(v), label: `${formatNumber(v)} sq ft` }))

/**
 * Controlled filter panel. `filters` is the current state; `onChange(patch)` merges updates.
 * `typeCounts` shows how many listings exist per type for the current non-type filters.
 */
export default function FilterPanel({ filters, onChange, onReset, typeCounts = {} }) {
  const set = (key) => (value) => onChange({ [key]: value })
  const prices = priceOptions(filters.status)
  const active = countActiveFilters({ ...filters, q: '' })

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-xl">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          disabled={active === 0}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark transition hover:text-navy disabled:text-muted disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Clear all
        </button>
      </div>

      <Group title="Looking to">
        <Pills
          name="Buy or rent"
          value={filters.status}
          onChange={(v) => onChange({ status: v, minPrice: '', maxPrice: '' })}
          options={[
            { value: '', label: 'All' },
            { value: 'sale', label: 'Buy' },
            { value: 'rent', label: 'Rent' },
          ]}
        />
      </Group>

      <Group title="Location">
        <Select aria-label="City" value={filters.city} onChange={(e) => set('city')(e.target.value)} placeholder="All cities" options={locations.map((l) => ({ value: l.id, label: l.name }))} />
      </Group>

      <Group title="Property type">
        <ul className="space-y-1">
          {[{ id: '', plural: 'All types' }, ...categories].map((c) => {
            const checked = filters.type === c.id
            const n = c.id ? typeCounts[c.id] || 0 : Object.values(typeCounts).reduce((a, b) => a + b, 0)
            return (
              <li key={c.id || 'all'}>
                <label className={cn('flex cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-sm transition', checked ? 'bg-navy/5 font-medium text-navy' : 'text-ink hover:bg-cream')}>
                  <span className="flex items-center gap-2.5">
                    <input type="radio" name="type" checked={checked} onChange={() => set('type')(c.id)} className="h-4 w-4 accent-navy" />
                    {c.plural}
                  </span>
                  <span className="text-xs text-muted tabular-nums">{n}</span>
                </label>
              </li>
            )
          })}
        </ul>
      </Group>

      <Group title={filters.status === 'rent' ? 'Monthly rent' : 'Price range'}>
        <div className="grid grid-cols-2 gap-2">
          <Select aria-label="Minimum price" value={filters.minPrice} onChange={(e) => set('minPrice')(e.target.value)} placeholder="No min" options={prices} />
          <Select aria-label="Maximum price" value={filters.maxPrice} onChange={(e) => set('maxPrice')(e.target.value)} placeholder="No max" options={prices} />
        </div>
        {filters.minPrice && filters.maxPrice && Number(filters.minPrice) > Number(filters.maxPrice) && (
          <p className="mt-2 text-[0.8125rem] text-error-dark">Minimum is higher than maximum.</p>
        )}
        {!filters.status && <p className="mt-2 text-xs text-muted">Tip: choose Buy or Rent for tailored price brackets.</p>}
      </Group>

      <Group title="Bedrooms">
        <Pills name="Bedrooms" value={filters.beds} onChange={set('beds')} options={countOptions} />
      </Group>

      <Group title="Bathrooms">
        <Pills name="Bathrooms" value={filters.baths} onChange={set('baths')} options={countOptions} />
      </Group>

      <Group title="Area (sq ft)">
        <div className="grid grid-cols-2 gap-2">
          <Select aria-label="Minimum area" value={filters.minArea} onChange={(e) => set('minArea')(e.target.value)} placeholder="No min" options={areaOptions} />
          <Select aria-label="Maximum area" value={filters.maxArea} onChange={(e) => set('maxArea')(e.target.value)} placeholder="No max" options={areaOptions} />
        </div>
      </Group>
    </div>
  )
}

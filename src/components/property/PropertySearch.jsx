import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, RotateCcw, MapPin, Home, IndianRupee, BedDouble } from 'lucide-react'
import { toast } from 'sonner'
import { locations } from '../../data/locations'
import { categories } from '../../data/categories'
import { priceOptions, filtersToParams, DEFAULT_FILTERS } from '../../utils/filters'
import { cn } from '../../utils/format'

const initial = { status: 'sale', city: '', type: '', minPrice: '', maxPrice: '', beds: '' }

function SearchSelect({ label, icon: Icon, value, onChange, options, placeholder, className }) {
  return (
    <label className={cn('group relative flex min-w-0 flex-col rounded-md px-3.5 py-2.5 transition hover:bg-cream focus-within:bg-cream', className)}>
      <span className="flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-muted uppercase">
        <Icon className="h-3.5 w-3.5 text-gold-dark" aria-hidden />
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full cursor-pointer appearance-none truncate bg-transparent pr-4 text-[0.9375rem] font-medium text-ink outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function PropertySearch({ className }) {
  const navigate = useNavigate()
  const [f, setF] = useState(initial)
  const set = (key) => (value) => setF((prev) => ({ ...prev, [key]: value }))

  const switchMode = (status) => setF((prev) => ({ ...prev, status, minPrice: '', maxPrice: '' }))

  const onSubmit = (e) => {
    e.preventDefault()
    if (f.minPrice && f.maxPrice && Number(f.minPrice) > Number(f.maxPrice)) {
      toast.error('Minimum price is higher than maximum price', { description: 'Adjust the price range and try again.' })
      return
    }
    const params = filtersToParams({ ...DEFAULT_FILTERS, ...f })
    navigate(`/properties?${params.toString()}`)
  }

  const reset = () => setF(initial)
  const dirty = JSON.stringify(f) !== JSON.stringify(initial)
  const prices = priceOptions(f.status)

  return (
    <form onSubmit={onSubmit} className={cn('rounded-lg bg-white p-2 shadow-lift', className)} aria-label="Search properties">
      <div className="flex items-center justify-between gap-3 px-2 pt-1 pb-2">
        <div role="tablist" aria-label="Buy or rent" className="inline-flex rounded-md bg-cream p-1">
          {[
            { v: 'sale', l: 'Buy' },
            { v: 'rent', l: 'Rent' },
          ].map((t) => (
            <button
              key={t.v}
              type="button"
              role="tab"
              aria-selected={f.status === t.v}
              onClick={() => switchMode(t.v)}
              className={cn(
                'rounded-[5px] px-5 py-1.5 text-sm font-medium transition',
                f.status === t.v ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-navy',
              )}
            >
              {t.l}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={reset}
          disabled={!dirty}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-muted transition hover:text-navy disabled:opacity-0"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
      <div className="grid grid-cols-2 gap-1 border-t border-line pt-2 md:grid-cols-3 lg:grid-cols-[1.15fr_1.15fr_1fr_1fr_0.9fr_auto] lg:gap-0 lg:divide-x lg:divide-line">
        <SearchSelect label="Location" icon={MapPin} value={f.city} onChange={set('city')} placeholder="All cities" options={locations.map((l) => ({ value: l.id, label: l.name }))} />
        <SearchSelect label="Property type" icon={Home} value={f.type} onChange={set('type')} placeholder="Any type" options={categories.map((c) => ({ value: c.id, label: c.plural }))} />
        <SearchSelect label="Min price" icon={IndianRupee} value={f.minPrice} onChange={set('minPrice')} placeholder="No min" options={prices} />
        <SearchSelect label="Max price" icon={IndianRupee} value={f.maxPrice} onChange={set('maxPrice')} placeholder="No max" options={prices} />
        <SearchSelect label="Bedrooms" icon={BedDouble} value={f.beds} onChange={set('beds')} placeholder="Any" options={[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n}+ beds` }))} />
        <div className="flex items-stretch p-1 col-span-2 md:col-span-1 lg:!border-l-0 lg:pl-2">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-navy px-6 text-[0.9375rem] font-medium text-white transition hover:bg-navy-800 lg:h-full lg:min-h-[3.5rem]"
          >
            <Search className="h-4 w-4" /> Search
          </button>
        </div>
      </div>
    </form>
  )
}

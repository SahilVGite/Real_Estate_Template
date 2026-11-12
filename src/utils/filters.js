import { formatCompactPrice } from './format'

/** Price brackets differ for sale vs rent, so the selects adapt to the chosen mode. */
export const PRICE_STEPS = {
  sale: [2500000, 5000000, 10000000, 20000000, 50000000, 100000000, 200000000],
  rent: [25000, 50000, 100000, 200000, 400000, 800000, 1500000],
}

export const priceOptions = (status) =>
  (PRICE_STEPS[status] ?? [...new Set([...PRICE_STEPS.rent, ...PRICE_STEPS.sale])].sort((a, b) => a - b)).map((v) => ({
    value: String(v),
    label: formatCompactPrice(v),
  }))

export const AREA_STEPS = [500, 1000, 1500, 2000, 3000, 4000, 6000, 10000]

export const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'area-desc', label: 'Largest first' },
]

export const STATUS_OPTIONS = [
  { value: 'sale', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
]

export const DEFAULT_FILTERS = {
  q: '',
  city: '',
  type: '',
  status: '',
  minPrice: '',
  maxPrice: '',
  beds: '',
  baths: '',
  minArea: '',
  maxArea: '',
  sort: 'latest',
}

export const FILTER_KEYS = Object.keys(DEFAULT_FILTERS)

/** URLSearchParams -> filter object (unknown keys ignored). */
export function parseFilters(searchParams) {
  const f = { ...DEFAULT_FILTERS }
  FILTER_KEYS.forEach((k) => {
    const v = searchParams.get(k)
    if (v != null) f[k] = v
  })
  return f
}

/** filter object -> URLSearchParams, omitting defaults so URLs stay short and shareable. */
export function filtersToParams(filters) {
  const params = new URLSearchParams()
  FILTER_KEYS.forEach((k) => {
    const v = filters[k]
    if (v !== '' && v != null && v !== DEFAULT_FILTERS[k]) params.set(k, v)
  })
  return params
}

export function applyFilters(list, f) {
  const q = f.q.trim().toLowerCase()
  const n = (v) => (v === '' || v == null ? null : Number(v))
  const minPrice = n(f.minPrice)
  const maxPrice = n(f.maxPrice)
  const beds = n(f.beds)
  const baths = n(f.baths)
  const minArea = n(f.minArea)
  const maxArea = n(f.maxArea)

  return list.filter((p) => {
    if (q) {
      const hay = `${p.title} ${p.locality} ${p.city} ${p.address} ${p.type} ${p.summary}`.toLowerCase()
      if (!q.split(/\s+/).every((word) => hay.includes(word))) return false
    }
    if (f.city && p.city !== f.city) return false
    if (f.type && p.type !== f.type) return false
    if (f.status && p.status !== f.status) return false
    if (minPrice != null && p.price < minPrice) return false
    if (maxPrice != null && p.price > maxPrice) return false
    if (beds != null && p.beds < beds) return false
    if (baths != null && p.baths < baths) return false
    if (minArea != null && p.area < minArea) return false
    if (maxArea != null && p.area > maxArea) return false
    return true
  })
}

export function sortProperties(list, sort) {
  const arr = [...list]
  switch (sort) {
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price)
    case 'area-desc':
      return arr.sort((a, b) => b.area - a.area)
    default:
      return arr.sort((a, b) => new Date(b.listedAt) - new Date(a.listedAt))
  }
}

/** Number of user-set filters (excluding sort), for badges. */
export const countActiveFilters = (f) => FILTER_KEYS.filter((k) => k !== 'sort' && f[k] !== '').length

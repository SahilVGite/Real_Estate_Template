/** Join class names, skipping falsy values. */
export const cn = (...classes) => classes.flat().filter(Boolean).join(' ')

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 })

/**
 * Compact Indian price: 67500000 -> "₹6.75 Cr", 9200000 -> "₹92 L", 95000 -> "₹95,000".
 * Currency formatting is isolated here so the template can be re-localised in one place.
 */
export function formatCompactPrice(value) {
  if (value == null) return '—'
  if (value >= 1e7) return `₹${trim(value / 1e7)} Cr`
  if (value >= 1e5) return `₹${trim(value / 1e5)} L`
  return `₹${inr.format(value)}`
}

const trim = (n) => Number(n.toFixed(2)).toString()

export function formatPrice(property, { compact = true } = {}) {
  return compact ? formatCompactPrice(property.price) : `₹${inr.format(property.price)}`
}

export const priceSuffix = (property) => (property.status === 'rent' ? '/month' : '')

export const formatNumber = (n) => inr.format(n)

export const formatArea = (sqft) => `${inr.format(sqft)} sq ft`

export function formatDate(iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return new Date(iso).toLocaleDateString('en-IN', opts)
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`
  const days = Math.round(hrs / 24)
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`
  return formatDate(iso)
}

export const statusLabel = (status) => (status === 'rent' ? 'For Rent' : 'For Sale')

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')

/** Price per sq ft for sale listings. */
export const pricePerSqft = (p) => (p.status === 'sale' && p.area ? Math.round(p.price / p.area) : null)

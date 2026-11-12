import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, List, SlidersHorizontal, Search, X, SearchX, ArrowDown } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'
import PropertyCard, { PropertyCardSkeleton } from '../../components/property/PropertyCard'
import { Select } from '../../components/forms/Field'
import FilterPanel from './FilterPanel'
import ListingContent from './ListingContent'
import LeadBand from '../../components/lead/LeadBand'
import { useLead } from '../../context/LeadContext'
import { useAsync, useDocumentTitle, useLockBodyScroll, useOnKey } from '../../hooks'
import { getProperties } from '../../services/propertyService'
import { storage } from '../../services/storage'
import { applyFilters, sortProperties, parseFilters, filtersToParams, DEFAULT_FILTERS, SORT_OPTIONS, countActiveFilters } from '../../utils/filters'
import { getLocation } from '../../data/locations'
import { getCategory } from '../../data/categories'
import { cn, formatCompactPrice, formatNumber } from '../../utils/format'

const PAGE_SIZE = 9

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseFilters(searchParams), [searchParams])
  const { data: all, loading } = useAsync(getProperties, [])
  const [view, setView] = useState(() => storage.get('listing-view', 'grid'))
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [drawer, setDrawer] = useState(false)
  const [keyword, setKeyword] = useState(filters.q)
  const { openLead } = useLead()

  const heading = filters.status === 'sale' ? 'Properties for sale' : filters.status === 'rent' ? 'Properties for rent' : 'Explore all properties'
  useDocumentTitle(heading)

  const update = (patch) => {
    const next = { ...filters, ...patch }
    setSearchParams(filtersToParams(next), { replace: true })
  }
  const reset = () => {
    setKeyword('')
    setSearchParams(filtersToParams({ ...DEFAULT_FILTERS, sort: filters.sort }), { replace: true })
  }

  // Debounce keyword typing into the URL.
  useEffect(() => {
    if (keyword === filters.q) return
    const id = setTimeout(() => update({ q: keyword }), 300)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])
  // Keep the input in sync when the URL changes elsewhere (chips, back button).
  useEffect(() => setKeyword(filters.q), [filters.q])

  useEffect(() => {
    storage.set('listing-view', view)
  }, [view])
  useEffect(() => setVisible(PAGE_SIZE), [searchParams])

  const results = useMemo(() => (all ? sortProperties(applyFilters(all, filters), filters.sort) : []), [all, filters])
  const typeCounts = useMemo(() => {
    if (!all) return {}
    return applyFilters(all, { ...filters, type: '' }).reduce((acc, p) => ({ ...acc, [p.type]: (acc[p.type] || 0) + 1 }), {})
  }, [all, filters])

  const chips = buildChips(filters)
  const activeCount = countActiveFilters(filters)
  const shown = results.slice(0, visible)

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Properties' }]}
        title={heading}
        description="Every listing is personally verified by our advisors. Filter by city, budget and size — or enquire on any home to get full details, pricing and a visit within 24 hours."
        image="/images/architecture-facade-wide.webp"
      >
        <form onSubmit={(e) => (e.preventDefault(), update({ q: keyword }))} className="mt-8 flex max-w-2xl rounded-md bg-white p-1.5 shadow-lift" role="search">
          <label htmlFor="keyword" className="sr-only">
            Search by keyword
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by name, locality or keyword…"
              className="h-11 w-full bg-transparent pr-9 pl-10 text-[0.9375rem] text-ink outline-none placeholder:text-muted"
            />
            {keyword && (
              <button type="button" onClick={() => setKeyword('')} className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded text-muted hover:text-navy" aria-label="Clear keyword">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" className="h-11 px-4 sm:px-6">
            <span className="hidden xs:inline">Search</span>
            <Search className="h-4 w-4 xs:hidden" />
          </Button>
        </form>
      </PageHeader>

      <section className="container-page py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[17.5rem_1fr] xl:gap-12">
          <aside className="hidden lg:block" aria-label="Filters">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg border border-line bg-white p-6 [scrollbar-width:thin]">
              <FilterPanel filters={filters} onChange={update} onReset={reset} typeCounts={typeCounts} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
              <p className="text-[0.9375rem] text-muted" aria-live="polite">
                {loading ? (
                  'Loading properties…'
                ) : (
                  <>
                    <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? 'property' : 'properties'} found
                  </>
                )}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-10 lg:hidden" onClick={() => setDrawer(true)} iconLeft={<SlidersHorizontal className="h-4 w-4" />}>
                  Filters{activeCount > 0 && <span className="ml-0.5 rounded-full bg-gold px-1.5 text-xs text-navy">{activeCount}</span>}
                </Button>
                <div className="w-[11.5rem] xs:w-[12.5rem]">
                  <Select aria-label="Sort properties" value={filters.sort} onChange={(e) => update({ sort: e.target.value })} options={SORT_OPTIONS} className="h-10 text-sm" />
                </div>
                <div className="hidden rounded-md border border-line bg-white p-1 sm:flex" role="group" aria-label="View mode">
                  {[
                    { v: 'grid', icon: LayoutGrid, label: 'Grid view' },
                    { v: 'list', icon: List, label: 'List view' },
                  ].map(({ v, icon: Icon, label }) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      aria-pressed={view === v}
                      aria-label={label}
                      className={cn('grid h-8 w-8 place-items-center rounded-[5px] transition', view === v ? 'bg-navy text-white' : 'text-muted hover:text-navy')}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-5">
                {chips.map((chip) => (
                  <button
                    key={chip.key}
                    onClick={() => update(chip.clear)}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white py-1.5 pr-2 pl-3 text-sm text-ink transition hover:border-navy/40"
                    aria-label={`Remove filter: ${chip.label}`}
                  >
                    {chip.label}
                    <X className="h-3.5 w-3.5 text-muted group-hover:text-navy" />
                  </button>
                ))}
                <button onClick={reset} className="px-2 text-sm font-medium text-gold-dark hover:text-navy">
                  Clear all
                </button>
              </div>
            )}

            {/* Results */}
            <div className="pt-7">
              {loading ? (
                <div className={cn('grid gap-6', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                  {Array.from({ length: 6 }, (_, i) => (
                    <PropertyCardSkeleton key={i} variant={view} />
                  ))}
                </div>
              ) : results.length === 0 ? (
                <EmptyState
                  icon={SearchX}
                  title="No properties match your search"
                  description="Try widening your price range, removing a filter or searching a nearby locality. New homes are added every week."
                  action={
                    <>
                      <Button onClick={reset}>Clear all filters</Button>
                      <Button variant="outline" onClick={() => openLead('requirement', { source: 'listing:empty-state' })}>
                        Post your requirement
                      </Button>
                    </>
                  }
                />
              ) : (
                <>
                  <motion.div layout className={cn('grid gap-6', view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {shown.flatMap((p, i) => [
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i % PAGE_SIZE, 6) * 0.03 } }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <PropertyCard property={p} variant={view} className="h-full" />
                        </motion.div>,
                        i === 5 && shown.length > 6 && (
                          <motion.div key="lead-band" layout className="col-span-full">
                            <LeadBand source="listing:inline" />
                          </motion.div>
                        ),
                      ])}
                    </AnimatePresence>
                  </motion.div>

                  <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="h-1 w-48 overflow-hidden rounded-full bg-line">
                      <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(shown.length / results.length) * 100}%` }} />
                    </div>
                    <p className="text-sm text-muted">
                      Showing {shown.length} of {results.length}
                    </p>
                    {shown.length < results.length && (
                      <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)} iconRight={<ArrowDown className="h-4 w-4" />}>
                        Load more properties
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <ListingContent />

      <FilterDrawer open={drawer} onClose={() => setDrawer(false)} resultCount={results.length}>
        <FilterPanel filters={filters} onChange={update} onReset={reset} typeCounts={typeCounts} />
      </FilterDrawer>
    </>
  )
}

function FilterDrawer({ open, onClose, resultCount, children }) {
  useLockBodyScroll(open)
  useOnKey('Escape', onClose, open)
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div className="absolute inset-0 bg-navy-950/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 flex w-full max-w-[24rem] flex-col bg-white"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <span className="font-medium">Refine results</span>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream" aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
            <div className="shrink-0 border-t border-line p-4">
              <Button className="w-full" onClick={onClose}>
                Show {resultCount} {resultCount === 1 ? 'property' : 'properties'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/** Human-readable chips for each active filter, each with the patch that clears it. */
function buildChips(f) {
  const chips = []
  if (f.q) chips.push({ key: 'q', label: `“${f.q}”`, clear: { q: '' } })
  if (f.status) chips.push({ key: 'status', label: f.status === 'sale' ? 'Buy' : 'Rent', clear: { status: '', minPrice: '', maxPrice: '' } })
  if (f.city) chips.push({ key: 'city', label: getLocation(f.city)?.name ?? f.city, clear: { city: '' } })
  if (f.type) chips.push({ key: 'type', label: getCategory(f.type)?.plural ?? f.type, clear: { type: '' } })
  if (f.minPrice || f.maxPrice) {
    const label = f.minPrice && f.maxPrice ? `${formatCompactPrice(+f.minPrice)} – ${formatCompactPrice(+f.maxPrice)}` : f.minPrice ? `From ${formatCompactPrice(+f.minPrice)}` : `Up to ${formatCompactPrice(+f.maxPrice)}`
    chips.push({ key: 'price', label, clear: { minPrice: '', maxPrice: '' } })
  }
  if (f.beds) chips.push({ key: 'beds', label: `${f.beds}+ beds`, clear: { beds: '' } })
  if (f.baths) chips.push({ key: 'baths', label: `${f.baths}+ baths`, clear: { baths: '' } })
  if (f.minArea || f.maxArea) {
    const label = f.minArea && f.maxArea ? `${formatNumber(+f.minArea)}–${formatNumber(+f.maxArea)} sq ft` : f.minArea ? `${formatNumber(+f.minArea)}+ sq ft` : `Up to ${formatNumber(+f.maxArea)} sq ft`
    chips.push({ key: 'area', label, clear: { minArea: '', maxArea: '' } })
  }
  return chips
}

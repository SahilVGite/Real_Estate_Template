import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Button from '../../../components/common/Button'
import PropertyCard, { PropertyCardSkeleton } from '../../../components/property/PropertyCard'
import { useAsync } from '../../../hooks'
import { getProperties } from '../../../services/propertyService'
import { cn } from '../../../utils/format'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'sale', label: 'For sale' },
  { id: 'rent', label: 'For rent' },
]

export default function FeaturedProperties() {
  const { data, loading } = useAsync(getProperties, [])
  const [tab, setTab] = useState('all')
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const items = useMemo(() => {
    if (!data) return []
    const featured = data.filter((p) => p.labels.includes('featured') || p.labels.includes('new'))
    return tab === 'all' ? featured : featured.filter((p) => p.status === tab)
  }, [data, tab])

  const updateEdges = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    track.current?.scrollTo({ left: 0 })
    updateEdges()
  }, [items, updateEdges])

  const scroll = (dir) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('[data-slide]')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="bg-cream pb-20 lg:pb-28" aria-labelledby="featured-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Handpicked for you"
          title={<span id="featured-heading">Featured properties</span>}
          description="A rotating selection of our most-loved homes — each one visited, verified and photographed by our team."
          action={
            <div className="flex items-center gap-3">
              <div role="tablist" aria-label="Filter featured properties" className="inline-flex rounded-md border border-line bg-white p-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={cn('rounded-[5px] px-3.5 py-1.5 text-sm font-medium transition sm:px-4', tab === t.id ? 'bg-navy text-white' : 'text-muted hover:text-navy')}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="hidden gap-2 sm:flex">
                <CarouselButton onClick={() => scroll(-1)} disabled={edges.start} label="Previous properties">
                  <ArrowLeft className="h-4 w-4" />
                </CarouselButton>
                <CarouselButton onClick={() => scroll(1)} disabled={edges.end} label="Next properties">
                  <ArrowRight className="h-4 w-4" />
                </CarouselButton>
              </div>
            </div>
          }
        />

        <div
          ref={track}
          onScroll={updateEdges}
          className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pt-1 pb-6 sm:mx-0 sm:px-0 lg:mt-12"
          aria-live="polite"
        >
          {loading
            ? Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="w-[85%] shrink-0 xs:w-[70%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <PropertyCardSkeleton />
                </div>
              ))
            : items.map((p) => (
                <div key={p.id} data-slide className="w-[85%] shrink-0 snap-start xs:w-[70%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <PropertyCard property={p} className="h-full" />
                </div>
              ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Button to="/properties" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>
            View all properties
          </Button>
        </div>
      </div>
    </section>
  )
}

function CarouselButton({ children, label, ...props }) {
  return (
    <button
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35"
      {...props}
    >
      {children}
    </button>
  )
}

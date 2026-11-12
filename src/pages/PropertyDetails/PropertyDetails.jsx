import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
  MapPin, Share2, BedDouble, Bath, Maximize2, Car, CalendarDays, Sofa, Compass, Layers, Home, IndianRupee, Check, Phone,
  MessageSquare, CalendarCheck, ArrowRight, BadgeCheck, SearchX, Printer, FileDown, PhoneCall, Eye, Clock,
} from 'lucide-react'
import { Breadcrumbs } from '../../components/common/PageHeader'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Skeleton from '../../components/common/Skeleton'
import EmptyState from '../../components/common/EmptyState'
import MapEmbed from '../../components/common/MapEmbed'
import Reveal from '../../components/common/Reveal'
import FaqList from '../../components/common/FaqList'
import PropertyCard from '../../components/property/PropertyCard'
import LeadForm from '../../components/lead/LeadForm'
import LeadBand from '../../components/lead/LeadBand'
import Gallery from './Gallery'
import FloorPlan from './FloorPlan'
import EmiCalculator from './EmiCalculator'
import PriceInsights from './PriceInsights'
import NearbyPlaces from './NearbyPlaces'
import { useAsync, useDocumentTitle } from '../../hooks'
import { getPropertyBySlug, getSimilarProperties } from '../../services/propertyService'
import { useLead } from '../../context/LeadContext'
import { getAgent } from '../../data/agents'
import { getLocation, cityDetails } from '../../data/locations'
import { getCategory } from '../../data/categories'
import { amenityCatalog } from '../../data/amenities'
import { propertyFaqs } from '../../data/faqs'
import { cn, formatPrice, formatNumber, formatDate, priceSuffix, statusLabel, pricePerSqft, formatCompactPrice } from '../../utils/format'

export default function PropertyDetails() {
  const { slug } = useParams()
  const { data: property, loading } = useAsync(() => getPropertyBySlug(slug), [slug])
  useDocumentTitle(property?.title ?? (loading ? 'Loading…' : 'Property not found'))

  if (loading) return <DetailsSkeleton />
  if (!property)
    return (
      <div className="container-page pt-32 pb-24">
        <EmptyState
          icon={SearchX}
          titleAs="h1"
          title="We couldn’t find that property"
          description="It may have been sold, let, or the link might be incorrect. Explore similar homes instead."
          action={<Button to="/properties">Browse properties</Button>}
        />
      </div>
    )

  return <PropertyView key={property.id} property={property} />
}

/** Stable, believable engagement number per listing (for social proof). */
const viewsThisWeek = (id) => 40 + ([...id].reduce((a, c) => a + c.charCodeAt(0), 0) * 7) % 90

function PropertyView({ property }) {
  const { openLead } = useLead()
  const [tab, setTab] = useState('enquiry')
  const [expanded, setExpanded] = useState(false)
  const agent = getAgent(property.agentId)
  const city = getLocation(property.city)
  const category = getCategory(property.type)
  const similar = getSimilarProperties(property)
  const ppsf = pricePerSqft(property)
  const isPlot = property.type === 'plot'
  const lead = (type, source) => openLead(type, { property, source: source ?? `details:${type}` })

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: property.title, text: property.summary, url })
      else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard')
      }
    } catch (e) {
      if (e?.name !== 'AbortError') toast.error('Couldn’t share this link')
    }
  }

  const specs = [
    property.beds > 0 && { icon: BedDouble, label: 'Bedrooms', value: property.beds },
    property.baths > 0 && { icon: Bath, label: 'Bathrooms', value: property.baths },
    { icon: Maximize2, label: isPlot ? 'Plot area' : 'Built-up area', value: `${formatNumber(property.area)} sq ft` },
    property.parking > 0 && { icon: Car, label: 'Parking', value: `${property.parking} ${property.parking === 1 ? 'space' : 'spaces'}` },
    { icon: Home, label: 'Property type', value: category?.label },
    property.yearBuilt && { icon: CalendarDays, label: 'Year built', value: property.yearBuilt },
    { icon: Sofa, label: 'Furnishing', value: property.furnishing },
    { icon: Compass, label: 'Facing', value: property.facing },
    { icon: Layers, label: isPlot ? 'Zoning' : 'Floor', value: isPlot ? 'Residential' : property.floors },
    ppsf && { icon: IndianRupee, label: 'Price per sq ft', value: `₹${formatNumber(ppsf)}` },
  ].filter(Boolean)

  const quickActions = [
    { type: 'enquiry', label: 'Enquire now', text: 'Get details & availability', icon: MessageSquare },
    { type: 'visit', label: 'Schedule a visit', text: 'In person or video tour', icon: CalendarCheck },
    { type: 'price', label: 'Price breakup', text: 'All-in cost & payment plan', icon: IndianRupee },
    { type: 'brochure', label: 'Brochure & plans', text: 'On WhatsApp or email', icon: FileDown },
  ]

  return (
    <>
      <div className="bg-cream pt-24 lg:pt-28">
        <div className="container-page">
          <Breadcrumbs crumbs={[{ label: 'Properties', to: '/properties' }, { label: city.name, to: `/properties?city=${city.id}` }, { label: property.title }]} />

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-1.5">
                {property.labels.includes('featured') && <Badge tone="gold">Featured</Badge>}
                {property.labels.includes('new') && <Badge tone="navy">New</Badge>}
                <Badge tone="outline">{statusLabel(property.status)}</Badge>
                <Badge tone="success">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </Badge>
              </div>
              <h1 className="mt-3 text-[2.1rem] leading-[1.1] sm:text-[2.75rem] lg:text-[3.1rem]">{property.title}</h1>
              <p className="mt-2 flex items-start gap-1.5 text-muted">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-dark" /> {property.address}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-gold-dark">
                <Eye className="h-4 w-4" /> {viewsThisWeek(property.id)} people viewed this property this week
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end">
              <div className="lg:text-right">
                <p className="font-serif text-[2.25rem] leading-none text-navy sm:text-[2.6rem]">
                  {formatPrice(property)}
                  {priceSuffix(property) && <span className="ml-1 font-sans text-base text-muted">{priceSuffix(property)}</span>}
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  {property.status === 'sale' ? `₹${formatNumber(property.price)}${ppsf ? ` · ₹${formatNumber(ppsf)}/sq ft` : ''}` : 'Security deposit: 3 months'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => lead('enquiry', 'details:title')} iconLeft={<MessageSquare className="h-4 w-4" />}>
                  Enquire now
                </Button>
                <Button variant="outline" onClick={share} iconLeft={<Share2 className="h-4 w-4" />} className="border-line bg-white">
                  Share
                </Button>
                <Button variant="outline" onClick={() => window.print()} className="border-line bg-white max-sm:hidden" aria-label="Print this page">
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Gallery images={property.images} title={property.title} />
          </div>

          {/* Lead quick actions */}
          <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {quickActions.map((a) => (
              <li key={a.type}>
                <button
                  onClick={() => lead(a.type, 'details:quick-actions')}
                  className="group flex h-full w-full items-center gap-3 rounded-lg border border-line bg-white p-3.5 text-left transition hover:border-navy hover:shadow-soft sm:p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-beige-50 text-gold-dark transition group-hover:bg-navy group-hover:text-beige">
                    <a.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{a.label}</span>
                    <span className="block truncate text-xs text-muted">{a.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-cream pb-20 lg:pb-28">
        <div className="container-page grid gap-10 pt-10 lg:grid-cols-[1fr_24rem] lg:gap-12 lg:pt-12 xl:grid-cols-[1fr_26rem]">
          <div className="min-w-0 space-y-6">
            <section className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3 xl:grid-cols-5" aria-label="Key facts">
              {specs.map((s) => (
                <div key={s.label} className="bg-white p-4 sm:p-5">
                  <s.icon className="h-5 w-5 text-gold-dark" strokeWidth={1.6} />
                  <p className="mt-3 text-xs text-muted">{s.label}</p>
                  <p className="mt-0.5 font-medium text-ink">{s.value}</p>
                </div>
              ))}
            </section>

            <Panel title="About this property">
              <p className="text-lg leading-relaxed text-ink/90">{property.summary}</p>
              <div className={cn('relative mt-4 space-y-4 overflow-hidden leading-relaxed text-muted transition-[max-height] duration-500', expanded ? 'max-h-[60rem]' : 'max-h-28')}>
                {property.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                {!expanded && <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent" />}
              </div>
              <button onClick={() => setExpanded((e) => !e)} className="mt-3 text-sm font-medium text-gold-dark hover:text-navy" aria-expanded={expanded}>
                {expanded ? 'Show less' : 'Read full description'}
              </button>
            </Panel>

            <Panel title="Amenities">
              <ul className="grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3">
                {property.amenities.map((id) => {
                  const a = amenityCatalog[id]
                  if (!a) return null
                  return (
                    <li key={id} className="flex items-center gap-3 rounded-md border border-line px-3.5 py-3">
                      <a.icon className="h-5 w-5 shrink-0 text-gold-dark" strokeWidth={1.6} />
                      <span className="text-sm text-ink">{a.label}</span>
                    </li>
                  )
                })}
              </ul>
            </Panel>

            <Panel title="Property features">
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {property.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel
              title={isPlot ? 'Plot layout' : 'Floor plan'}
              action={
                <Button variant="outline" size="sm" onClick={() => lead('brochure', 'details:floor-plan')} iconLeft={<FileDown className="h-4 w-4" />}>
                  Get detailed plans
                </Button>
              }
            >
              <FloorPlan property={property} />
            </Panel>

            <Panel
              title="Price insights"
              action={
                <Button variant="outline" size="sm" onClick={() => lead('price', 'details:price-insights')} iconLeft={<IndianRupee className="h-4 w-4" />}>
                  Full price breakup
                </Button>
              }
            >
              <PriceInsights property={property} />
            </Panel>

            {property.status === 'sale' && (
              <Panel title="EMI calculator">
                <EmiCalculator price={property.price} onLoanHelp={() => lead('price', 'details:emi')} />
              </Panel>
            )}

            <Panel title="Location & neighbourhood">
              <p className="mb-4 flex items-start gap-2 text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {property.address}
              </p>
              <MapEmbed coordinates={property.coordinates} label={property.title} className="aspect-[16/10] sm:aspect-[16/8]" />
              <p className="mt-5 leading-relaxed text-muted">{cityDetails[property.city]?.note}</p>
              <h3 className="mt-8 mb-4 font-sans text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">What’s nearby</h3>
              <NearbyPlaces property={property} />
              <p className="mt-5 text-sm text-muted">
                Popular nearby: {city.neighbourhoods.filter((n) => n !== property.locality).slice(0, 3).join(', ')}.{' '}
                <Link to={`/properties?city=${city.id}`} className="font-medium text-gold-dark hover:text-navy">
                  More homes in {city.name} →
                </Link>
              </p>
            </Panel>

            <Panel title="Frequently asked questions">
              <FaqList faqs={propertyFaqs(property)} className="border-t-0" />
              <p className="mt-5 text-sm text-muted">
                Have another question?{' '}
                <button onClick={() => lead('enquiry', 'details:faq')} className="font-medium text-gold-dark hover:text-navy">
                  Ask the advisor →
                </button>
              </p>
            </Panel>

            <p className="px-1 text-xs text-muted">
              Listed {formatDate(property.listedAt)} · Ref. {property.id.toUpperCase()} · Information is provided for demonstration and should be independently verified.
            </p>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" id="enquire">
            <div className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="flex items-center gap-4 border-b border-line p-5">
                <img src={agent.photo} alt="" className="h-16 w-16 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted">Listing advisor</p>
                  <p className="font-serif text-lg leading-tight text-navy">{agent.name}</p>
                  <p className="truncate text-sm text-muted">{agent.role}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-success">
                    <Clock className="h-3 w-3" /> Usually replies within 2 hours
                  </p>
                </div>
              </div>
              <div className="p-5">
                <div role="tablist" className="mb-5 grid grid-cols-2 rounded-md bg-cream p-1">
                  {[
                    { id: 'enquiry', label: 'Enquire', icon: MessageSquare },
                    { id: 'visit', label: 'Book a visit', icon: CalendarCheck },
                  ].map((t) => (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={tab === t.id}
                      onClick={() => setTab(t.id)}
                      className={cn('inline-flex items-center justify-center gap-1.5 rounded-[5px] py-2 text-sm font-medium transition', tab === t.id ? 'bg-white text-navy shadow-sm' : 'text-muted hover:text-navy')}
                    >
                      <t.icon className="h-4 w-4" /> {t.label}
                    </button>
                  ))}
                </div>
                <LeadForm key={tab} type={tab} property={property} source={`details:sidebar-${tab}`} compact />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-line bg-white" iconLeft={<PhoneCall className="h-4 w-4" />} onClick={() => lead('callback', 'details:sidebar')}>
                Callback
              </Button>
              <Button variant="outline" className="border-line bg-white" iconLeft={<FileDown className="h-4 w-4" />} onClick={() => lead('brochure', 'details:sidebar')}>
                Brochure
              </Button>
            </div>
          </aside>
        </div>

        <div className="container-page mt-16">
          <LeadBand
            title={`Not quite right? We’ll find similar homes in ${city.name}`}
            text="Tell us your budget and must-haves — your advisor will send matching options, including off-market homes, within 24 hours."
            source="details:lead-band"
          />
        </div>

        <section className="container-page mt-16 lg:mt-20" aria-labelledby="similar-heading">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">You may also like</span>
              <h2 id="similar-heading" className="mt-3 text-[2rem] sm:text-[2.4rem]">
                Similar properties
              </h2>
            </div>
            <Button to={`/properties?type=${property.type}`} variant="ghost" className="max-sm:hidden" iconRight={<ArrowRight className="h-4 w-4" />}>
              View more
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <PropertyCard property={p} className="h-full" />
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* Mobile sticky lead bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur-md lg:hidden print:hidden">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="font-serif text-xl leading-none text-navy">
              {formatCompactPrice(property.price)}
              <span className="font-sans text-xs text-muted">{priceSuffix(property)}</span>
            </p>
            <p className="truncate text-xs text-muted">{property.title}</p>
          </div>
          <a href={`tel:${agent.phone.replace(/\s/g, '')}`} aria-label={`Call ${agent.name}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-line text-navy">
            <Phone className="h-4 w-4" />
          </a>
          <Button size="sm" variant="outline" className="h-10 border-line" onClick={() => lead('visit', 'details:mobile-bar')}>
            Visit
          </Button>
          <Button size="sm" className="h-10" onClick={() => lead('enquiry', 'details:mobile-bar')}>
            Enquire
          </Button>
        </div>
      </div>
      <div className="h-16 lg:hidden" />
    </>
  )
}

function Panel({ title, action, children }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[1.5rem] sm:text-[1.75rem]">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function DetailsSkeleton() {
  return (
    <div className="container-page pt-28 pb-20" aria-busy="true" aria-label="Loading property">
      <Skeleton className="h-4 w-64" />
      <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row">
        <div className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-12 w-80 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-12 w-48" />
      </div>
      <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_13rem]">
        <Skeleton className="aspect-[16/10] rounded-lg" />
        <div className="hidden gap-3 lg:grid">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-full rounded-md" />
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_26rem]">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  )
}

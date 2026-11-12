import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, MessageSquare } from 'lucide-react'
import Badge from '../common/Badge'
import Skeleton from '../common/Skeleton'
import { useLead } from '../../context/LeadContext'
import PropertySpecs from './PropertySpecs'
import { getLocation } from '../../data/locations'
import { getCategory } from '../../data/categories'
import { cn, formatPrice, priceSuffix, statusLabel } from '../../utils/format'

function Labels({ property }) {
  return (
    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
      {property.labels.includes('featured') && <Badge tone="gold">Featured</Badge>}
      {property.labels.includes('new') && <Badge tone="navy">New</Badge>}
      <Badge tone="light">{statusLabel(property.status)}</Badge>
    </div>
  )
}

function Price({ property, className }) {
  return (
    <p className={cn('font-serif text-[1.375rem] leading-none text-navy', className)}>
      {formatPrice(property)}
      {priceSuffix(property) && <span className="ml-1 font-sans text-sm text-muted">{priceSuffix(property)}</span>}
    </p>
  )
}

export default function PropertyCard({ property, variant = 'grid', className, imageLoading = 'lazy' }) {
  const href = `/properties/${property.slug}`
  const city = getLocation(property.city)?.name
  const category = getCategory(property.type)?.label
  const { openLead } = useLead()
  const enquire = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openLead('enquiry', { property, source: 'property-card' })
  }

  if (variant === 'list') {
    return (
      <article className={cn('group relative grid overflow-hidden rounded-lg border border-line bg-white transition duration-300 hover:shadow-lift sm:grid-cols-[minmax(0,15rem)_1fr] md:grid-cols-[minmax(0,19rem)_1fr]', className)}>
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[15rem]">
          <Link to={href} className="absolute inset-0" tabIndex={-1} aria-hidden>
            <img src={property.images[0]} alt="" loading={imageLoading} className="img-cover transition duration-700 ease-out-soft group-hover:scale-[1.04]" />
          </Link>
          <Labels property={property} />
        </div>
        <div className="flex flex-col p-5 sm:p-6">
          <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> {property.locality}, {city}
            <span className="mx-1 text-line">|</span>
            {category}
          </p>
          <h3 className="mt-1.5 text-[1.375rem]">
            <Link to={href} className="transition hover:text-gold-dark">
              {property.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-[0.9375rem] text-muted">{property.summary}</p>
          <PropertySpecs property={property} className="mt-4" showParking />
          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4 sm:mt-5">
            <Price property={property} />
            <div className="flex items-center gap-4">
              <Link to={href} className="inline-flex items-center gap-1 text-sm font-medium text-navy transition hover:text-gold-dark">
                View details <ArrowUpRight className="h-4 w-4" />
              </Link>
              <EnquireButton onClick={enquire} title={property.title} />
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={cn('group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lift', className)}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={property.images[0]} alt="" loading={imageLoading} className="img-cover transition duration-700 ease-out-soft group-hover:scale-[1.05]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/35 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <Labels property={property} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-[0.8125rem] text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">
            {property.locality}, {city}
          </span>
        </p>
        <h3 className="mt-1.5 text-[1.3rem] leading-snug">
          <Link to={href} className="transition after:absolute after:inset-0 after:content-[''] hover:text-gold-dark">
            {property.title}
          </Link>
        </h3>
        <PropertySpecs property={property} className="mt-3" />
        <div className="min-h-5 flex-1" />
        <div className="flex items-end justify-between gap-3 border-t border-line pt-4">
          <Price property={property} />
          <EnquireButton onClick={enquire} title={property.title} />
        </div>
      </div>
    </article>
  )
}

function EnquireButton({ onClick, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Enquire about ${title}`}
      className="relative z-10 inline-flex h-9 items-center gap-1.5 rounded-md border border-navy/15 px-3 text-sm font-medium text-navy transition hover:border-navy hover:bg-navy hover:text-white"
    >
      <MessageSquare className="h-3.5 w-3.5" /> Enquire
    </button>
  )
}

export function PropertyCardSkeleton({ variant = 'grid' }) {
  if (variant === 'list') {
    return (
      <div className="grid overflow-hidden rounded-lg border border-line bg-white sm:grid-cols-[15rem_1fr] md:grid-cols-[19rem_1fr]">
        <Skeleton className="aspect-[4/3] rounded-none sm:aspect-auto sm:h-full" />
        <div className="space-y-3 p-6">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="mt-6 h-6 w-1/4" />
        </div>
      </div>
    )
  }
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3.5 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <div className="border-t border-line pt-4">
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
    </div>
  )
}

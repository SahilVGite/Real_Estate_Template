import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../utils/format'

/** Compact page intro with breadcrumbs, used across inner pages. */
export default function PageHeader({ eyebrow, title, description, crumbs = [], image, children, className }) {
  return (
    <section className={cn('relative overflow-hidden bg-navy text-white', className)}>
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />
        </>
      )}
      <div className="container-page relative pt-32 pb-14 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20">
        {crumbs.length > 0 && <Breadcrumbs crumbs={crumbs} light />}
        {eyebrow && <span className="eyebrow eyebrow-light mt-6">{eyebrow}</span>}
        <h1 className="mt-3 max-w-3xl text-[2.25rem] leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-[1.0625rem] text-white/70">{description}</p>}
        {children}
      </div>
    </section>
  )
}

export function Breadcrumbs({ crumbs, light = false }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', light ? 'text-white/60' : 'text-muted')}>
        <li>
          <Link to="/" className={cn('transition', light ? 'hover:text-white' : 'hover:text-navy')}>
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
            {c.to && i < crumbs.length - 1 ? (
              <Link to={c.to} className={cn('transition', light ? 'hover:text-white' : 'hover:text-navy')}>
                {c.label}
              </Link>
            ) : (
              <span className={light ? 'text-white' : 'text-ink'} aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

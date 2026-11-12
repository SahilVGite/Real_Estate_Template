import { Link } from 'react-router-dom'
import { cn } from '../../utils/format'

/** Wordmark: an arched doorway monogram set beside a serif name. */
export default function Logo({ light = false, className }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-2.5', className)} aria-label="Abode Realty — home">
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden>
        <rect width="36" height="36" rx="6" className={light ? 'fill-white/10' : 'fill-navy'} />
        <path d="M9 28V16.2L18 9l9 7.2V28" fill="none" stroke="#D9C5A3" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14.5 28v-6.2a3.5 3.5 0 0 1 7 0V28" fill="none" stroke="#B8955A" strokeWidth="1.8" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={cn('font-serif text-[1.45rem] font-semibold tracking-tight', light ? 'text-white' : 'text-navy')}>Abode</span>
        <span className={cn('mt-1 text-[0.56rem] font-semibold tracking-[0.32em] uppercase', light ? 'text-beige' : 'text-gold-dark')}>
          Realty
        </span>
      </span>
    </Link>
  )
}

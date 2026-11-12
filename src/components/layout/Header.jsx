import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, MessageSquare, ArrowRight, Phone } from 'lucide-react'
import Logo from '../common/Logo'
import Button from '../common/Button'
import MobileNav from './MobileNav'
import { mainNav, isNavActive } from './navigation'
import { useScrolled, useClickOutside, useOnKey } from '../../hooks'
import { useLead } from '../../context/LeadContext'
import { cn } from '../../utils/format'
import { site } from '../../data/site'
import { getFeaturedProperties } from '../../services/propertyService'

/** Routes whose top section is dark navy, so the transparent header needs light text. */
const DARK_HERO_ROUTES = [/^\/properties\/?$/, /^\/about/, /^\/contact/]

export default function Header() {
  const location = useLocation()
  const scrolled = useScrolled(24)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { openLead } = useLead()
  const onDarkHero = DARK_HERO_ROUTES.some((r) => r.test(location.pathname))
  const light = onDarkHero && !scrolled // light text on transparent header

  useEffect(() => setDrawerOpen(false), [location])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
          scrolled ? 'border-b border-line bg-white/95 shadow-[0_8px_30px_-20px_rgba(23,43,58,0.35)] backdrop-blur-md' : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className={cn('container-page flex items-center justify-between gap-4 transition-[height] duration-300', scrolled ? 'h-[4.25rem]' : 'h-20 lg:h-24')}>
          <Logo light={light} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {mainNav.map((item) =>
                item.menu ? (
                  <PropertiesMenu key={item.label} item={item} light={light} active={isNavActive(item, location)} />
                ) : (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      className={cn(
                        'relative inline-flex h-10 items-center px-3 text-[0.9375rem] font-medium transition-colors',
                        light ? 'text-white/80 hover:text-white' : 'text-ink/80 hover:text-navy',
                        isNavActive(item, location) && (light ? '!text-white' : '!text-navy'),
                      )}
                    >
                      {item.label}
                      {isNavActive(item, location) && <ActiveBar />}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className={cn('hidden items-center gap-2 text-[0.9375rem] font-medium transition xl:inline-flex', light ? 'text-white hover:text-beige' : 'text-navy hover:text-gold-dark')}
            >
              <span className={cn('grid h-9 w-9 place-items-center rounded-full', light ? 'bg-white/10' : 'bg-navy/5')}>
                <Phone className="h-4 w-4" />
              </span>
              {site.phone}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              aria-label={`Call ${site.phone}`}
              className={cn('grid h-10 w-10 place-items-center rounded-full transition xl:hidden', light ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/5')}
            >
              <Phone className="h-5 w-5" strokeWidth={1.8} />
            </a>
            <Button
              variant="gold"
              size="sm"
              className="h-10 px-4 max-sm:hidden xl:px-5"
              iconLeft={<MessageSquare className="h-4 w-4" />}
              onClick={() => openLead('requirement', { source: 'header' })}
            >
              Enquire Now
            </Button>
            <button
              onClick={() => setDrawerOpen(true)}
              className={cn('grid h-10 w-10 place-items-center rounded-full transition lg:hidden', light ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/5')}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <MobileNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

function ActiveBar() {
  return <motion.span layoutId="nav-active" className="absolute right-3 bottom-1 left-3 h-[2px] rounded-full bg-gold" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
}

function PropertiesMenu({ item, light, active }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const timer = useRef()
  const location = useLocation()
  const featured = getFeaturedProperties()[0]
  useClickOutside(ref, () => setOpen(false), open)
  useOnKey('Escape', () => setOpen(false), open)
  useEffect(() => setOpen(false), [location])

  const show = () => {
    clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 140)
  }

  return (
    <li ref={ref} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'relative inline-flex h-10 items-center gap-1 px-3 text-[0.9375rem] font-medium transition-colors',
          light ? 'text-white/80 hover:text-white' : 'text-ink/80 hover:text-navy',
          active && (light ? '!text-white' : '!text-navy'),
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
        {active && <ActiveBar />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 w-[46rem] -translate-x-1/2 pt-3"
          >
            <div className="grid grid-cols-[1.5fr_0.8fr_1fr] gap-6 rounded-lg border border-line bg-white p-6 shadow-lift">
              <div>
                <p className="mb-3 text-[0.6875rem] font-semibold tracking-[0.16em] text-muted uppercase">Property types</p>
                <ul className="grid grid-cols-1 gap-0.5">
                  {item.menu.types.map(({ label, to, icon: Icon, description }) => (
                    <li key={label}>
                      <Link to={to} className="group flex items-start gap-3 rounded-md p-2 transition hover:bg-cream">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-beige-50 text-gold-dark transition group-hover:bg-navy group-hover:text-beige">
                          <Icon className="h-4 w-4" strokeWidth={1.7} />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-ink">{label}</span>
                          <span className="block text-xs text-muted">{description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[0.6875rem] font-semibold tracking-[0.16em] text-muted uppercase">Cities</p>
                <ul className="space-y-0.5">
                  {item.menu.cities.map((c) => (
                    <li key={c.label}>
                      <Link to={c.to} className="block rounded-md px-2 py-1.5 text-sm text-ink transition hover:bg-cream hover:text-navy">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/properties" className="mt-3 inline-flex items-center gap-1 px-2 text-sm font-medium text-gold-dark hover:text-navy">
                  All properties <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {featured && (
                <Link to={`/properties/${featured.slug}`} className="group relative flex flex-col overflow-hidden rounded-md">
                  <img src={featured.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                  <div className="relative mt-auto p-4 text-white">
                    <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-beige uppercase">Featured</span>
                    <p className="mt-1 font-serif text-lg leading-snug">{featured.title}</p>
                    <p className="text-xs text-white/70">{featured.locality}</p>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}


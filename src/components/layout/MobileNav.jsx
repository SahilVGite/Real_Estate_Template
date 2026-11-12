import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronDown, Phone, Mail, MessageSquare, PhoneCall } from 'lucide-react'
import Logo from '../common/Logo'
import Button from '../common/Button'
import { mainNav, isNavActive } from './navigation'
import { useLockBodyScroll, useOnKey } from '../../hooks'
import { useLead } from '../../context/LeadContext'
import { site } from '../../data/site'
import { cn } from '../../utils/format'

export default function MobileNav({ open, onClose }) {
  const location = useLocation()
  const { openLead } = useLead()
  const [expanded, setExpanded] = useState(null)
  useLockBodyScroll(open)
  useOnKey('Escape', onClose, open)

  const lead = (type) => {
    onClose()
    openLead(type, { source: 'mobile-menu' })
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div className="absolute inset-0 bg-navy-950/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 flex h-full w-full max-w-[24rem] flex-col bg-white"
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-5">
              <Logo />
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-cream" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <nav aria-label="Mobile">
                <ul className="divide-y divide-line">
                  {mainNav.map((item) => (
                    <li key={item.label}>
                      {item.menu ? (
                        <>
                          <button
                            onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                            className={cn('flex w-full items-center justify-between py-3.5 font-serif text-xl', isNavActive(item, location) ? 'text-gold-dark' : 'text-navy')}
                            aria-expanded={expanded === item.label}
                          >
                            {item.label}
                            <ChevronDown className={cn('h-5 w-5 text-muted transition', expanded === item.label && 'rotate-180')} />
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded === item.label && (
                              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 pb-3">
                                  {item.menu.types.map((t) => (
                                    <Link key={t.label} to={t.to} onClick={onClose} className="flex items-center gap-2 rounded-md py-1.5 text-sm text-ink">
                                      <t.icon className="h-4 w-4 text-gold-dark" strokeWidth={1.7} /> {t.label}
                                    </Link>
                                  ))}
                                </div>
                                <p className="pt-1 text-[0.6875rem] font-semibold tracking-[0.14em] text-muted uppercase">Cities</p>
                                <div className="flex flex-wrap gap-1.5 pt-2 pb-4">
                                  {item.menu.cities.map((c) => (
                                    <Link key={c.label} to={c.to} onClick={onClose} className="rounded-full border border-line px-3 py-1 text-sm text-ink">
                                      {c.label}
                                    </Link>
                                  ))}
                                </div>
                                <Link to="/properties" onClick={onClose} className="mb-4 block text-sm font-medium text-gold-dark">
                                  View all properties →
                                </Link>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link to={item.to} onClick={onClose} className={cn('flex items-center justify-between py-3.5 font-serif text-xl', isNavActive(item, location) ? 'text-gold-dark' : 'text-navy')}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="shrink-0 space-y-3 border-t border-line p-5">
              <Button variant="gold" className="w-full" onClick={() => lead('requirement')} iconLeft={<MessageSquare className="h-4 w-4" />}>
                Enquire Now
              </Button>
              <Button variant="outline" className="w-full" onClick={() => lead('callback')} iconLeft={<PhoneCall className="h-4 w-4" />}>
                Request a callback
              </Button>
              <div className="flex flex-wrap gap-x-5 gap-y-1 pt-2 text-sm text-muted">
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-navy">
                  <Phone className="h-3.5 w-3.5" /> {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-navy">
                  <Mail className="h-3.5 w-3.5" /> Email us
                </a>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

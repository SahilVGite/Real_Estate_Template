import { MapPin, ShieldCheck, Clock, BadgeCheck, Star } from 'lucide-react'
import Modal from '../common/Modal'
import LeadForm from './LeadForm'
import { LEAD_TYPES } from './leadTypes'
import { getAgent, agents } from '../../data/agents'
import { getLocation } from '../../data/locations'
import { formatPrice, priceSuffix } from '../../utils/format'

const trust = [
  { icon: ShieldCheck, text: 'Every property personally verified' },
  { icon: Clock, text: 'Response within 2 working hours' },
  { icon: BadgeCheck, text: 'Free, no-obligation advice' },
]

/** Two-panel lead popup: context on the left (property or advisors), form on the right. */
export default function LeadModal({ open, onClose, type = 'enquiry', property, source, heading }) {
  const config = LEAD_TYPES[type] ?? LEAD_TYPES.enquiry
  const agent = property ? getAgent(property.agentId) : null
  const Icon = config.icon

  return (
    <Modal open={open} onClose={onClose} ariaLabel={heading?.title ?? config.title} size="xl" padded={false}>
      <div className="grid md:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative hidden overflow-hidden bg-navy text-white md:flex md:flex-col">
          {property ? (
            <>
              <div className="relative aspect-[4/3]">
                <img src={property.images[0]} alt="" className="img-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
              </div>
              <div className="relative -mt-14 flex flex-1 flex-col p-7">
                <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-beige uppercase">{property.status === 'rent' ? 'For rent' : 'For sale'}</p>
                <h3 className="mt-1 font-serif text-2xl leading-snug text-white">{property.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="h-3.5 w-3.5" /> {property.locality}, {getLocation(property.city)?.name}
                </p>
                <p className="mt-4 font-serif text-3xl text-beige">
                  {formatPrice(property)}
                  <span className="ml-1 font-sans text-sm text-white/60">{priceSuffix(property)}</span>
                </p>
                {agent && (
                  <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
                    <img src={agent.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium">{agent.name}</p>
                      <p className="text-xs text-white/60">{agent.role}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col p-8">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-white/10 text-beige">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-serif text-[1.75rem] leading-snug text-white">Speak to an advisor who knows the neighbourhood</h3>
              <ul className="mt-6 space-y-3.5">
                {trust.map((t) => (
                  <li key={t.text} className="flex items-center gap-3 text-sm text-white/80">
                    <t.icon className="h-4 w-4 shrink-0 text-gold" /> {t.text}
                  </li>
                ))}
              </ul>
              <div className="mt-auto border-t border-white/10 pt-6">
                <div className="flex -space-x-3">
                  {agents.map((a) => (
                    <img key={a.id} src={a.photo} alt="" className="h-11 w-11 rounded-full border-2 border-navy object-cover" />
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
                  <Star className="h-4 w-4 fill-gold text-gold" /> 4.9/5 from 1,200+ families
                </p>
              </div>
            </div>
          )}
        </aside>

        <div className="max-h-[92vh] overflow-y-auto p-6 sm:p-8">
          {/* compact property strip on mobile */}
          {property && (
            <div className="mb-5 flex items-center gap-3 rounded-md bg-cream p-2.5 pr-10 md:hidden">
              <img src={property.images[0]} alt="" className="h-14 w-16 shrink-0 rounded object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{property.title}</p>
                <p className="text-xs text-muted">
                  {property.locality} · {formatPrice(property)}
                  {priceSuffix(property)}
                </p>
              </div>
            </div>
          )}
          <span className="eyebrow">{heading?.eyebrow ?? config.eyebrow}</span>
          <h2 className="mt-2 pr-8 text-[1.75rem] leading-tight sm:text-[2rem]">{heading?.title ?? config.title}</h2>
          <p className="mt-2 text-[0.9375rem] text-muted">{heading?.subtitle ?? config.subtitle}</p>
          <div className="mt-6">
            <LeadForm key={`${type}-${property?.id ?? 'general'}`} type={type} property={property} source={source} onDone={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

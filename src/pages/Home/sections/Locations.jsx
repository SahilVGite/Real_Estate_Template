import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'
import { locations } from '../../../data/locations'
import { countBy } from '../../../services/propertyService'
import { cn } from '../../../utils/format'
import { useLead } from '../../../context/LeadContext'

const counts = countBy('city')

/** Bento layout: larger images take the larger tiles so nothing is upscaled. */
const layout = {
  mumbai: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  bengaluru: 'sm:col-span-2 lg:col-span-2',
  goa: '',
  hyderabad: '',
  pune: 'sm:col-span-2 lg:col-span-2',
  gurugram: '',
}

export default function Locations() {
  const { openLead } = useLead()
  return (
    <section className="bg-cream py-20 lg:py-28" aria-labelledby="locations-heading" id="locations">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured locations"
          title={<span id="locations-heading">Where would you like to live?</span>}
          description="From coastal villages to buzzing city centres, explore homes in the places our clients love most."
        />
        <ul className="mt-12 grid grid-flow-dense auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:auto-rows-[16.5rem] lg:grid-cols-4 lg:gap-5">
          {locations.map((l, i) => (
            <Reveal as="li" key={l.id} delay={(i % 4) * 0.06} className={cn(layout[l.id])}>
              <Link to={`/properties?city=${l.id}`} className="group relative block h-full overflow-hidden rounded-lg">
                <img src={l.image} alt="" loading="lazy" className="img-cover transition duration-700 ease-out-soft group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-beige uppercase">
                      {counts[l.id] || 0} properties
                    </p>
                    <h3 className={cn('mt-1 font-serif text-white', l.id === 'mumbai' ? 'text-3xl lg:text-4xl' : 'text-2xl')}>{l.name}</h3>
                    <p className="mt-1 text-sm text-white/70">{l.tagline}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-navy transition group-hover:bg-gold">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.2}>
            <button
              type="button"
              onClick={() => openLead('requirement', { source: 'locations-tile' })}
              className="group flex h-full w-full flex-col justify-between rounded-lg border border-navy/10 bg-navy p-6 text-left text-white transition hover:bg-navy-800"
            >
              <MessageCircle className="h-7 w-7 text-beige" strokeWidth={1.5} />
              <div>
                <h3 className="font-serif text-2xl text-white">Looking elsewhere?</h3>
                <p className="mt-1.5 text-sm text-white/70">Our network covers 20+ more cities. Tell us where — we’ll do the searching.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-beige">
                  Talk to an advisor <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </button>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}

import { ArrowRight, Check } from 'lucide-react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { services } from '../../data/services'
import { useLead } from '../../context/LeadContext'
import { cn } from '../../utils/format'

/** Advisory services — each card opens the most relevant lead popup. */
export default function ServicesGrid({ className, eyebrow = 'What we do', title = 'End-to-end property advisory' }) {
  const { openLead } = useLead()
  return (
    <section className={cn('bg-white py-20 lg:py-28', className)} aria-labelledby="services-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow={eyebrow}
          title={<span id="services-heading">{title}</span>}
          description="One team for every step — from the first shortlist to the day you get the keys, and long after."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 3) * 0.06} className="group flex flex-col bg-white p-7 transition hover:bg-cream sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-beige-50 text-gold-dark transition group-hover:bg-navy group-hover:text-beige">
                <s.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 text-[1.5rem]">{s.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-ink">
                    <Check className="h-4 w-4 shrink-0 text-success" strokeWidth={2.4} /> {p}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openLead(s.lead, { source: `service:${s.id}`, heading: { eyebrow: s.title, title: s.lead === 'callback' ? `Talk to our ${s.title.toLowerCase()} team` : 'Tell us what you’re looking for' } })}
                className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-navy transition hover:text-gold-dark"
              >
                {s.lead === 'callback' ? 'Request a callback' : 'Get a free shortlist'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { ShieldCheck, Users, Receipt, HeartHandshake } from 'lucide-react'
import Reveal from './Reveal'
import StatCounter from './StatCounter'
import { stats } from '../../data/site'

export const reasons = [
  {
    icon: ShieldCheck,
    title: 'Verified properties',
    text: 'Every listing is visited in person, with title documents and approvals checked before it goes live.',
  },
  {
    icon: Users,
    title: 'Expert local agents',
    text: 'Advisors who live in the neighbourhoods they cover and know each building, lane and society.',
  },
  {
    icon: Receipt,
    title: 'Transparent pricing',
    text: 'Clear asking prices, recent comparable sales and no hidden fees — so you can negotiate with confidence.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalised assistance',
    text: 'From the first shortlist to registration day, one dedicated advisor stays with you throughout.',
  },
]

/** Navy band used on Home and About. */
export default function WhyChooseUs({ showStats = true }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white lg:py-28" aria-labelledby="why-heading">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow eyebrow-light">Why Abode</span>
          <h2 id="why-heading" className="mt-3 text-[2rem] leading-[1.12] text-white sm:text-[2.5rem] lg:text-[2.85rem]">
            A calmer, more honest way to find your next home
          </h2>
          <p className="mt-5 max-w-lg text-[1.0625rem] text-white/70">
            We started Abode because buying a home shouldn’t feel like a gamble. Fifteen years on, our promise is the same: fewer, better options and
            advice you can trust.
          </p>
          {showStats && (
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/10 pt-10">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} light />
              ))}
            </div>
          )}
        </Reveal>

        <ul className="grid self-center sm:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              delay={i * 0.08}
              className="border-white/10 py-8 first:pt-0 sm:p-8 sm:first:pt-8 sm:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(odd)]:border-r max-sm:border-b max-sm:last:border-b-0"
            >
              <span className="grid h-12 w-12 place-items-center rounded-md border border-beige/30 text-beige">
                <r.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 text-[1.375rem] text-white">{r.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/65">{r.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { Clock, ShieldCheck, Sparkles, Users } from 'lucide-react'
import Reveal from '../common/Reveal'
import LeadForm from './LeadForm'

const perks = [
  { icon: Clock, title: 'Shortlist in 24 hours', text: 'Hand-picked homes that match your brief, not a flood of listings.' },
  { icon: Sparkles, title: 'Off-market access', text: 'Homes that owners prefer not to advertise publicly.' },
  { icon: ShieldCheck, title: 'Verified & priced right', text: 'Every option checked in person, with comparable sales.' },
  { icon: Users, title: 'One dedicated advisor', text: 'Someone who knows the neighbourhood and stays with you.' },
]

/** Inline lead-generation section with the requirement form embedded. */
export default function RequirementSection({ source = 'requirement-section', className = 'bg-cream' }) {
  return (
    <section className={`${className} py-20 lg:py-28`} aria-labelledby="requirement-heading" id="find-a-home">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <span className="eyebrow">Free property search</span>
          <h2 id="requirement-heading" className="mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.85rem]">
            Tell us what you need. We’ll do the searching.
          </h2>
          <p className="mt-4 max-w-lg text-[1.0625rem] text-muted">
            Skip the endless scrolling. Share a few details and an advisor will send you a curated shortlist — then arrange visits for the homes you love.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-navy text-beige">
                  <p.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block font-medium text-ink">{p.title}</span>
                  <span className="text-sm text-muted">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="rounded-lg border border-line bg-white p-6 shadow-soft sm:p-9">
          <h3 className="text-[1.6rem]">Get your free shortlist</h3>
          <p className="mt-1 mb-6 text-sm text-muted">Takes less than a minute.</p>
          <LeadForm type="requirement" source={source} />
        </Reveal>
      </div>
    </section>
  )
}

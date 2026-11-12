import { Search, CalendarCheck, KeyRound } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'

const steps = [
  {
    icon: Search,
    title: 'Discover properties',
    text: 'Search verified listings by city, budget and lifestyle — or tell an advisor what you need and receive a personal shortlist.',
  },
  {
    icon: CalendarCheck,
    title: 'Schedule a visit',
    text: 'Book in-person or video tours in a couple of taps. We’ll accompany you, answer questions and share comparable prices.',
  },
  {
    icon: KeyRound,
    title: 'Find your dream home',
    text: 'We negotiate on your behalf, coordinate legal checks and stay with you until the keys are in your hand.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="how-heading">
      <div className="container-page">
        <SectionHeading align="center" eyebrow="How it works" title={<span id="how-heading">Three simple steps to the right home</span>} />
        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-20 lg:gap-14">
          {/* connecting line */}
          <div className="absolute top-8 right-[16.6%] left-[16.6%] hidden border-t border-dashed border-[#d6cfc2] md:block" aria-hidden />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="relative flex flex-col items-center text-center">
              <span className="relative grid h-16 w-16 place-items-center rounded-full border border-line bg-white text-navy shadow-soft">
                <s.icon className="h-6 w-6" strokeWidth={1.6} />
                <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-gold text-[0.6875rem] font-semibold text-navy">{i + 1}</span>
              </span>
              <span className="mt-6 font-serif text-sm text-gold-dark italic">Step 0{i + 1}</span>
              <h3 className="mt-1 text-[1.5rem]">{s.title}</h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

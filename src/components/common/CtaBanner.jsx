import { ArrowRight, PhoneCall } from 'lucide-react'
import { useLead } from '../../context/LeadContext'
import Button from './Button'
import Reveal from './Reveal'

export default function CtaBanner({
  eyebrow = 'Ready when you are',
  title = 'Your next chapter starts with the right address',
  text = 'Explore hand-picked, verified homes — or speak to an advisor who will find the right one for you, at no cost.',
}) {
  const { openLead } = useLead()
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-xl bg-navy">
          <div className="absolute -top-1/2 right-[-10%] h-[140%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(217,197,163,0.16),transparent)]" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
            <Reveal className="px-6 pt-12 pb-2 sm:px-12 sm:pt-14 lg:py-20 lg:pr-0 lg:pl-16">
              <span className="eyebrow eyebrow-light">{eyebrow}</span>
              <h2 className="mt-3 text-[2rem] leading-[1.12] text-white sm:text-[2.6rem] lg:text-[3rem]">{title}</h2>
              <p className="mt-4 max-w-lg text-[1.0625rem] text-white/70">{text}</p>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row">
                <Button to="/properties" variant="gold" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                  Explore properties
                </Button>
                <Button variant="outline-light" size="lg" iconLeft={<PhoneCall className="h-4 w-4" />} onClick={() => openLead('callback', { source: 'cta-banner' })}>
                  Request a callback
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="relative flex justify-center px-6 pb-0 sm:px-12 lg:justify-end lg:px-0">
              <img
                src="/images/cutout-modern-villa.webp"
                alt="Illustration of a modern three-storey villa with glass balconies"
                loading="lazy"
                className="w-full max-w-[30rem] translate-y-4 object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)] lg:max-w-[34rem] lg:translate-x-6 lg:translate-y-8"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

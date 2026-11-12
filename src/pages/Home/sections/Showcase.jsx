import { ArrowRight, Check } from 'lucide-react'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'

const points = ['Architect-designed homes with natural light at their heart', 'Neighbourhoods chosen for schools, green space and community', 'Private viewings arranged around your schedule']

export default function Showcase() {
  return (
    <section className="overflow-hidden bg-cream py-20 lg:py-32" aria-labelledby="showcase-heading">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <Reveal className="relative pr-8 pb-16 sm:pr-16 sm:pb-20 lg:pr-20">
          <div className="aspect-[4/3.2] overflow-hidden rounded-lg">
            <img src="/images/architecture-facade-wide.webp" alt="Contemporary dark-clad residential facade against a pale blue sky" loading="lazy" className="img-cover object-[50%_35%]" />
          </div>
          <div className="absolute right-0 bottom-0 w-[52%] overflow-hidden rounded-lg border-[6px] border-cream shadow-lift sm:w-[46%]">
            <div className="aspect-[405/370]">
              <img src="/images/interior-kitchen-open.webp" alt="Bright open-plan kitchen with an island and dining area" loading="lazy" className="img-cover" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">Lifestyle</span>
          <h2 id="showcase-heading" className="mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.85rem]">
            Homes designed around the way you <em className="text-gold-dark italic">actually</em> live
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
            Good homes are more than square footage. We look for the morning light in a kitchen, the quiet of a bedroom at night and a terrace that
            makes you want to stay outside. Then we help you find the one that fits.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex gap-3.5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-beige">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink">{p}</span>
              </li>
            ))}
          </ul>
          <Button to="/properties?type=villa" size="lg" className="mt-10" iconRight={<ArrowRight className="h-4 w-4" />}>
            Explore villas & homes
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

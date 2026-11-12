import { Link } from 'react-router-dom'
import { ArrowUpRight, ShieldCheck, Camera, FileCheck2, BadgeCheck } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import FaqList from '../../components/common/FaqList'
import { locations, cityDetails } from '../../data/locations'
import { categories } from '../../data/categories'
import { countBy } from '../../services/propertyService'
import { generalFaqs } from '../../data/faqs'

const cityCounts = countBy('city')

const popular = [
  ...categories.slice(0, 4).flatMap((c) => locations.slice(0, 2).map((l) => ({ label: `${c.plural} in ${l.name}`, to: `/properties?type=${c.id}&city=${l.id}` }))),
  { label: 'Luxury villas in Goa', to: '/properties?type=villa&city=goa' },
  { label: 'Sea-facing homes in Mumbai', to: '/properties?city=mumbai&q=sea' },
  { label: 'Furnished rentals in Bengaluru', to: '/properties?city=bengaluru&status=rent' },
  { label: 'Penthouses with terrace', to: '/properties?type=penthouse&q=terrace' },
]

const checks = [
  { icon: ShieldCheck, title: 'Visited in person', text: 'An advisor walks through every home before it is listed.' },
  { icon: FileCheck2, title: 'Documents checked', text: 'Title, approvals and occupancy certificates reviewed.' },
  { icon: Camera, title: 'Real photographs', text: 'What you see online is what you see on your visit.' },
  { icon: BadgeCheck, title: 'Honest pricing', text: 'Asking prices benchmarked against recent comparable deals.' },
]

/** Supporting content below the listing grid: verification, city guides, popular searches and FAQs. */
export default function ListingContent() {
  return (
    <>
      <section className="border-t border-line bg-white py-16 lg:py-20" aria-labelledby="verified-heading">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The Abode standard</span>
            <h2 id="verified-heading" className="mt-3 text-[2rem] sm:text-[2.4rem]">
              What “verified” means on every listing
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {checks.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} className="rounded-lg border border-line p-6">
                <c.icon className="h-6 w-6 text-gold-dark" strokeWidth={1.5} />
                <h3 className="mt-4 text-xl">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{c.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20" aria-labelledby="city-guides-heading">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">City guides</span>
            <h2 id="city-guides-heading" className="mt-3 text-[2rem] sm:text-[2.4rem]">
              Explore the cities we know best
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((l, i) => (
              <Reveal as="li" key={l.id} delay={(i % 3) * 0.06}>
                <Link to={`/properties?city=${l.id}`} className="group flex h-full gap-4 rounded-lg border border-line bg-white p-4 transition hover:border-navy/30 hover:shadow-soft">
                  <img src={l.image} alt="" loading="lazy" className="h-24 w-24 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl transition group-hover:text-gold-dark">{l.name}</h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-navy" />
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{cityDetails[l.id].note}</p>
                    <p className="mt-2 text-xs font-medium text-gold-dark">{cityCounts[l.id] || 0} verified listings</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-14">
            <h3 className="font-sans text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">Popular searches</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {popular.map((p) => (
                <li key={p.label}>
                  <Link to={p.to} className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm text-ink transition hover:border-navy hover:text-navy">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20" aria-labelledby="listing-faq-heading">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 id="listing-faq-heading" className="mt-3 text-[2rem] sm:text-[2.4rem]">
              Buying or renting with Abode
            </h2>
          </div>
          <FaqList faqs={generalFaqs} />
        </div>
      </section>
    </>
  )
}

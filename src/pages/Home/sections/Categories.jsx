import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Reveal from '../../../components/common/Reveal'
import Button from '../../../components/common/Button'
import { categories } from '../../../data/categories'
import { countBy } from '../../../services/propertyService'

const counts = countBy('type')

export default function Categories() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="categories-heading">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="eyebrow">Explore by category</span>
          <h2 id="categories-heading" className="mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.85rem]">
            Every kind of space, carefully chosen
          </h2>
          <p className="mt-4 text-[1.0625rem] text-muted">
            Whether you’re after a city apartment, a weekend villa or a showroom on the high street, start with the type of space that fits your life.
          </p>
          <Button to="/properties" variant="outline" className="mt-8" iconRight={<ArrowRight className="h-4 w-4" />}>
            Browse all
          </Button>
        </Reveal>

        <ul className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 md:gap-5">
          {categories.map((c, i) => {
            const n = counts[c.id] || 0
            return (
              <Reveal as="li" key={c.id} delay={(i % 3) * 0.06}>
                <Link to={`/properties?type=${c.id}`} className="group relative block aspect-[4/3] overflow-hidden rounded-lg xs:aspect-square md:aspect-[6/5.4]">
                  <img src={c.image} alt="" loading="lazy" className="img-cover transition duration-700 ease-out-soft group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent transition duration-500 group-hover:from-navy" />
                  <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition group-hover:bg-gold group-hover:text-navy">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <c.icon className="mb-3 h-6 w-6 text-beige" strokeWidth={1.5} />
                    <h3 className="font-serif text-xl text-white sm:text-[1.375rem]">{c.plural}</h3>
                    <p className="mt-0.5 text-sm text-white/70">
                      {n} {n === 1 ? 'listing' : 'listings'}
                    </p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

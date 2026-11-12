import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react'
import Button from '../../../components/common/Button'
import Rating from '../../../components/common/Rating'
import PropertySearch from '../../../components/property/PropertySearch'
import { testimonials } from '../../../data/testimonials'
import { properties } from '../../../data/properties'
import { formatPrice } from '../../../utils/format'
import { useLead } from '../../../context/LeadContext'

const ease = [0.22, 1, 0.36, 1]
const heroProperty = properties.find((p) => p.id === 'p01')

export default function Hero() {
  const { openLead } = useLead()
  return (
    <section className="relative overflow-hidden bg-cream pt-24 lg:pt-28">
      {/* Soft beige block anchoring the image column */}
      <div className="absolute top-0 right-0 bottom-[9rem] hidden w-[38%] bg-beige-50 lg:block" aria-hidden />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.08fr] lg:gap-14">
          <div className="pt-6 lg:pt-0 lg:pb-24">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
              Verified homes across six cities
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease }}
              className="mt-5 text-[2.6rem] leading-[1.04] font-medium xs:text-[3rem] sm:text-[3.6rem] xl:text-[4.4rem]"
            >
              Find a place you’ll love to call <em className="font-normal text-gold-dark italic">home.</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease }}
              className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-muted sm:text-lg"
            >
              From sea-facing apartments in Mumbai to garden villas in Goa — discover hand-checked properties, honest pricing and advisors who know every
              street.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease }}
              className="mt-9 flex flex-col gap-3 xs:flex-row"
            >
              <Button to="/properties" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                Explore properties
              </Button>
              <Button size="lg" variant="outline" onClick={() => openLead('callback', { source: 'hero' })}>
                Talk to an advisor
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 4).map((t) => (
                  <img key={t.id} src={t.photo} alt="" className="h-10 w-10 rounded-full border-2 border-cream object-cover" />
                ))}
              </div>
              <div className="text-sm">
                <Rating value={5} />
                <p className="mt-0.5 text-muted">
                  <span className="font-semibold text-ink">4.9/5</span> from 1,200+ families
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="relative lg:pb-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[16/11] lg:aspect-[1/1.02] xl:aspect-[1.08/1]">
              <img
                src="/images/hero-villa-pool.webp"
                alt="Modern white villa with floor-to-ceiling glass beside a turquoise lap pool"
                className="img-cover object-[42%_50%]"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
            </div>

            {/* Single featured chip — links straight to the pictured home */}
            <Link
              to={`/properties/${heroProperty.slug}`}
              className="group absolute top-4 left-4 flex max-w-[16rem] items-center gap-3 rounded-md bg-white/95 p-2.5 pr-4 shadow-lift backdrop-blur transition hover:bg-white sm:top-6 sm:left-6"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-navy text-beige">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{heroProperty.title}</span>
                <span className="block text-xs text-muted">
                  {heroProperty.locality}, Goa · <span className="font-medium text-navy">{formatPrice(heroProperty)}</span>
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-navy" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="relative z-10 -mt-10 sm:-mt-14 lg:-mt-[4.5rem]"
        >
          <PropertySearch />
        </motion.div>
      </div>
      <div className="h-16 lg:h-24" />
    </section>
  )
}

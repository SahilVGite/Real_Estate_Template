import { Target, Eye, Mail, Phone, Gem, Handshake, Leaf, Lightbulb } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Reveal from '../../components/common/Reveal'
import StatCounter from '../../components/common/StatCounter'
import WhyChooseUs from '../../components/common/WhyChooseUs'
import TestimonialSlider from '../../components/common/TestimonialSlider'
import CtaBanner from '../../components/common/CtaBanner'
import SectionHeading from '../../components/common/SectionHeading'
import { useDocumentTitle } from '../../hooks'
import ServicesGrid from '../../components/common/ServicesGrid'
import RequirementSection from '../../components/lead/RequirementSection'
import { useLead } from '../../context/LeadContext'
import { agents } from '../../data/agents'
import { stats } from '../../data/site'

const values = [
  { icon: Handshake, title: 'Honesty first', text: 'We’ll tell you when a home isn’t right for you — even if it costs us the deal.' },
  { icon: Gem, title: 'Quality over quantity', text: 'Fewer, better listings. Every one visited, checked and photographed by us.' },
  { icon: Lightbulb, title: 'Local insight', text: 'Advisors who live in the neighbourhoods they cover and know every building.' },
  { icon: Leaf, title: 'Long-term relationships', text: 'Most of our business comes from referrals and clients returning years later.' },
]

const milestones = [
  { year: '2011', title: 'Founded in Mumbai', text: 'Two advisors, one small office in Andheri and a promise to only list homes we had visited ourselves.' },
  { year: '2015', title: 'Pune & Goa', text: 'Expanded to Pune and North Goa as clients began asking for second homes and weekend retreats.' },
  { year: '2019', title: 'Bengaluru & commercial', text: 'Opened in Bengaluru and launched our commercial desk for offices and retail.' },
  { year: '2024', title: 'Six cities, one standard', text: 'Hyderabad and Gurugram join the network — with the same verification process in every city.' },
]

export default function About() {
  useDocumentTitle('About us')
  const { openLead } = useLead()
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'About us' }]}
        eyebrow="Our story"
        title="Fifteen years of finding homes people love"
        description="Abode is a boutique real estate advisory built on a simple idea: fewer, better options and honest advice at every step."
        image="/images/office-team.webp"
      />

      {/* Introduction */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative grid grid-cols-[1.2fr_1fr] gap-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img src="/images/interior-living-wood.webp" alt="Warm living room with timber wall panelling" loading="lazy" className="img-cover" />
            </div>
            <div className="flex flex-col gap-4 pt-12">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img src="/images/office-loft.webp" alt="Abode’s bright loft-style office" loading="lazy" className="img-cover" />
              </div>
              <div className="rounded-lg bg-navy p-5 text-white">
                <p className="font-serif text-4xl text-beige">15</p>
                <p className="mt-1 text-sm text-white/70">years helping families and businesses move with confidence</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.85rem]">An advisory, not a listings portal</h2>
            <div className="mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                We started Abode in 2011 after watching friends spend months chasing listings that didn’t exist, prices that changed overnight and
                paperwork nobody explained. We thought there had to be a better way.
              </p>
              <p>
                Today our team of 40 advisors works across six cities. We still visit every property before it’s listed, still check every title
                document, and still assign each client one advisor who stays with them from the first viewing to the final signature.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-10">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-white py-20 lg:py-24">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, label: 'Our mission', title: 'Make every move feel certain', text: 'To give every client the clarity, honesty and local insight they need to make one of life’s biggest decisions with confidence.' },
            { icon: Eye, label: 'Our vision', title: 'The most trusted name in Indian real estate', text: 'A market where verified information is the norm, pricing is transparent and advisors are measured by how happy their clients are years later.' },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1} className="rounded-lg border border-line bg-cream p-8 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-navy text-beige">
                <m.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <p className="mt-6 text-[0.75rem] font-semibold tracking-[0.18em] text-gold-dark uppercase">{m.label}</p>
              <h3 className="mt-2 text-[1.75rem] leading-snug">{m.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white pb-20 lg:pb-24" aria-labelledby="values-heading">
        <div className="container-page">
          <SectionHeading eyebrow="Our values" title={<span id="values-heading">What we stand for</span>} />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06}>
                <v.icon className="h-7 w-7 text-gold-dark" strokeWidth={1.4} />
                <h3 className="mt-4 text-xl">{v.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-white pb-20 lg:pb-28">
        <div className="container-page">
          <SectionHeading eyebrow="Our journey" title="From one office to six cities" />
          <ol className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.08} className="relative">
                <span className="absolute -top-[2.85rem] left-0 h-3 w-3 rounded-full border-2 border-white bg-gold ring-1 ring-gold" aria-hidden />
                <p className="font-serif text-3xl text-gold-dark">{m.year}</p>
                <h3 className="mt-2 text-xl">{m.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <WhyChooseUs showStats={false} />
      <ServicesGrid eyebrow="Our services" title="Everything you need, under one roof" />

      {/* Team */}
      <section className="bg-cream py-20 lg:py-28" aria-labelledby="team-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Meet the team"
            title={<span id="team-heading">The people behind every move</span>}
            description="Senior advisors with deep roots in the cities they serve."
          />
          <ul className="mt-12 grid gap-6 xs:grid-cols-2 lg:grid-cols-4">
            {agents.map((a, i) => (
              <Reveal as="li" key={a.id} delay={i * 0.06} className="group">
                <div className="relative aspect-[9/10] overflow-hidden rounded-lg bg-[#ece9e3]">
                  <img src={a.photo} alt={a.name} loading="lazy" className="img-cover object-top transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-x-3 bottom-3 flex translate-y-2 gap-2 opacity-0 transition duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
                    <a href={`mailto:${a.email}`} className="grid h-10 flex-1 place-items-center rounded-md bg-white text-navy hover:bg-beige-50" aria-label={`Email ${a.name}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                    <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="grid h-10 flex-1 place-items-center rounded-md bg-white text-navy hover:bg-beige-50" aria-label={`Call ${a.name}`}>
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <h3 className="mt-4 text-xl">{a.name}</h3>
                <p className="text-sm text-gold-dark">{a.role}</p>
                <p className="mt-2 text-sm text-muted">{a.bio}</p>
                <p className="mt-3 text-xs text-muted">
                  {a.experience} yrs experience · {a.deals}+ transactions
                </p>
                <button
                  onClick={() => openLead('callback', { source: `about:team-${a.id}`, heading: { eyebrow: a.role, title: `Talk to ${a.name.split(' ')[0]}`, subtitle: `Leave your number and ${a.name.split(' ')[0]} will call you back personally.` } })}
                  className="mt-3 text-sm font-medium text-gold-dark hover:text-navy"
                >
                  Talk to {a.name.split(' ')[0]} →
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <TestimonialSlider />
      <RequirementSection className="bg-white" source="about-requirement" />
      <CtaBanner title="Let’s find your place, together" />
    </>
  )
}

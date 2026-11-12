import { PhoneCall } from 'lucide-react'
import { useDocumentTitle } from '../../hooks'
import Hero from './sections/Hero'
import FeaturedProperties from './sections/FeaturedProperties'
import Categories from './sections/Categories'
import Showcase from './sections/Showcase'
import HowItWorks from './sections/HowItWorks'
import Locations from './sections/Locations'
import Insights from './sections/Insights'
import WhyChooseUs from '../../components/common/WhyChooseUs'
import TestimonialSlider from '../../components/common/TestimonialSlider'
import CtaBanner from '../../components/common/CtaBanner'
import ServicesGrid from '../../components/common/ServicesGrid'
import FaqList from '../../components/common/FaqList'
import Reveal from '../../components/common/Reveal'
import Button from '../../components/common/Button'
import RequirementSection from '../../components/lead/RequirementSection'
import { useLead } from '../../context/LeadContext'
import { generalFaqs } from '../../data/faqs'
import { site } from '../../data/site'

export default function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Categories />
      <WhyChooseUs />
      <ServicesGrid className="bg-cream" />
      <Showcase />
      <HowItWorks />
      <Locations />
      <TestimonialSlider />
      <RequirementSection className="bg-white" source="home-requirement" />
      <Insights />
      <HomeFaq />
      <CtaBanner />
    </>
  )
}

function HomeFaq() {
  const { openLead } = useLead()
  return (
    <section className="bg-cream py-20 lg:py-28" aria-labelledby="faq-heading">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-heading" className="mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem]">
            Questions buyers & tenants ask us
          </h2>
          <p className="mt-4 text-muted">Still unsure about something? Our advisors are happy to help — call {site.phone} or request a callback.</p>
          <Button variant="outline" className="mt-8" iconLeft={<PhoneCall className="h-4 w-4" />} onClick={() => openLead('callback', { source: 'home-faq' })}>
            Request a callback
          </Button>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqList faqs={generalFaqs} />
        </Reveal>
      </div>
    </section>
  )
}

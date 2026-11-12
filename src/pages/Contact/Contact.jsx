import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CircleCheck, ClipboardList, PhoneCall, CalendarCheck, ArrowRight } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Reveal from '../../components/common/Reveal'
import MapEmbed from '../../components/common/MapEmbed'
import SocialIcon from '../../components/common/SocialIcon'
import { Field, Input, Textarea, Select, Checkbox, rules } from '../../components/forms/Field'
import { createLead } from '../../services/enquiryService'
import { useLead } from '../../context/LeadContext'
import FaqList from '../../components/common/FaqList'
import { generalFaqs } from '../../data/faqs'
import { locations, cityDetails } from '../../data/locations'
import { useDocumentTitle } from '../../hooks'
import { site } from '../../data/site'

const SUBJECTS = ['Buying a property', 'Renting a property', 'Selling or listing my property', 'Commercial spaces', 'Investment advice', 'Something else'].map((s) => ({ value: s, label: s }))


const contactCards = [
  { icon: MapPin, title: 'Visit our office', lines: [site.address], href: `https://www.google.com/maps/search/?api=1&query=${site.mapCoordinates.join(',')}`, cta: 'Get directions' },
  { icon: Phone, title: 'Call us', lines: [site.phone, 'Toll-free: 1800 210 4455'], href: `tel:${site.phone.replace(/\s/g, '')}`, cta: 'Call now' },
  { icon: Mail, title: 'Email us', lines: [site.email, 'listings@abode-realty.example'], href: `mailto:${site.email}`, cta: 'Send email' },
  { icon: Clock, title: 'Office hours', lines: [site.hours, 'Sunday by appointment'] },
]

export default function Contact() {
  useDocumentTitle('Contact us')
  const { openLead } = useLead()
  const [sent, setSent] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', phone: '', subject: '', message: '', consent: false } })

  const onSubmit = async (data) => {
    try {
      const enquiry = await createLead({ type: 'contact', source: 'contact-page', ...data })
      toast.success('Thanks — your message is on its way', { description: 'An advisor will get back to you within 2 working hours.' })
      setSent(enquiry)
      reset({ ...data, subject: '', message: '', consent: false })
    } catch {
      toast.error('We couldn’t send your message', { description: 'Please check your connection and try again.' })
    }
  }
  const onInvalid = () => toast.error('Please check the highlighted fields')

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Get in touch"
        title="We’d love to hear from you"
        description="Whether you’re buying, renting, selling or just exploring, our advisors are here to help — no obligation, no pressure."
        image="/images/office-loft.webp"
      />

      <section className="bg-white py-12 lg:py-16" aria-label="Quick help">
        <div className="container-page">
          <ul className="grid gap-4 md:grid-cols-3">
            {[
              { type: 'requirement', icon: ClipboardList, title: 'Find me a property', text: 'Share your brief and get a curated shortlist in 24 hours.', cta: 'Post requirement' },
              { type: 'callback', icon: PhoneCall, title: 'Request a callback', text: 'A senior advisor calls you at a time that suits you.', cta: 'Get a callback' },
              { type: 'requirement', icon: CalendarCheck, title: 'Book a consultation', text: 'Meet an advisor at our office or on a video call.', cta: 'Book now', heading: { eyebrow: 'Free consultation', title: 'Book a free property consultation', subtitle: 'Tell us a little about what you need and we’ll schedule a 30-minute session with the right advisor.' } },
            ].map((q) => (
              <li key={q.title}>
                <button
                  onClick={() => openLead(q.type, { source: `contact:quick-${q.title}`, heading: q.heading })}
                  className="group flex h-full w-full items-start gap-4 rounded-lg border border-line bg-cream p-6 text-left transition hover:border-navy hover:bg-white hover:shadow-soft"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-navy text-beige">
                    <q.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-navy">{q.title}</span>
                    <span className="mt-1 block text-sm text-muted">{q.text}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-dark group-hover:text-navy">
                      {q.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
          <div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {contactCards.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 0.05} className="flex flex-col rounded-lg border border-line bg-white p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-beige-50 text-gold-dark">
                    <c.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h2 className="mt-4 font-serif text-xl">{c.title}</h2>
                  {c.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm break-words text-muted">
                      {l}
                    </p>
                  ))}
                  {c.href && (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-auto pt-4 text-sm font-medium text-gold-dark hover:text-navy">
                      {c.cta} →
                    </a>
                  )}
                </Reveal>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-sm font-medium text-ink">Follow us</p>
              <ul className="mt-3 flex gap-2">
                {site.social.map((s) => (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white">
                      <SocialIcon name={s.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal delay={0.1} className="rounded-lg border border-line bg-white p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-10 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
                    <CircleCheck className="h-8 w-8" strokeWidth={1.6} />
                  </span>
                  <h2 className="mt-6 text-3xl">Message received</h2>
                  <p className="mt-3 max-w-md text-muted">
                    Thanks, {sent.name.split(' ')[0]}. We’ve logged your enquiry about “{sent.subject.toLowerCase()}” and an advisor will reply to {sent.email} shortly.
                  </p>
                  <p className="mt-2 text-xs text-muted">Reference: {sent.id.toUpperCase()} · Demo — stored in this browser only.</p>
                  <Button variant="outline" className="mt-8" onClick={() => setSent(null)}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
                  <h2 className="text-[1.875rem]">Send us a message</h2>
                  <p className="mt-1.5 text-muted">Fields marked * are required.</p>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" error={errors.name?.message} required>
                      {(a) => <Input {...a} autoComplete="name" placeholder="Priya Sharma" {...register('name', rules.name)} />}
                    </Field>
                    <Field label="Email" error={errors.email?.message} required>
                      {(a) => <Input {...a} type="email" autoComplete="email" placeholder="you@email.com" {...register('email', rules.email)} />}
                    </Field>
                    <Field label="Phone" error={errors.phone?.message} required>
                      {(a) => <Input {...a} type="tel" autoComplete="tel" placeholder="+91 98765 43210" {...register('phone', rules.phone)} />}
                    </Field>
                    <Field label="Subject" error={errors.subject?.message} required>
                      {(a) => <Select {...a} placeholder="Choose a topic" options={SUBJECTS} {...register('subject', { required: 'Please choose a subject' })} />}
                    </Field>
                    <Field label="Message" error={errors.message?.message} required className="sm:col-span-2">
                      {(a) => (
                        <Textarea
                          {...a}
                          rows={5}
                          placeholder="Tell us what you’re looking for — location, budget, timeline…"
                          {...register('message', { required: 'Please enter a message', minLength: { value: 20, message: 'Please share a bit more detail (20+ characters)' }, maxLength: { value: 1500, message: 'Please keep it under 1,500 characters' } })}
                        />
                      )}
                    </Field>
                    <div className="sm:col-span-2">
                      <Checkbox label="I agree to be contacted by Abode about my enquiry. We never share your details." {...register('consent', { required: 'Please confirm you’re happy to be contacted' })} />
                      {errors.consent && <p className="mt-1.5 text-[0.8125rem] text-error-dark">{errors.consent.message}</p>}
                    </div>
                  </div>
                  <Button type="submit" size="lg" loading={isSubmitting} className="mt-8 w-full sm:w-auto" iconRight={<Send className="h-4 w-4" />}>
                    {isSubmitting ? 'Sending…' : 'Send message'}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream pb-16 lg:pb-24">
        <div className="container-page">
          <MapEmbed coordinates={site.mapCoordinates} label="Abode Realty office" className="aspect-[4/3] sm:aspect-[21/8]" zoomSpan={0.008} autoLoad />
        </div>
      </section>

      <section className="bg-cream pb-16 lg:pb-24" aria-labelledby="offices-heading">
        <div className="container-page">
          <span className="eyebrow">Our offices</span>
          <h2 id="offices-heading" className="mt-3 text-[2rem] sm:text-[2.5rem]">
            Local teams in six cities
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((l, i) => (
              <Reveal as="li" key={l.id} delay={(i % 3) * 0.05} className="overflow-hidden rounded-lg border border-line bg-white">
                <div className="relative h-32">
                  <img src={l.image} alt="" loading="lazy" className="img-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <h3 className="absolute bottom-3 left-5 font-serif text-2xl text-white">{l.name}</h3>
                </div>
                <div className="space-y-2.5 p-5 text-sm">
                  <p className="flex gap-2.5 text-muted">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {cityDetails[l.id].office.address}
                  </p>
                  <a href={`tel:${cityDetails[l.id].office.phone.replace(/\s/g, '')}`} className="flex gap-2.5 text-ink hover:text-gold-dark">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" /> {cityDetails[l.id].office.phone}
                  </a>
                  <button
                    onClick={() => openLead('callback', { source: `contact:office-${l.id}`, heading: { eyebrow: `${l.name} office`, title: `Talk to our ${l.name} team` } })}
                    className="pt-1 text-sm font-medium text-gold-dark hover:text-navy"
                  >
                    Request a callback →
                  </button>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 text-[2rem] sm:text-[2.5rem]">Questions we hear often</h2>
            <p className="mt-3 text-muted">Can’t find what you’re looking for? Call us on {site.phone}.</p>
          </div>
          <FaqList faqs={generalFaqs} />
        </div>
      </section>
    </>
  )
}

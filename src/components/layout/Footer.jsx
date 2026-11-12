import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react'
import Logo from '../common/Logo'
import SocialIcon from '../common/SocialIcon'
import NewsletterForm from '../forms/NewsletterForm'
import { site } from '../../data/site'
import { categories } from '../../data/categories'

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'All properties', to: '/properties' },
  { label: 'Featured cities', to: '/#locations' },
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-page">
        <div className="grid gap-12 border-b border-white/10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.2fr] lg:gap-10 lg:py-20">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-5 text-[0.9375rem] leading-relaxed">{site.description}</p>
            <ul className="mt-6 flex gap-2">
              {site.social.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-beige hover:bg-beige hover:text-navy"
                  >
                    <SocialIcon name={s.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Company">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="transition hover:text-beige">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Property types">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/properties?type=${c.id}`} className="transition hover:text-beige">
                  {c.plural}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <div>
            <h3 className="font-sans text-[0.75rem] font-semibold tracking-[0.18em] text-beige uppercase">Get in touch</h3>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" /> {site.address}
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex gap-3 transition hover:text-beige">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-3 break-all transition hover:text-beige">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" /> {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" /> {site.hours}
              </li>
            </ul>
            <p className="mt-7 text-sm font-medium text-white">Monthly market notes</p>
            <NewsletterForm variant="light" compact className="mt-3" />
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 py-7 text-sm sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/contact" className="transition hover:text-beige">
              Privacy
            </Link>
            <Link to="/contact" className="transition hover:text-beige">
              Terms
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 transition hover:text-beige"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="font-sans text-[0.75rem] font-semibold tracking-[0.18em] text-beige uppercase">{title}</h3>
      <ul className="mt-5 space-y-2.5 text-[0.9375rem]">{children}</ul>
    </div>
  )
}

# Abode Realty — React Real Estate Template

A premium real estate website template built for lead generation, using React, Vite and Tailwind CSS.
It runs entirely on the frontend with realistic mock data. Lead and contact form submissions are **demo-only**: they are stored in `localStorage` and nothing is sent to a server.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build
```

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · React Router 7 · Framer Motion · React Hook Form · Sonner · Lucide React

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero search, featured carousel, categories, why us, services, lifestyle, how it works, locations, testimonials, inline requirement form, insights, FAQ, CTA |
| `/properties` | Listing with keyword search, filters, chips, sort, grid/list view and load more; an inline lead band; verification standards, city guides, popular searches and FAQ |
| `/properties/:slug` | Details: gallery + lightbox, lead quick actions, specs, amenities, floor plan, price insights, EMI calculator, location and nearby places, FAQ, sidebar enquiry and visit forms, similar homes |
| `/about` | Story, stats, mission and vision, values, timeline, services, team ("Talk to…" callbacks), testimonials, requirement form |
| `/contact` | Quick-help popups, validated contact form, map, six city offices, FAQ |

## Lead generation

Every enquiry opens a contextual popup (`src/components/lead/`). Any component can trigger one:

```jsx
const { openLead } = useLead()
openLead('visit', { property, source: 'details:quick-actions' })
```

| Type | Used for | Fields |
| --- | --- | --- |
| `enquiry` | Property enquiry | name, mobile, email, purpose, message |
| `visit` | Schedule a site visit | in-person/video, day, time slot, contact |
| `price` | Price breakup | contact, purpose, home-loan check |
| `brochure` | Brochure & floor plans | contact, WhatsApp/email |
| `callback` | Request a callback | name, mobile, best time |
| `requirement` | Free property search | buy/rent, city, type, budget, contact |

- **Copy, fields and "what happens next" steps** for each type are configured in `leadTypes.js`.
- **Property popups** show the home and its advisor alongside the form. General popups show trust signals instead.
- **Automatic popup:** a requirement popup appears once per session after 35 seconds, or on exit intent (desktop, after 10 seconds). It never appears again once the visitor has submitted any form. You can tune this in `src/context/LeadContext.jsx`.
- **Lead records:** each lead stores its `type`, `source` (where it was triggered), `page` and the property, if any.

## Connecting a CRM or backend

All submissions go through `src/services/enquiryService.js` (`createLead`, `subscribeNewsletter`). Replace those function bodies with POST requests to your CRM or API. The UI doesn't need any changes.

## Project structure

```
src/
  components/  common/ layout/ property/ forms/ lead/
  pages/       Home, Properties, PropertyDetails, About, Contact, NotFound
  data/        properties, locations (+ city offices & landmarks), agents, services, faqs, testimonials, blog, amenities, site
  services/    data and lead submission (swap for API calls)
  context/     LeadContext (global popup)
  hooks/ utils/ routes/
```

## Customising

- **Brand colours and fonts:** `@theme` tokens in `src/index.css`
- **Name, contact details and social links:** `src/data/site.js`
- **Currency formatting (₹ Lakh/Crore):** `src/utils/format.js`
- **Images:** `public/images/` (WebP). They are generated from `/samples` by `npm run optimize-images`, which needs Python and Pillow.

## Deploying

This is a single-page app, so every route must serve `index.html`. `public/_redirects` handles this on Netlify. On other hosts, add the equivalent rewrite rule.

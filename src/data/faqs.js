export const generalFaqs = [
  { q: 'Do you charge buyers a fee?', a: 'For most residential purchases our fee is paid by the seller. Where a buyer’s brokerage applies — typically 1% for resale homes — we tell you upfront, before any viewing.' },
  { q: 'How do you verify listings?', a: 'An Abode advisor visits every property, photographs it, and reviews title documents, approvals and occupancy certificates before it goes live.' },
  { q: 'Can you help NRIs buy remotely?', a: 'Yes. We regularly run live video viewings, coordinate power of attorney and work with partner lawyers and banks familiar with NRI requirements.' },
  { q: 'How quickly will someone respond to my enquiry?', a: 'During office hours we reply within two hours. Enquiries sent after hours are answered first thing the next working morning.' },
  { q: 'Can I visit a property on the weekend?', a: 'Absolutely. Site visits run Monday to Saturday, and Sundays by appointment. You can also choose a live video tour.' },
  { q: 'Do you help with home loans and paperwork?', a: 'Yes — we compare offers from 15+ lenders, help with documentation, and coordinate registration so the process is smooth from start to finish.' },
]

export const propertyFaqs = (p) => [
  {
    q: `Is ${p.title} still available?`,
    a: 'This listing was verified recently and is currently available. Availability can change quickly for well-priced homes, so we recommend enquiring or booking a visit soon.',
  },
  {
    q: p.status === 'rent' ? 'What is the security deposit and lock-in period?' : 'Is the price negotiable?',
    a:
      p.status === 'rent'
        ? 'The standard deposit is three months’ rent with an 11-month agreement. Terms for company leases can be discussed with the advisor.'
        : 'There is usually some room for negotiation depending on payment terms and timelines. Your advisor will share recent comparable sales to help you make a fair offer.',
  },
  {
    q: 'Can I see the documents before visiting?',
    a: 'Yes. Request the brochure and we’ll share the floor plan, specification sheet and a summary of approvals on WhatsApp or email.',
  },
  {
    q: p.status === 'rent' ? 'Are pets allowed?' : 'Is a home loan available for this property?',
    a:
      p.status === 'rent'
        ? p.amenities.includes('pets')
          ? 'Yes — this home is pet friendly.'
          : 'The owner will consider pets on a case-by-case basis. Mention it in your enquiry and we’ll check for you.'
        : 'Approved projects and clear-title resale homes are eligible for loans from all major banks. Tick the home-loan option in the price-breakup form for a free eligibility check.',
  },
]

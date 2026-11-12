import { MessageSquare, CalendarCheck, FileDown, IndianRupee, PhoneCall, ClipboardList } from 'lucide-react'

/**
 * Lead popup configurations. Each type controls the copy, the form fields
 * and the "what happens next" steps shown after submission.
 */
export const LEAD_TYPES = {
  enquiry: {
    icon: MessageSquare,
    eyebrow: 'Property enquiry',
    title: 'Enquire about this property',
    subtitle: 'Get full details, availability and the best price from the listing advisor.',
    cta: 'Send enquiry',
    fields: ['name', 'phone', 'email', 'purpose', 'message'],
    success: 'Your enquiry has been sent',
    next: ['The listing advisor reviews your enquiry', 'You get a call within 2 working hours', 'Receive photos, documents and pricing'],
  },
  visit: {
    icon: CalendarCheck,
    eyebrow: 'Site visit',
    title: 'Schedule a site visit',
    subtitle: 'Pick a day and time — an advisor will accompany you, in person or on video.',
    cta: 'Request visit',
    fields: ['visit', 'name', 'phone', 'email'],
    success: 'Your visit is requested',
    next: ['We confirm your slot by SMS & WhatsApp', 'Your advisor meets you at the property', 'Get comparable prices after the tour'],
  },
  brochure: {
    icon: FileDown,
    eyebrow: 'Brochure & floor plans',
    title: 'Get the brochure & floor plans',
    subtitle: 'Receive the detailed brochure, floor plans and specification sheet on WhatsApp or email.',
    cta: 'Send me the brochure',
    fields: ['name', 'phone', 'email', 'channel'],
    success: 'Brochure request received',
    next: ['An advisor verifies your details', 'Brochure & floor plans are shared on your chosen channel', 'Ask any questions directly to the advisor'],
  },
  price: {
    icon: IndianRupee,
    eyebrow: 'Price breakup',
    title: 'Get the complete price breakup',
    subtitle: 'Understand the all-in cost — registration, stamp duty, maintenance, parking and payment plans.',
    cta: 'Get price breakup',
    fields: ['name', 'phone', 'email', 'purpose', 'loan'],
    success: 'Price breakup on its way',
    next: ['We prepare a detailed cost sheet', 'Includes taxes, charges and payment schedule', 'Optional: home-loan eligibility check'],
  },
  callback: {
    icon: PhoneCall,
    eyebrow: 'Request a callback',
    title: 'Talk to an advisor',
    subtitle: 'Leave your number and a senior advisor will call you back at a time that suits you.',
    cta: 'Request callback',
    fields: ['name', 'phone', 'callTime'],
    success: 'We’ll call you back',
    next: ['A senior advisor is assigned to you', 'You get a call in your chosen time slot', 'No obligation — just honest advice'],
  },
  requirement: {
    icon: ClipboardList,
    eyebrow: 'Free property search',
    title: 'Tell us what you’re looking for',
    subtitle: 'Share your requirement and get a hand-picked shortlist of verified properties within 24 hours.',
    cta: 'Get my shortlist',
    fields: ['lookingFor', 'city', 'propertyType', 'budget', 'name', 'phone', 'email'],
    success: 'Your requirement is with us',
    next: ['An advisor studies your brief', 'You receive a curated shortlist in 24 hours', 'We arrange visits for the homes you like'],
  },
}

export const BUDGETS = {
  sale: ['Under ₹1 Cr', '₹1 – 2 Cr', '₹2 – 5 Cr', '₹5 – 10 Cr', '₹10 Cr+'],
  rent: ['Under ₹50,000', '₹50,000 – 1 L', '₹1 – 2 L', '₹2 – 5 L', '₹5 L+'],
}

export const CALL_TIMES = ['As soon as possible', 'Morning (9 am – 12 pm)', 'Afternoon (12 – 4 pm)', 'Evening (4 – 8 pm)']

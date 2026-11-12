import { Home, KeyRound, TrendingUp, Globe2, Scale, Landmark } from 'lucide-react'

/** Advisory services shown on Home and About. `lead` decides which popup the CTA opens. */
export const services = [
  {
    id: 'buy',
    icon: Home,
    title: 'Buying advisory',
    text: 'A curated shortlist, honest comparisons and tough negotiation — so you pay the right price for the right home.',
    points: ['Personal shortlist in 24 hours', 'Comparable sales & price checks', 'Negotiation on your behalf'],
    lead: 'requirement',
  },
  {
    id: 'rent',
    icon: KeyRound,
    title: 'Rentals & leasing',
    text: 'Furnished and unfurnished homes, company leases and executive relocations, with every agreement handled.',
    points: ['Verified landlords only', 'Lease drafting & registration', 'Move-in inspection report'],
    lead: 'requirement',
  },
  {
    id: 'invest',
    icon: TrendingUp,
    title: 'Investment advisory',
    text: 'Data-led advice on rental yields, appreciation corridors and pre-leased commercial assets.',
    points: ['Yield & appreciation analysis', 'Pre-leased commercial assets', 'Portfolio reviews'],
    lead: 'callback',
  },
  {
    id: 'nri',
    icon: Globe2,
    title: 'NRI services',
    text: 'Buy, rent out or manage property in India from anywhere, with live video tours and remote paperwork.',
    points: ['Live video walkthroughs', 'Power-of-attorney support', 'Tenant & property management'],
    lead: 'callback',
  },
  {
    id: 'legal',
    icon: Scale,
    title: 'Legal due diligence',
    text: 'Title verification, RERA checks and agreement reviews by our partner lawyers before you commit.',
    points: ['30-year title search', 'RERA & approval checks', 'Agreement review'],
    lead: 'callback',
  },
  {
    id: 'loans',
    icon: Landmark,
    title: 'Home-loan assistance',
    text: 'Compare offers from 15+ banks and NBFCs and get sanctioned faster with our documentation support.',
    points: ['Offers from 15+ lenders', 'Eligibility check in minutes', 'Doorstep documentation'],
    lead: 'callback',
  },
]

const img = (name) => `/images/${name}.webp`

export const testimonials = [
  {
    id: 't1',
    name: 'Siddharth Menon',
    role: 'Bought a villa in Assagao',
    photo: img('person-1'),
    rating: 5,
    quote: 'We were buying from Dubai and couldn’t visit often. Meera shortlisted homes that genuinely matched our brief, walked us through each one on video and handled every document. It felt like having family on the ground.',
  },
  {
    id: 't2',
    name: 'Rahul Bhatia',
    role: 'Leased an office in BKC',
    photo: img('person-4'),
    rating: 5,
    quote: 'Kabir understood exactly what our team needed and negotiated terms we didn’t think were possible. From the first site visit to the fit-out handover took under eight weeks.',
  },
  {
    id: 't3',
    name: 'Karan Joshi',
    role: 'First-time buyer, Bengaluru',
    photo: img('person-5'),
    rating: 5,
    quote: 'As a first-time buyer I had a hundred questions. Rohan answered every one patiently, was upfront about pricing and never pushed. We moved into our apartment in Indiranagar last month.',
  },
  {
    id: 't4',
    name: 'Aarav Nair',
    role: 'Rented a penthouse in Gurugram',
    photo: img('person-8'),
    rating: 4,
    quote: 'Relocating cities with two kids is stressful. Ananya lined up five homes over a single weekend, and the verified listings meant there were no surprises when we arrived.',
  },
]

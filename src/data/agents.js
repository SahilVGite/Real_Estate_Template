const img = (name) => `/images/${name}.webp`

/** Agents double as the team shown on the About page. */
export const agents = [
  {
    id: 'a1',
    name: 'Meera Iyer',
    role: 'Senior Advisor — Goa',
    photo: img('person-7'),
    phone: '+91 98200 41120',
    email: 'meera@abode-realty.example',
    experience: 11,
    deals: 240,
    languages: ['English', 'Hindi', 'Konkani'],
    bio: 'Meera has spent over a decade helping families and second-home buyers find villas along the North Goa coast.',
  },
  {
    id: 'a2',
    name: 'Ananya Rao',
    role: 'Partner — Pune & NCR',
    photo: img('person-2'),
    phone: '+91 98450 22031',
    email: 'ananya@abode-realty.example',
    experience: 14,
    deals: 380,
    languages: ['English', 'Hindi', 'Marathi'],
    bio: 'Ananya leads our residential practice across Pune and Gurugram, with a focus on new-launch and resale homes.',
  },
  {
    id: 'a3',
    name: 'Kabir Malhotra',
    role: 'Director — Luxury & Commercial',
    photo: img('person-3'),
    phone: '+91 99300 18842',
    email: 'kabir@abode-realty.example',
    experience: 16,
    deals: 310,
    languages: ['English', 'Hindi', 'Punjabi'],
    bio: 'Kabir advises investors and family offices on prime residences and Grade-A commercial assets in Mumbai and Hyderabad.',
  },
  {
    id: 'a4',
    name: 'Rohan Mehta',
    role: 'Senior Advisor — Bengaluru',
    photo: img('person-6'),
    phone: '+91 98860 50417',
    email: 'rohan@abode-realty.example',
    experience: 8,
    deals: 165,
    languages: ['English', 'Hindi', 'Kannada'],
    bio: 'Rohan helps first-time buyers and relocating professionals navigate Bengaluru’s fast-moving market.',
  },
]

export const getAgent = (id) => agents.find((a) => a.id === id)

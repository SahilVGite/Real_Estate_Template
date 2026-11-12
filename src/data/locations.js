const img = (name) => `/images/${name}.webp`

/** Cities we operate in. Property counts are derived from the catalogue at runtime. */
export const locations = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'Sea-facing homes & Grade-A offices',
    image: img('city-towers-lookup'),
    neighbourhoods: ['Worli', 'Juhu', 'Bandra West', 'Bandra Kurla Complex'],
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Garden-city living near tech corridors',
    image: img('architecture-facade'),
    neighbourhoods: ['Indiranagar', 'Koramangala', 'Whitefield', 'Sarjapur Road', 'Devanahalli'],
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Villas and beach houses on the coast',
    image: img('exterior-beach-house'),
    neighbourhoods: ['Assagao', 'Candolim', 'Morjim', 'Siolim'],
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    tagline: 'Leafy neighbourhoods and hill retreats',
    image: img('exterior-luxury-side'),
    neighbourhoods: ['Koregaon Park', 'Kalyani Nagar', 'Baner', 'Lonavala'],
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    tagline: 'Hillside estates & skyline lofts',
    image: img('city-glass-tower'),
    neighbourhoods: ['Banjara Hills', 'Jubilee Hills', 'HITEC City'],
  },
  {
    id: 'gurugram',
    name: 'Gurugram',
    state: 'Haryana',
    tagline: 'Golf Course Road penthouses',
    image: img('city-skyline-blue'),
    neighbourhoods: ['Golf Course Road', 'Sector 54', 'Sector 43', 'DLF Cyber City'],
  },
]

export const getLocation = (id) => locations.find((l) => l.id === id)

/**
 * City-level details: our local office, a short market note and well-known landmarks
 * used for the "What's nearby" section on property pages.
 */
export const cityDetails = {
  mumbai: {
    office: { address: '4th Floor, Kalpataru Square, Andheri East, Mumbai 400069', phone: '+91 22 4890 1200' },
    note: 'India’s financial capital, where sea-facing residences in Worli and Juhu sit minutes from Grade-A business districts like BKC.',
    nearby: {
      schools: ['Dhirubhai Ambani International School', 'Jamnabai Narsee School', 'Bombay Scottish School'],
      health: ['Kokilaben Dhirubhai Ambani Hospital', 'Lilavati Hospital', 'Breach Candy Hospital'],
      transit: ['Metro Line 3 (Aqua Line)', 'Bandra–Worli Sea Link', 'Chhatrapati Shivaji Maharaj Intl. Airport'],
      leisure: ['Jio World Drive', 'Juhu Beach', 'Palladium Mall'],
    },
  },
  bengaluru: {
    office: { address: '2nd Floor, 100 Feet Road, Indiranagar, Bengaluru 560038', phone: '+91 80 4120 3300' },
    note: 'The garden city blends leafy residential layouts with India’s largest technology corridors along Whitefield and Sarjapur Road.',
    nearby: {
      schools: ['Inventure Academy', 'The International School Bangalore', 'Greenwood High'],
      health: ['Manipal Hospital, Old Airport Road', 'Sakra World Hospital', 'Columbia Asia Hospital'],
      transit: ['Namma Metro Purple Line', 'Outer Ring Road', 'Kempegowda Intl. Airport'],
      leisure: ['Phoenix Marketcity', 'Cubbon Park', 'UB City'],
    },
  },
  goa: {
    office: { address: 'Villa 7, Assagao–Anjuna Road, North Goa 403507', phone: '+91 832 245 6100' },
    note: 'North Goa’s villages — Assagao, Siolim, Morjim — are prized for villas and second homes close to beaches, cafés and two airports.',
    nearby: {
      schools: ['Sharada Mandir School', 'Rachol Seminary School', 'The Manthan School'],
      health: ['Manipal Hospital Goa', 'Healthway Hospital', 'Goa Medical College'],
      transit: ['Manohar Intl. Airport (Mopa)', 'Thivim Railway Station', 'NH-66 coastal highway'],
      leisure: ['Vagator & Anjuna beaches', 'Mall De Goa', 'Saturday Night Market, Arpora'],
    },
  },
  pune: {
    office: { address: 'Office 302, Lane 5, Koregaon Park, Pune 411001', phone: '+91 20 6720 4500' },
    note: 'A liveable, green city with established neighbourhoods like Koregaon Park and Kalyani Nagar, plus hill retreats in Lonavala.',
    nearby: {
      schools: ['The Bishop’s School', 'Symbiosis International School', 'Mercedes-Benz International School'],
      health: ['Ruby Hall Clinic', 'Jehangir Hospital', 'Sahyadri Hospital'],
      transit: ['Pune Metro', 'Mumbai–Pune Expressway', 'Pune International Airport'],
      leisure: ['Phoenix Marketcity Viman Nagar', 'Osho Teerth Park', 'Balewadi High Street'],
    },
  },
  hyderabad: {
    office: { address: 'Plot 22, Road No. 36, Jubilee Hills, Hyderabad 500033', phone: '+91 40 4455 7800' },
    note: 'Hillside estates in Banjara and Jubilee Hills meet fast-growing tech hubs in HITEC City and the Financial District.',
    nearby: {
      schools: ['Chirec International School', 'Oakridge International School', 'Hyderabad Public School'],
      health: ['Apollo Hospitals, Jubilee Hills', 'KIMS Hospital', 'Care Hospitals'],
      transit: ['Hyderabad Metro Blue Line', 'Outer Ring Road', 'Rajiv Gandhi Intl. Airport'],
      leisure: ['Inorbit Mall', 'KBR National Park', 'Durgam Cheruvu Lake'],
    },
  },
  gurugram: {
    office: { address: 'Tower B, 9th Floor, Golf Course Road, Gurugram 122002', phone: '+91 124 488 9200' },
    note: 'NCR’s premium address for golf-course penthouses, gated communities and corporate offices in Cyber City.',
    nearby: {
      schools: ['The Shri Ram School Aravali', 'Pathways World School', 'Heritage Xperiential School'],
      health: ['Medanta – The Medicity', 'Fortis Memorial Research Institute', 'Artemis Hospital'],
      transit: ['Rapid Metro Gurugram', 'Delhi Metro Yellow Line', 'Indira Gandhi Intl. Airport'],
      leisure: ['DLF CyberHub', 'Ambience Mall', 'DLF Golf & Country Club'],
    },
  },
}

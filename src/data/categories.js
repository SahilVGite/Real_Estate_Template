import { Building2, Castle, Home, Store, LandPlot, Gem } from 'lucide-react'

const img = (name) => `/images/${name}.webp`

export const categories = [
  { id: 'apartment', label: 'Apartment', plural: 'Apartments', description: 'City residences with shared amenities', icon: Building2, image: img('exterior-apartment-block') },
  { id: 'villa', label: 'Villa', plural: 'Villas', description: 'Private pools, gardens and room to breathe', icon: Castle, image: img('exterior-villa-pool-front') },
  { id: 'house', label: 'Independent House', plural: 'Independent Houses', description: 'Standalone homes on their own plot', icon: Home, image: img('exterior-family-house') },
  { id: 'commercial', label: 'Commercial', plural: 'Commercial', description: 'Offices, showrooms and retail', icon: Store, image: img('commercial-retail') },
  { id: 'plot', label: 'Plot / Land', plural: 'Plots & Land', description: 'Build your own, your way', icon: LandPlot, image: img('aerial-coastal-community') },
  { id: 'penthouse', label: 'Penthouse', plural: 'Penthouses', description: 'Top-floor living with a view', icon: Gem, image: img('interior-duplex-living') },
]

export const getCategory = (id) => categories.find((c) => c.id === id)

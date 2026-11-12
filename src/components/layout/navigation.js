import { categories } from '../../data/categories'
import { locations } from '../../data/locations'

/** Primary navigation model shared by desktop header, mobile drawer and footer. */
export const mainNav = [
  { label: 'Home', to: '/' },
  {
    label: 'Properties',
    to: '/properties',
    menu: {
      types: categories.map((c) => ({ label: c.plural, to: `/properties?type=${c.id}`, icon: c.icon, description: c.description })),
      cities: locations.map((l) => ({ label: l.name, to: `/properties?city=${l.id}` })),
    },
  },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** Is a nav item active for the current location? */
export function isNavActive(item, location) {
  if (item.to === '/') return location.pathname === '/'
  return location.pathname.startsWith(item.to)
}

import {
  Waves, Dumbbell, Car, ShieldCheck, Cctv, Trees, Armchair, Zap, ArrowUpDown, Wifi, Baby, PawPrint,
  Wind, Sun, Droplets, Headset, Volleyball, Fence, Utensils, BatteryCharging,
} from 'lucide-react'

export const amenityCatalog = {
  pool: { label: 'Swimming pool', icon: Waves },
  gym: { label: 'Gymnasium', icon: Dumbbell },
  parking: { label: 'Covered parking', icon: Car },
  security: { label: '24/7 security', icon: ShieldCheck },
  cctv: { label: 'CCTV surveillance', icon: Cctv },
  garden: { label: 'Landscaped garden', icon: Trees },
  clubhouse: { label: 'Clubhouse', icon: Armchair },
  power: { label: 'Power backup', icon: Zap },
  lift: { label: 'Elevator', icon: ArrowUpDown },
  wifi: { label: 'High-speed internet', icon: Wifi },
  play: { label: 'Kids’ play area', icon: Baby },
  pets: { label: 'Pet friendly', icon: PawPrint },
  ac: { label: 'Air conditioning', icon: Wind },
  solar: { label: 'Solar panels', icon: Sun },
  rainwater: { label: 'Rainwater harvesting', icon: Droplets },
  concierge: { label: 'Concierge', icon: Headset },
  sports: { label: 'Sports courts', icon: Volleyball },
  gated: { label: 'Gated community', icon: Fence },
  kitchen: { label: 'Modular kitchen', icon: Utensils },
  ev: { label: 'EV charging', icon: BatteryCharging },
}

export const amenityOptions = Object.entries(amenityCatalog).map(([id, a]) => ({ id, ...a }))

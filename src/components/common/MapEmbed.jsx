import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { cn } from '../../utils/format'

/**
 * OpenStreetMap embed — no API key required. Loads only when the user asks,
 * which keeps third-party requests off the critical path.
 */
export default function MapEmbed({ coordinates, label, className, zoomSpan = 0.012, autoLoad = false }) {
  const [loaded, setLoaded] = useState(autoLoad)
  const [lat, lng] = coordinates
  const bbox = [lng - zoomSpan, lat - zoomSpan * 0.6, lng + zoomSpan, lat + zoomSpan * 0.6].join(',')
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

  return (
    <div className={cn('relative overflow-hidden rounded-lg border border-line bg-[#eef0ec]', className)}>
      {loaded ? (
        <iframe title={`Map showing ${label}`} src={src} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <button type="button" onClick={() => setLoaded(true)} className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          {/* stylised map backdrop */}
          <svg className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none" viewBox="0 0 400 240" aria-hidden>
            <path d="M0 160 C80 140 120 190 200 170 S320 120 400 140" stroke="#dfe3dc" strokeWidth="14" fill="none" />
            <path d="M120 0 L150 240 M280 0 L250 240 M0 70 L400 90" stroke="#ffffff" strokeWidth="6" fill="none" />
            <path d="M0 200 L400 210 M60 0 L40 240" stroke="#ffffff" strokeWidth="3" fill="none" />
          </svg>
          <span className="relative grid h-12 w-12 place-items-center rounded-full bg-navy text-beige shadow-lift transition group-hover:scale-105">
            <MapPin className="h-5 w-5" />
          </span>
          <span className="relative rounded-md bg-white px-4 py-2 text-sm font-medium text-navy shadow-soft">Load interactive map</span>
        </button>
      )}
      <a
        href={directions}
        target="_blank"
        rel="noreferrer"
        className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-2 text-xs font-semibold text-navy shadow-soft transition hover:bg-beige-50"
      >
        <Navigation className="h-3.5 w-3.5" /> Get directions
      </a>
    </div>
  )
}

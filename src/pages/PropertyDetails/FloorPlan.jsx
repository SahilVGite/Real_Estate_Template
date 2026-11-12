import { useMemo } from 'react'
import { formatNumber } from '../../utils/format'

/**
 * Generates an indicative 2D floor plan from a property's specs.
 * Real projects would render the developer's plan images here instead.
 */
const W = 640
const H = 420
const PAD = 14

function residentialRooms(p) {
  const beds = Math.max(1, p.beds)
  const leftW = (W - PAD * 2) * 0.46
  const innerH = H - PAD * 2 - 52 // leave room for balcony
  const rooms = [
    { name: 'Living', x: 0, y: 0, w: leftW, h: innerH * 0.58 },
    { name: 'Dining', x: 0, y: innerH * 0.58, w: leftW * 0.55, h: innerH * 0.42 },
    { name: 'Kitchen', x: leftW * 0.55, y: innerH * 0.58, w: leftW * 0.45, h: innerH * 0.42 },
  ]
  const cols = Math.ceil(beds / 2)
  const rows = beds === 1 ? 1 : 2
  const rightW = W - PAD * 2 - leftW
  const cellW = rightW / cols
  const cellH = innerH / rows
  let bathsLeft = p.baths
  for (let i = 0; i < beds; i++) {
    const c = Math.floor(i / rows)
    const r = i % rows
    const x = leftW + c * cellW
    const y = r * cellH
    const name = i === 0 ? 'Master bed' : `Bedroom ${i + 1}`
    if (bathsLeft > 0) {
      const bw = Math.min(cellW * 0.38, 86)
      const bh = Math.min(cellH * 0.42, 70)
      rooms.push({ name, x, y, w: cellW, h: cellH, bath: { x: x + cellW - bw, y: r === 0 ? y : y + cellH - bh, w: bw, h: bh } })
      bathsLeft--
    } else rooms.push({ name, x, y, w: cellW, h: cellH })
  }
  rooms.push({ name: 'Balcony', x: 0, y: innerH, w: W - PAD * 2, h: 52, outdoor: true })
  return rooms
}

function commercialRooms() {
  const iw = W - PAD * 2
  const ih = H - PAD * 2
  return [
    { name: 'Open workspace', x: 0, y: 0, w: iw * 0.68, h: ih * 0.68 },
    { name: 'Boardroom', x: iw * 0.68, y: 0, w: iw * 0.32, h: ih * 0.38 },
    { name: 'Meeting', x: iw * 0.68, y: ih * 0.38, w: iw * 0.32, h: ih * 0.3 },
    { name: 'Reception', x: 0, y: ih * 0.68, w: iw * 0.3, h: ih * 0.32 },
    { name: 'Pantry', x: iw * 0.3, y: ih * 0.68, w: iw * 0.22, h: ih * 0.32 },
    { name: 'Restrooms', x: iw * 0.52, y: ih * 0.68, w: iw * 0.16, h: ih * 0.32 },
    { name: 'Services', x: iw * 0.68, y: ih * 0.68, w: iw * 0.32, h: ih * 0.32 },
  ]
}

export default function FloorPlan({ property }) {
  const isPlot = property.type === 'plot'
  const rooms = useMemo(() => (property.type === 'commercial' ? commercialRooms() : residentialRooms(property)), [property])
  // px² -> sq ft scale so labelled room sizes add up to roughly the listed area.
  const scale = Math.sqrt(property.area / ((W - PAD * 2) * (H - PAD * 2)))
  const dims = (w, h) => `${Math.round(w * scale)}′ × ${Math.round(h * scale)}′`

  if (isPlot) {
    const side = Math.sqrt(property.area)
    const wFt = Math.round(side * 0.8)
    const hFt = Math.round(property.area / wFt)
    return (
      <figure>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md bg-white" role="img" aria-label={`Plot layout, approximately ${wFt} by ${hFt} feet`}>
          <defs>
            <pattern id="grass" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 10 L10 0" stroke="#e6efe2" strokeWidth="2" />
            </pattern>
          </defs>
          <rect x="0" y={H - 54} width={W} height="54" fill="#eceae5" />
          <text x={W / 2} y={H - 22} textAnchor="middle" className="fill-muted text-[13px] tracking-[0.3em] uppercase">
            Internal road · 30 ft
          </text>
          <rect x="90" y="30" width={W - 180} height={H - 110} fill="url(#grass)" stroke="#172B3A" strokeWidth="2.5" />
          <rect x="120" y="58" width={W - 240} height={H - 168} fill="none" stroke="#B8955A" strokeDasharray="6 6" strokeWidth="1.5" />
          <text x={W / 2} y={H / 2 - 30} textAnchor="middle" className="fill-navy font-serif text-[22px]">
            Buildable area
          </text>
          <text x={W / 2} y={H / 2 - 6} textAnchor="middle" className="fill-muted text-[13px]">
            {formatNumber(property.area)} sq ft plot
          </text>
          <text x={W / 2} y="22" textAnchor="middle" className="fill-navy text-[13px] font-medium">
            {wFt} ft
          </text>
          <text x="70" y={(H - 80) / 2 + 30} textAnchor="middle" className="fill-navy text-[13px] font-medium" transform={`rotate(-90 70 ${(H - 80) / 2 + 30})`}>
            {hFt} ft
          </text>
          <g transform={`translate(${W - 50} 52)`}>
            <circle r="18" fill="none" stroke="#E8E5DF" />
            <path d="M0 -13 L5 4 L0 0 L-5 4 Z" fill="#172B3A" />
            <text y="-22" textAnchor="middle" className="fill-navy text-[11px] font-semibold">
              N
            </text>
          </g>
        </svg>
        <figcaption className="mt-3 text-xs text-muted">Indicative plot layout. Dashed line shows setback boundary. Survey plan available on request.</figcaption>
      </figure>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
      <figure>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md bg-white" role="img" aria-label="Indicative floor plan">
          <defs>
            <pattern id="deck" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M0 0 L0 8" stroke="#efe9de" strokeWidth="3" />
            </pattern>
          </defs>
          <g transform={`translate(${PAD} ${PAD})`}>
            {rooms.map((r) => (
              <g key={r.name}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={r.outdoor ? 'url(#deck)' : '#FBFAF8'} stroke="#172B3A" strokeWidth="2" />
                {r.bath && (
                  <g>
                    <rect x={r.bath.x} y={r.bath.y} width={r.bath.w} height={r.bath.h} fill="#F1E9DB" stroke="#172B3A" strokeWidth="1.5" />
                    <text x={r.bath.x + r.bath.w / 2} y={r.bath.y + r.bath.h / 2 + 4} textAnchor="middle" className="fill-muted text-[10px]">
                      Bath
                    </text>
                  </g>
                )}
                <text x={r.x + (r.bath ? (r.w - r.bath.w) / 2 : r.w / 2)} y={r.y + r.h / 2 - 2} textAnchor="middle" className="fill-navy text-[12.5px] font-semibold">
                  {r.name}
                </text>
                {!r.outdoor && (
                  <text x={r.x + (r.bath ? (r.w - r.bath.w) / 2 : r.w / 2)} y={r.y + r.h / 2 + 14} textAnchor="middle" className="fill-muted text-[10.5px]">
                    {dims(r.w, r.h)}
                  </text>
                )}
              </g>
            ))}
            {/* entrance marker */}
            <path d={`M ${(W - PAD * 2) * 0.18} 0 a 26 26 0 0 1 26 26`} fill="none" stroke="#B8955A" strokeWidth="1.5" />
          </g>
        </svg>
        <figcaption className="mt-3 text-xs text-muted">Indicative layout for illustration. Detailed architectural drawings are available from the agent.</figcaption>
      </figure>
      <div>
        <h4 className="font-sans text-[0.75rem] font-semibold tracking-[0.14em] text-muted uppercase">Room schedule</h4>
        <ul className="mt-3 divide-y divide-line text-sm">
          {rooms
            .filter((r) => !r.outdoor)
            .map((r) => (
              <li key={r.name} className="flex justify-between py-2.5">
                <span className="text-ink">{r.name}</span>
                <span className="text-muted tabular-nums">{dims(r.w, r.h)}</span>
              </li>
            ))}
          <li className="flex justify-between py-2.5 font-medium">
            <span>Total built-up</span>
            <span className="tabular-nums">{formatNumber(property.area)} sq ft</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

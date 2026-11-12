import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, Camera } from 'lucide-react'
import Lightbox from '../../components/property/Lightbox'
import { cn } from '../../utils/format'

export default function Gallery({ images, title }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const go = (dir) => setIndex((i) => (i + dir + images.length) % images.length)

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[1fr_11rem] xl:grid-cols-[1fr_13rem]">
        <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-[#ece9e3] sm:aspect-[16/10]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.button
              key={images[index]}
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute inset-0 cursor-zoom-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              aria-label="Open photo gallery"
            >
              <img src={images[index]} alt={`${title} — photo ${index + 1}`} className="img-cover" />
            </motion.button>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/40 to-transparent" />
          <button
            onClick={() => go(-1)}
            className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-soft transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy shadow-soft transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-navy/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Camera className="h-3.5 w-3.5" /> {index + 1} / {images.length}
          </div>
          <button
            onClick={() => setLightbox(true)}
            className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy shadow-soft transition hover:bg-white"
          >
            <Expand className="h-3.5 w-3.5" /> View all photos
          </button>
        </div>

        <div className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col lg:overflow-x-visible lg:overflow-y-auto" role="tablist" aria-label="Photo thumbnails">
          {images.map((src, i) => (
            <button
              key={src + i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                'relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md transition sm:w-28 lg:w-full',
                i === index ? 'ring-2 ring-navy ring-offset-2 ring-offset-cream' : 'opacity-70 hover:opacity-100',
                i > 3 && 'lg:hidden',
              )}
            >
              <img src={src} alt="" loading="lazy" className="img-cover" />
              {i === 3 && images.length > 4 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    setIndex(3)
                    setLightbox(true)
                  }}
                  className="absolute inset-0 hidden place-items-center bg-navy/60 text-sm font-medium text-white lg:grid"
                >
                  +{images.length - 4} more
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Lightbox images={images} index={index} open={lightbox} onClose={() => setLightbox(false)} onIndexChange={setIndex} title={title} />
    </div>
  )
}

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLockBodyScroll, useOnKey } from '../../hooks'
import { cn } from '../../utils/format'

/** Fullscreen image viewer with keyboard, swipe and thumbnail navigation. */
export default function Lightbox({ images, index, open, onClose, onIndexChange, title }) {
  useLockBodyScroll(open)
  useOnKey('Escape', onClose, open)
  useOnKey('ArrowRight', () => onIndexChange((index + 1) % images.length), open)
  useOnKey('ArrowLeft', () => onIndexChange((index - 1 + images.length) % images.length), open)

  // Preload neighbours for instant navigation.
  useEffect(() => {
    if (!open) return
    ;[index + 1, index - 1].forEach((i) => {
      const img = new Image()
      img.src = images[(i + images.length) % images.length]
    })
  }, [open, index, images])

  const go = (dir) => onIndexChange((index + dir + images.length) % images.length)

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-navy-950/97"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — photo ${index + 1} of ${images.length}`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-4 text-white sm:px-6">
            <p className="truncate pr-4 text-sm text-white/70">
              <span className="font-medium text-white">{title}</span>
              <span className="mx-2">·</span>
              {index + 1} / {images.length}
            </p>
            <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20" aria-label="Close gallery">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={`${title} — photo ${index + 1}`}
                className="max-h-full max-w-full rounded-md object-contain select-none"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                draggable={false}
              />
            </AnimatePresence>
            <button onClick={() => go(-1)} className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-6" aria-label="Previous photo">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={() => go(1)} className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-6" aria-label="Next photo">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="no-scrollbar flex shrink-0 justify-start gap-2 overflow-x-auto px-4 py-4 sm:justify-center">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => onIndexChange(i)}
                className={cn('h-14 w-20 shrink-0 overflow-hidden rounded transition', i === index ? 'opacity-100 ring-2 ring-gold' : 'opacity-50 hover:opacity-80')}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === index}
              >
                <img src={src} alt="" className="img-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

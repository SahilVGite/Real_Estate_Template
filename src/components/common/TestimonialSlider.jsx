import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import Rating from './Rating'
import Reveal from './Reveal'
import { testimonials } from '../../data/testimonials'
import { cn } from '../../utils/format'

const AUTOPLAY_MS = 7000

export default function TestimonialSlider({ className }) {
  const [[index, direction], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const t = testimonials[index]

  const go = useCallback((next, dir) => {
    setState([(next + testimonials.length) % testimonials.length, dir])
  }, [])
  const next = useCallback(() => go(index + 1, 1), [go, index])
  const prev = () => go(index - 1, -1)

  useEffect(() => {
    if (paused) return
    const id = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [index, paused, next])

  return (
    <section className={cn('bg-beige-50 py-20 lg:py-28', className)} aria-labelledby="testimonials-heading" aria-roledescription="carousel">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:gap-20">
        <Reveal className="flex flex-col">
          <span className="eyebrow">Client stories</span>
          <h2 id="testimonials-heading" className="mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.85rem]">
            Trusted by families, investors and businesses
          </h2>
          <div className="mt-8 flex items-center gap-4 lg:mt-auto">
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={next} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 bg-white text-navy transition hover:border-navy hover:bg-navy hover:text-white">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="font-serif text-lg text-navy">
              {String(index + 1).padStart(2, '0')}
              <span className="text-muted"> / {String(testimonials.length).padStart(2, '0')}</span>
            </p>
          </div>
        </Reveal>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="relative min-h-[22rem] overflow-hidden rounded-lg bg-white p-7 shadow-soft sm:min-h-[19rem] sm:p-10 lg:p-12" aria-live="polite">
            <Quote className="absolute top-8 right-8 h-14 w-14 text-beige-100 sm:h-20 sm:w-20" strokeWidth={1} aria-hidden />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next()
                  else if (info.offset.x > 60) prev()
                }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                <Rating value={t.rating} />
                <blockquote className="mt-5 font-serif text-[1.3rem] leading-[1.5] text-navy sm:text-[1.6rem]">“{t.quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <img src={t.photo} alt="" className="h-14 w-14 rounded-full object-cover" draggable={false} />
                  <div>
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex gap-2" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial from ${item.name}`}
                onClick={() => go(i, i > index ? 1 : -1)}
                className="group relative h-1 flex-1 overflow-hidden rounded-full bg-navy/10"
              >
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: paused ? '100%' : '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-navy/30" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/format'

export default function FaqList({ faqs, className }) {
  const [open, setOpen] = useState(0)
  return (
    <ul className={cn('divide-y divide-line border-y border-line', className)}>
      {faqs.map((f, i) => (
        <li key={f.q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left" aria-expanded={open === i}>
            <span className="font-serif text-lg text-navy sm:text-xl">{f.q}</span>
            <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted transition', open === i && 'rotate-180 text-navy')} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  )
}

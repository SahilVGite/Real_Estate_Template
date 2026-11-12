import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLockBodyScroll, useOnKey } from '../../hooks'
import { cn } from '../../utils/format'

const SIZES = { md: 'sm:max-w-lg', lg: 'sm:max-w-2xl', xl: 'sm:max-w-[56rem]' }

export default function Modal({ open, onClose, title, description, children, className, ariaLabel, size = 'md', padded = true }) {
  useLockBodyScroll(open)
  useOnKey('Escape', onClose, open)
  const panelRef = useRef(null)

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel ?? title}
            className={cn(
              'relative max-h-[92vh] w-full overflow-y-auto rounded-t-xl bg-white shadow-lift outline-none sm:rounded-lg',
              SIZES[size],
              padded && 'p-6 sm:p-8',
              className,
            )}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-cream hover:text-navy"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
            {title && <h2 className="pr-10 text-2xl">{title}</h2>}
            {description && <p className="mt-1.5 text-sm text-muted">{description}</p>}
            <div className={cn(title && 'mt-6')}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

import { motion } from 'framer-motion'

/** Subtle fade-and-rise on first scroll into view. */
export default function Reveal({ as = 'div', children, delay = 0, y = 18, className, ...props }) {
  const Comp = motion[as] ?? motion.div
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  )
}

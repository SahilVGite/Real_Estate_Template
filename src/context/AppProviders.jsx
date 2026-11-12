import { MotionConfig } from 'framer-motion'
import { Toaster } from 'sonner'
import { LeadProvider } from './LeadContext'

export default function AppProviders({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LeadProvider>
        {children}
        <Toaster
          position="bottom-right"
          closeButton
          toastOptions={{
            style: { background: '#ffffff', color: '#252A2D', border: '1px solid #E8E5DF' },
            classNames: { title: 'font-semibold', description: '!text-muted', actionButton: '!bg-navy !text-white' },
          }}
        />
      </LeadProvider>
    </MotionConfig>
  )
}

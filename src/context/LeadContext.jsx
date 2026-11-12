import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LeadModal from '../components/lead/LeadModal'
import { hasCapturedLead } from '../services/enquiryService'

const LeadContext = createContext(null)

const AUTO_DELAY_MS = 35000 // show the automatic popup after 35s of browsing…
const EXIT_MIN_MS = 10000 // …or on exit intent (desktop) after at least 10s
const AUTO_KEY = 'abode:auto-lead-shown'

/**
 * Global lead popup. Any component can call `openLead(type, { property, source, heading })`.
 * Also shows one automatic "requirement" popup per session (timed or exit-intent),
 * unless the visitor has already submitted a lead.
 */
export function LeadProvider({ children }) {
  const [state, setState] = useState({ open: false, type: 'enquiry' })
  const openRef = useRef(false)
  openRef.current = state.open
  const location = useLocation()

  const openLead = useCallback((type = 'enquiry', opts = {}) => {
    setState({ open: true, type, ...opts })
  }, [])
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  // Close the popup when navigating away.
  useEffect(() => close(), [location.pathname, close])

  // Automatic popup: once per session, never after a conversion.
  useEffect(() => {
    let shown = false
    try {
      shown = sessionStorage.getItem(AUTO_KEY) === '1'
    } catch {
      /* storage unavailable */
    }
    if (shown || hasCapturedLead()) return
    const start = Date.now()
    const trigger = (reason) => {
      if (openRef.current || hasCapturedLead()) return
      try {
        sessionStorage.setItem(AUTO_KEY, '1')
      } catch {
        /* ignore */
      }
      cleanup()
      setState({
        open: true,
        type: 'requirement',
        source: `auto-popup:${reason}`,
        heading: {
          eyebrow: 'Free property search',
          title: 'Still looking for the right home?',
          subtitle: 'Tell us what you need — our advisors will send a hand-picked shortlist of verified properties within 24 hours.',
        },
      })
    }
    const timer = setTimeout(() => trigger('timer'), AUTO_DELAY_MS)
    const onLeave = (e) => {
      if (e.clientY <= 0 && Date.now() - start > EXIT_MIN_MS) trigger('exit-intent')
    }
    document.addEventListener('mouseout', onLeave)
    function cleanup() {
      clearTimeout(timer)
      document.removeEventListener('mouseout', onLeave)
    }
    return cleanup
  }, [])

  const value = useMemo(() => ({ openLead, closeLead: close }), [openLead, close])

  return (
    <LeadContext.Provider value={value}>
      {children}
      <LeadModal open={state.open} onClose={close} type={state.type} property={state.property} source={state.source} heading={state.heading} />
    </LeadContext.Provider>
  )
}

export function useLead() {
  const ctx = useContext(LeadContext)
  if (!ctx) throw new Error('useLead must be used within LeadProvider')
  return ctx
}

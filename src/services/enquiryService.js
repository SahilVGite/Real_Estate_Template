/**
 * Leads, enquiries and newsletter sign-ups — DEMO ONLY.
 * Each function stores data in localStorage and resolves after a short delay.
 * Replace the bodies with POST requests to your CRM (HubSpot, Salesforce, Zoho…)
 * or backend when integrating. The UI only depends on these async signatures.
 */
import { storage, delay, uid } from './storage'

const LEADS_KEY = 'leads'
const NEWSLETTER_KEY = 'newsletter'

/**
 * @param {{ type: 'enquiry'|'visit'|'brochure'|'price'|'callback'|'requirement'|'contact',
 *           name: string, phone: string, email?: string, propertyId?: string, propertyTitle?: string,
 *           source?: string, [key: string]: any }} payload
 */
export async function createLead(payload) {
  await delay(800)
  const lead = { id: uid('lead'), status: 'New', createdAt: new Date().toISOString(), page: window.location.pathname, ...payload }
  storage.set(LEADS_KEY, [lead, ...storage.get(LEADS_KEY, [])])
  storage.set('lead-captured', true) // suppresses the automatic popup once someone has converted
  return lead
}

/** True once the visitor has submitted any lead form in this browser. */
export const hasCapturedLead = () => storage.get('lead-captured', false)

export async function subscribeNewsletter(email) {
  await delay(600)
  const list = storage.get(NEWSLETTER_KEY, [])
  const normalised = email.trim().toLowerCase()
  if (list.includes(normalised)) return { alreadySubscribed: true }
  storage.set(NEWSLETTER_KEY, [...list, normalised])
  return { alreadySubscribed: false }
}

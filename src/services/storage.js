/**
 * Thin, failure-safe wrapper around localStorage.
 * All demo persistence goes through here so it can be swapped for API calls.
 */
const PREFIX = 'abode:'

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = window.localStorage.getItem(PREFIX + key)
      return raw == null ? fallback : JSON.parse(raw)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(PREFIX + key)
    } catch {
      /* ignore */
    }
  },
}

/** Simulated network latency for the demo services. */
export const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms))

export const uid = (prefix = 'id') => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`

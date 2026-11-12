/**
 * Property service — DEMO implementation backed by static mock data.
 * To connect a real backend, replace the bodies below with fetch() calls
 * (e.g. GET /api/properties, GET /api/properties/:slug). The UI only depends on
 * these async signatures.
 */
import { properties } from '../data/properties'
import { delay } from './storage'

export async function getProperties() {
  await delay(400)
  return properties
}

export async function getPropertyBySlug(slug) {
  await delay(350)
  return properties.find((p) => p.slug === slug) ?? null
}

/** Synchronous lookup for a known list of ids. */
export const getPropertiesByIds = (ids) =>
  ids.map((id) => properties.find((p) => p.id === id)).filter(Boolean)

export const getFeaturedProperties = () => properties.filter((p) => p.labels.includes('featured'))

export function getSimilarProperties(property, limit = 3) {
  const score = (p) =>
    (p.type === property.type ? 3 : 0) + (p.city === property.city ? 2 : 0) + (p.status === property.status ? 1 : 0)
  return properties
    .filter((p) => p.id !== property.id)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s || new Date(b.p.listedAt) - new Date(a.p.listedAt))
    .slice(0, limit)
    .map(({ p }) => p)
}

export const countBy = (key) =>
  properties.reduce((acc, p) => {
    acc[p[key]] = (acc[p[key]] || 0) + 1
    return acc
  }, {})

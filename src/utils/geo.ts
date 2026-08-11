import type { GeoLocation } from '../types/weather'

// OWM's Weather API and Geocoding API return slightly different coordinates
// for the same city (observed drift up to ~0.02-0.03deg), so the tolerance
// has to be looser than a simple rounding error margin.
const SAME_CITY_TOLERANCE_DEG = 0.05

export function isSameCity(a: GeoLocation, b: GeoLocation): boolean {
  return Math.abs(a.lat - b.lat) < SAME_CITY_TOLERANCE_DEG && Math.abs(a.lon - b.lon) < SAME_CITY_TOLERANCE_DEG
}

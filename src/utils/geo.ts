import type { GeoLocation } from '../types/weather'

export function isSameCity(a: GeoLocation, b: GeoLocation): boolean {
  return Math.abs(a.lat - b.lat) < 0.01 && Math.abs(a.lon - b.lon) < 0.01
}

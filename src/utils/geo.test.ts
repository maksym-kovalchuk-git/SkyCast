import { describe, it, expect } from 'vitest'
import { isSameCity } from './geo'
import type { GeoLocation } from '../types/weather'

function makeLocation(lat: number, lon: number): GeoLocation {
  return { name: 'Test', lat, lon, country: 'UA' }
}

describe('isSameCity', () => {
  it('treats identical coordinates as the same city', () => {
    expect(isSameCity(makeLocation(50.45, 30.52), makeLocation(50.45, 30.52))).toBe(true)
  })

  it('treats small cross-API drift as the same city', () => {
    // Observed real-world drift between OWM's Weather API and Geocoding API for Rivne
    expect(isSameCity(makeLocation(50.6231, 26.2274), makeLocation(50.6196175, 26.2513165))).toBe(true)
  })

  it('treats distant coordinates as different cities', () => {
    expect(isSameCity(makeLocation(50.45, 30.52), makeLocation(48.245, 31.7477))).toBe(false)
  })
})

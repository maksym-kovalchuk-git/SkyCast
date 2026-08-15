import { describe, it, expect, beforeEach } from 'vitest'
import { getRecentCities, addRecentCity } from './searchHistory'
import type { GeoLocation } from '../types/weather'

function makeLocation(name: string, lat: number, lon: number): GeoLocation {
  return { name, lat, lon, country: 'UA' }
}

describe('searchHistory', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts empty', () => {
    expect(getRecentCities()).toEqual([])
  })

  it('adds the most recent city to the front', () => {
    addRecentCity(makeLocation('Kyiv', 50.45, 30.52))
    addRecentCity(makeLocation('Lviv', 49.84, 24.03))
    const recent = getRecentCities()
    expect(recent[0].name).toBe('Lviv')
    expect(recent[1].name).toBe('Kyiv')
  })

  it('moves an existing city to the front instead of duplicating it', () => {
    addRecentCity(makeLocation('Kyiv', 50.45, 30.52))
    addRecentCity(makeLocation('Lviv', 49.84, 24.03))
    addRecentCity(makeLocation('Kyiv', 50.45, 30.52))
    const recent = getRecentCities()
    expect(recent).toHaveLength(2)
    expect(recent[0].name).toBe('Kyiv')
  })

  it('caps the list at 6 entries', () => {
    for (let i = 0; i < 8; i++) {
      addRecentCity(makeLocation(`City${i}`, i, i))
    }
    expect(getRecentCities()).toHaveLength(6)
  })
})

import { describe, it, expect, beforeEach } from 'vitest'
import { getFavoriteCities, toggleFavoriteCity, isFavoriteCity } from './favoriteCities'
import type { GeoLocation } from '../types/weather'

function makeLocation(name: string, lat: number, lon: number): GeoLocation {
  return { name, lat, lon, country: 'UA' }
}

describe('favoriteCities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts empty', () => {
    expect(getFavoriteCities()).toEqual([])
  })

  it('adds a city on toggle', () => {
    const kyiv = makeLocation('Kyiv', 50.45, 30.52)
    const result = toggleFavoriteCity(kyiv)
    expect(result).toHaveLength(1)
    expect(isFavoriteCity(kyiv, result)).toBe(true)
  })

  it('removes a city on the second toggle', () => {
    const kyiv = makeLocation('Kyiv', 50.45, 30.52)
    toggleFavoriteCity(kyiv)
    const result = toggleFavoriteCity(kyiv)
    expect(result).toHaveLength(0)
  })

  it('self-heals near-duplicate entries already sitting in storage', () => {
    // Same real-world scenario as the Rivne bug: two entries for the same
    // city with slightly different coordinates from different OWM endpoints.
    const a = makeLocation('Rivne', 50.6231, 26.2274)
    const b = makeLocation('Rivne', 50.6196175, 26.2513165)
    localStorage.setItem('skycast:favoriteCities', JSON.stringify([a, b]))

    expect(getFavoriteCities()).toHaveLength(1)
  })
})

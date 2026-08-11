import { getStorageItem, setStorageItem } from './storage'
import type { GeoLocation } from '../types/weather'
import { isSameCity } from './geo'

const FAVORITES_KEY = 'skycast:favoriteCities'

function dedupeCities(cities: GeoLocation[]): GeoLocation[] {
  const deduped: GeoLocation[] = []
  for (const city of cities) {
    if (!deduped.some((existing) => isSameCity(existing, city))) {
      deduped.push(city)
    }
  }
  return deduped
}

export function getFavoriteCities(): GeoLocation[] {
  const raw = getStorageItem(FAVORITES_KEY)
  if (!raw) return []

  let parsed: GeoLocation[]
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }

  const deduped = dedupeCities(parsed)
  if (deduped.length !== parsed.length) {
    setStorageItem(FAVORITES_KEY, JSON.stringify(deduped))
  }
  return deduped
}

export function isFavoriteCity(loc: GeoLocation, favorites: GeoLocation[]): boolean {
  return favorites.some((city) => isSameCity(city, loc))
}

export function toggleFavoriteCity(loc: GeoLocation): GeoLocation[] {
  const favorites = getFavoriteCities()
  const updated = isFavoriteCity(loc, favorites)
    ? favorites.filter((city) => !isSameCity(city, loc))
    : [...favorites, loc]

  setStorageItem(FAVORITES_KEY, JSON.stringify(updated))
  return updated
}

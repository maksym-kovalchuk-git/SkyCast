import { getStorageItem, setStorageItem } from './storage'
import type { GeoLocation } from '../types/weather'
import { isSameCity } from './geo'

const FAVORITES_KEY = 'skycast:favoriteCities'

export function getFavoriteCities(): GeoLocation[] {
  const raw = getStorageItem(FAVORITES_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
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

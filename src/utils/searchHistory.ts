import { getStorageItem, setStorageItem } from './storage'
import type { GeoLocation } from '../types/weather'
import { isSameCity } from './geo'

const HISTORY_KEY = 'skycast:searchHistory'
const MAX_HISTORY = 6

export function getRecentCities(): GeoLocation[] {
  const raw = getStorageItem(HISTORY_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function addRecentCity(loc: GeoLocation): void {
  const existing = getRecentCities().filter((city) => !isSameCity(city, loc))
  const updated = [loc, ...existing].slice(0, MAX_HISTORY)
  setStorageItem(HISTORY_KEY, JSON.stringify(updated))
}

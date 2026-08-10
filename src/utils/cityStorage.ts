import { getStorageItem, setStorageItem } from './storage'

const CITY_NAME_KEY = 'skycast:lastCity'
const CITY_LOCAL_NAMES_KEY = 'skycast:lastCityLocalNames'

export function getSavedCity(): string | null {
  return getStorageItem(CITY_NAME_KEY)
}

export function saveCity(cityName: string, localNames?: Record<string, string>): void {
  setStorageItem(CITY_NAME_KEY, cityName)
  if (localNames) {
    setStorageItem(CITY_LOCAL_NAMES_KEY, JSON.stringify(localNames))
  }
}

export function getSavedCityLocalNames(): Record<string, string> | undefined {
  const raw = getStorageItem(CITY_LOCAL_NAMES_KEY)
  if (!raw) return undefined

  try {
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

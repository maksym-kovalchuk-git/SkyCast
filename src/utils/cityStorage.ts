import { getStorageItem, setStorageItem } from './storage'

const STORAGE_KEY = 'skycast:lastCity'

export function getSavedCity(): string | null {
  return getStorageItem(STORAGE_KEY)
}

export function saveCity(cityName: string): void {
  setStorageItem(STORAGE_KEY, cityName)
}

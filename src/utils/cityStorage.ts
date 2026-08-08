const STORAGE_KEY = 'skycast:lastCity'

export function getSavedCity(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function saveCity(cityName: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, cityName)
  } catch {
    // localStorage unavailable (e.g. private browsing) - ignore
  }
}

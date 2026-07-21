import type { CurrentWeather, GeoLocation, WeatherApiError } from '../types/weather'

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error((data as WeatherApiError).error ?? 'Failed to fetch weather')
  }

  return data as CurrentWeather
}

export async function getCitySuggestions(query: string): Promise<GeoLocation[]> {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error((data as WeatherApiError).error ?? 'Failed to fetch suggestions')
  }

  return data as GeoLocation[]
}

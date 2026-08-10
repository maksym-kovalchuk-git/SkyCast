import type { CurrentWeather, ForecastResponse, GeoLocation, WeatherApiError } from '../types/weather'
import type { Language } from '../i18n/language'

export async function getCurrentWeather(city: string, lang: Language): Promise<CurrentWeather> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}&lang=${lang}`)
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

export async function getCityByCoords(lat: number, lon: number): Promise<GeoLocation[]> {
  const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lon}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error((data as WeatherApiError).error ?? 'Failed to resolve location')
  }

  return data as GeoLocation[]
}

export async function getForecast(city: string, lang: Language): Promise<ForecastResponse> {
  const res = await fetch(`/api/forecast?city=${encodeURIComponent(city)}&lang=${lang}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error((data as WeatherApiError).error ?? 'Failed to fetch forecast')
  }

  return data as ForecastResponse
}

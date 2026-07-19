import type { CurrentWeather, WeatherApiError } from '../types/weather'

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
  const data = await res.json()

  if (!res.ok) {
    throw new Error((data as WeatherApiError).error ?? 'Failed to fetch weather')
  }

  return data as CurrentWeather
}

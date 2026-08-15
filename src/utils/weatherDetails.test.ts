import { describe, it, expect } from 'vitest'
import { buildCurrentWeatherDetails, buildHourlyForecastDetails, buildDailyForecastDetails } from './weatherDetails'
import type { CurrentWeather, ForecastItem } from '../types/weather'

const weather: CurrentWeather = {
  name: 'Kyiv',
  dt: 1755255600,
  timezone: 10800,
  visibility: 10000,
  coord: { lat: 50.45, lon: 30.52 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  main: { temp: 23.5, feels_like: 23.1, temp_min: 22, temp_max: 25, humidity: 60, pressure: 1013 },
  wind: { speed: 3.4, deg: 90, gust: 5.1 },
  clouds: { all: 5 },
  sys: { country: 'UA', sunrise: 1755230000, sunset: 1755280000 },
}

describe('buildCurrentWeatherDetails', () => {
  it('maps current weather fields into WeatherDetails', () => {
    const details = buildCurrentWeatherDetails(weather, 'en', 'Kyiv')

    expect(details.source).toBe('current')
    expect(details.cityName).toBe('Kyiv')
    expect(details.temp).toBe(23.5)
    expect(details.feelsLike).toBe(23.1)
    expect(details.conditionMain).toBe('Clear')
    expect(details.pressure).toBe(1013)
    expect(details.humidity).toBe(60)
    expect(details.windSpeed).toBe(3.4)
    expect(details.windDeg).toBe(90)
    expect(details.windGust).toBe(5.1)
    expect(details.cloudsPercent).toBe(5)
    expect(details.visibility).toBe(10000)
    expect(details.sunrise).toBeDefined()
    expect(details.sunset).toBeDefined()
    expect(details.pop).toBeUndefined()
  })

  it('computes a dew point lower than the air temperature', () => {
    const details = buildCurrentWeatherDetails(weather, 'en', 'Kyiv')
    expect(details.dewPoint).toBeLessThan(details.temp)
  })

  it('uses the provided display name rather than the raw API name', () => {
    const details = buildCurrentWeatherDetails(weather, 'en', 'Kiev (custom)')
    expect(details.cityName).toBe('Kiev (custom)')
  })
})

const forecastItem: ForecastItem = {
  dt: 1755255600,
  dt_txt: '2025-08-15 12:00:00',
  weather: [{ id: 500, main: 'Rain', description: 'light rain', icon: '10d' }],
  main: { temp: 19.2, feels_like: 18.9, temp_min: 18, temp_max: 20, humidity: 80, pressure: 1008, dew_point: 15.7 },
  wind: { speed: 4.2, deg: 200, gust: 6.8 },
  clouds: { all: 90 },
  visibility: 8000,
  pop: 0.6,
}

describe('buildHourlyForecastDetails', () => {
  it('maps a single forecast slot into WeatherDetails', () => {
    const details = buildHourlyForecastDetails(forecastItem, 'Lviv', 'en')

    expect(details.source).toBe('hourly')
    expect(details.cityName).toBe('Lviv')
    expect(details.hour).toBe('12:00')
    expect(details.temp).toBe(19.2)
    expect(details.dewPoint).toBe(15.7)
    expect(details.pop).toBe(0.6)
    expect(details.sunrise).toBeUndefined()
    expect(details.sunset).toBeUndefined()
  })
})

describe('buildDailyForecastDetails', () => {
  it('uses the day max/min overrides instead of the representative slot temp', () => {
    const details = buildDailyForecastDetails(
      forecastItem,
      {
        cityName: 'Odesa',
        maxTemp: 24,
        minTemp: 16,
        humidity: 70,
        windSpeed: 3.5,
        conditionMain: 'Clouds',
        conditionDescription: 'overcast clouds',
        conditionIcon: '04d',
      },
      'en',
    )

    expect(details.source).toBe('daily')
    expect(details.temp).toBe(24)
    expect(details.minTemp).toBe(16)
    expect(details.humidity).toBe(70)
    expect(details.windSpeed).toBe(3.5)
    expect(details.conditionMain).toBe('Clouds')
    expect(details.hour).toBeUndefined()
    // pressure/dew point/wind direction still come from the representative slot
    expect(details.pressure).toBe(1008)
    expect(details.dewPoint).toBe(15.7)
    expect(details.windDeg).toBe(200)
  })
})

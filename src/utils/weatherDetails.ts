import type { CurrentWeather, ForecastItem, WeatherDetails } from '../types/weather'
import { calcDewPoint } from './dewPoint'
import {
  getDayMonthLabel,
  getHourLabel,
  getLocalDateFromUnix,
  getTimeLabel,
  getWeekdayLabel,
  parseForecastDate,
} from './dateTime'

export function buildCurrentWeatherDetails(weather: CurrentWeather): WeatherDetails {
  const localDate = getLocalDateFromUnix(weather.dt, weather.timezone)
  const condition = weather.weather[0]

  return {
    source: 'current',
    cityName: weather.name,
    date: getDayMonthLabel(localDate),
    weekday: getWeekdayLabel(localDate),
    hour: getHourLabel(localDate),
    temp: weather.main.temp,
    feelsLike: weather.main.feels_like,
    conditionMain: condition.main,
    conditionDescription: condition.description,
    conditionIcon: condition.icon,
    pressure: weather.main.pressure,
    humidity: weather.main.humidity,
    dewPoint: calcDewPoint(weather.main.temp, weather.main.humidity),
    windSpeed: weather.wind.speed,
    windDeg: weather.wind.deg,
    windGust: weather.wind.gust,
    cloudsPercent: weather.clouds.all,
    visibility: weather.visibility,
    sunrise: getHourLabel(getLocalDateFromUnix(weather.sys.sunrise, weather.timezone)),
    sunset: getHourLabel(getLocalDateFromUnix(weather.sys.sunset, weather.timezone)),
  }
}

export function buildHourlyForecastDetails(item: ForecastItem, cityName: string): WeatherDetails {
  const date = parseForecastDate(item.dt_txt)
  const condition = item.weather[0]

  return {
    source: 'hourly',
    cityName,
    date: getDayMonthLabel(date),
    weekday: getWeekdayLabel(date),
    hour: getTimeLabel(item.dt_txt),
    temp: item.main.temp,
    feelsLike: item.main.feels_like,
    conditionMain: condition.main,
    conditionDescription: condition.description,
    conditionIcon: condition.icon,
    pressure: item.main.pressure,
    humidity: item.main.humidity,
    dewPoint: item.main.dew_point,
    windSpeed: item.wind.speed,
    windDeg: item.wind.deg,
    windGust: item.wind.gust,
    pop: item.pop,
    cloudsPercent: item.clouds.all,
    visibility: item.visibility,
  }
}

interface DailyForecastOverrides {
  cityName: string
  maxTemp: number
  humidity: number
  windSpeed: number
  conditionMain: string
  conditionDescription: string
  conditionIcon: string
}

export function buildDailyForecastDetails(item: ForecastItem, overrides: DailyForecastOverrides): WeatherDetails {
  const date = parseForecastDate(item.dt_txt)

  return {
    source: 'daily',
    cityName: overrides.cityName,
    date: getDayMonthLabel(date),
    weekday: getWeekdayLabel(date),
    temp: overrides.maxTemp,
    feelsLike: item.main.feels_like,
    conditionMain: overrides.conditionMain,
    conditionDescription: overrides.conditionDescription,
    conditionIcon: overrides.conditionIcon,
    pressure: item.main.pressure,
    humidity: overrides.humidity,
    dewPoint: item.main.dew_point,
    windSpeed: overrides.windSpeed,
    windDeg: item.wind.deg,
    windGust: item.wind.gust,
    pop: item.pop,
    cloudsPercent: item.clouds.all,
    visibility: item.visibility,
  }
}

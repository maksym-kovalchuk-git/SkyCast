export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface CurrentWeather {
  name: string
  dt: number
  timezone: number
  visibility: number
  coord: {
    lat: number
    lon: number
  }
  weather: WeatherCondition[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  clouds: {
    all: number
  }
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
}

export interface WeatherApiError {
  error: string
}

export interface GeoLocation {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

export interface ForecastItem {
  dt: number
  dt_txt: string
  weather: WeatherCondition[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    pressure: number
    dew_point: number
  }
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  clouds: {
    all: number
  }
  visibility: number
  pop: number
}

export interface ForecastResponse {
  city: {
    name: string
    country: string
  }
  list: ForecastItem[]
}

export interface ForecastSectionProps {
  forecast: ForecastResponse | null
}

export type WeatherDetailsSource = 'current' | 'hourly' | 'daily'

export interface WeatherDetails {
  source: WeatherDetailsSource
  cityName: string
  date: string
  weekday: string
  hour?: string
  temp: number
  feelsLike: number
  conditionMain: string
  conditionDescription: string
  conditionIcon: string
  pressure: number
  humidity: number
  dewPoint: number
  windSpeed: number
  windDeg: number
  windGust?: number
  pop?: number
  cloudsPercent: number
  visibility: number
  sunrise?: string
  sunset?: string
}
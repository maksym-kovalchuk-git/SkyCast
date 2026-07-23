export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface CurrentWeather {
  name: string
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
  }
  sys: {
    country: string
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
    humidity: number
    pressure: number
  }
  wind: {
    speed: number
  }
}

export interface ForecastResponse {
  city: {
    name: string
    country: string
  }
  list: ForecastItem[]
}
import type { ComponentType } from 'react'
import ClearIcon from './ClearIcon'
import ClearNightIcon from './ClearNightIcon'
import CloudIcon from './CloudIcon'
import CloudSunIcon from './CloudSunIcon'
import CloudMoonIcon from './CloudMoonIcon'
import CloudDarkIcon from './CloudDarkIcon'
import MistIcon from './MistIcon'
import RainIcon from './RainIcon'
import RainSunIcon from './RainSunIcon'
import RainMoonIcon from './RainMoonIcon'
import SnowIcon from './SnowIcon'
import ThunderstormIcon from './ThunderstormIcon'
import DrizzleIcon from './DrizzleIcon'

type WeatherIconComponent = ComponentType<{ size?: number }>

const weatherIcons: Record<string, WeatherIconComponent> = {
  Clear: ClearIcon,
  Clouds: CloudIcon,
  Rain: RainIcon,
  Drizzle: DrizzleIcon,
  Thunderstorm: ThunderstormIcon,
  Snow: SnowIcon,
  Mist: MistIcon,
  Smoke: MistIcon,
  Haze: MistIcon,
  Dust: MistIcon,
  Fog: MistIcon,
}

export function getWeatherIcon(main: string, iconCode: string): WeatherIconComponent {
  if (main === 'Clear' && iconCode.endsWith('n')) {
    return ClearNightIcon
  }

  if (main === 'Rain') {
    if (iconCode === '10d') return RainSunIcon
    if (iconCode === '10n') return RainMoonIcon
  }

  if (main === 'Clouds') {
    if (iconCode === '02d') return CloudSunIcon
    if (iconCode === '02n') return CloudMoonIcon
    if (iconCode === '04d' || iconCode === '04n') return CloudDarkIcon
  }

  return weatherIcons[main] ?? CloudIcon
}

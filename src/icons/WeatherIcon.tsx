import { getWeatherIcon } from './getWeatherIcon'

interface WeatherIconProps {
  main: string
  icon: string
  size?: number
}

export default function WeatherIcon({ main, icon, size }: WeatherIconProps) {
  const Icon = getWeatherIcon(main, icon)

  // eslint-disable-next-line react-hooks/static-components -- getWeatherIcon always resolves to a stable component from a static lookup table, never a new one
  return <Icon size={size} />
}

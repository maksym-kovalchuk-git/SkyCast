const DEFAULT_BG =
  'radial-gradient(120% 100% at 15% 0%, oklch(0.24 0.05 250) 0%, oklch(0.13 0.02 260) 45%, oklch(0.08 0.015 260) 100%)'

const BACKGROUNDS: Record<string, string> = {
  ClearDay:
    'radial-gradient(120% 100% at 15% 0%, oklch(0.28 0.055 85) 0%, oklch(0.16 0.035 80) 45%, oklch(0.08 0.02 70) 100%)',
  ClearNight:
    'radial-gradient(120% 100% at 15% 0%, oklch(0.20 0.07 275) 0%, oklch(0.11 0.04 275) 45%, oklch(0.06 0.02 275) 100%)',
  Clouds:
    'radial-gradient(120% 100% at 15% 0%, oklch(0.26 0.02 250) 0%, oklch(0.16 0.015 255) 45%, oklch(0.08 0.01 255) 100%)',
  Rain:
    'radial-gradient(120% 100% at 15% 0%, oklch(0.26 0.06 230) 0%, oklch(0.15 0.04 240) 45%, oklch(0.07 0.02 245) 100%)',
  Thunderstorm:
    'radial-gradient(120% 100% at 15% 0%, oklch(0.22 0.08 300) 0%, oklch(0.12 0.05 295) 45%, oklch(0.06 0.02 290) 100%)',
  Snow:
    'radial-gradient(120% 100% at 15% 0%, oklch(0.34 0.03 225) 0%, oklch(0.20 0.02 230) 45%, oklch(0.10 0.015 235) 100%)',
  Mist:
    'radial-gradient(120% 100% at 15% 0%, oklch(0.28 0.01 250) 0%, oklch(0.17 0.008 255) 45%, oklch(0.09 0.005 255) 100%)',
}

export function getWeatherBackground(main: string | undefined, isDay: boolean): string {
  if (!main) return DEFAULT_BG

  switch (main) {
    case 'Clear':
      return isDay ? BACKGROUNDS.ClearDay : BACKGROUNDS.ClearNight
    case 'Clouds':
      return BACKGROUNDS.Clouds
    case 'Rain':
    case 'Drizzle':
      return BACKGROUNDS.Rain
    case 'Thunderstorm':
      return BACKGROUNDS.Thunderstorm
    case 'Snow':
      return BACKGROUNDS.Snow
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Fog':
    case 'Dust':
      return BACKGROUNDS.Mist
    default:
      return DEFAULT_BG
  }
}

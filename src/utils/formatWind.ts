import type { Language } from '../i18n/language'

export function formatWind(speed: number, language: Language = 'en'): string {
  const unit = language === 'uk' ? 'м/с' : 'm/s'
  return `${Math.round(speed)} ${unit}`
}

const WIND_DIRECTIONS: Record<Language, string[]> = {
  en: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
  uk: ['Пн', 'Пн-Сх', 'Сх', 'Пд-Сх', 'Пд', 'Пд-Зх', 'Зх', 'Пн-Зх'],
}

export function getWindDirectionLabel(deg: number, language: Language = 'en'): string {
  const directions = WIND_DIRECTIONS[language]
  const steps = directions.length
  const index = ((Math.round(deg / 45) % steps) + steps) % steps
  return directions[index]
}

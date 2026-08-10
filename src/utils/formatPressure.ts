import type { Language } from '../i18n/language'

export type PressureUnit = 'hPa' | 'mmHg'

const HPA_TO_MMHG = 0.750062

const UNIT_LABELS: Record<PressureUnit, Record<Language, string>> = {
  hPa: { en: 'hPa', uk: 'гПа' },
  mmHg: { en: 'mmHg', uk: 'мм' },
}

export function formatPressure(pressureHPa: number, unit: PressureUnit = 'hPa', language: Language = 'en'): string {
  const value = unit === 'mmHg' ? pressureHPa * HPA_TO_MMHG : pressureHPa
  return `${Math.round(value)} ${UNIT_LABELS[unit][language]}`
}

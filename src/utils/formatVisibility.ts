import type { Language } from '../i18n/language'

export function formatVisibility(meters: number, language: Language = 'en'): string {
  const unit = language === 'uk' ? 'км' : 'km'
  return `${(meters / 1000).toFixed(1)} ${unit}`
}

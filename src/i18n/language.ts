export type Language = 'en' | 'uk'

export function isLanguage(value: string): value is Language {
  return value === 'en' || value === 'uk'
}

export function getLocale(language: Language): string {
  return language === 'uk' ? 'uk-UA' : 'en-US'
}

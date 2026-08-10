import { useSettings } from '../context/useSettings'
import { translations, type TranslationKey } from './translations'

export function useTranslation() {
  const { language } = useSettings()

  function t(key: TranslationKey): string {
    return translations[language][key]
  }

  return { t, language }
}

import { useState, type ReactNode } from 'react'
import {
  type TempUnit,
  type PressureUnit,
  getSavedTempUnit,
  saveTempUnit,
  getSavedPressureUnit,
  savePressureUnit,
  getSavedLanguage,
  saveLanguage,
} from '../utils'
import type { Language } from '../i18n/language'
import { SettingsContext } from './settingsContextValue'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tempUnit, setTempUnitState] = useState<TempUnit>(() => getSavedTempUnit() ?? 'C')
  const [pressureUnit, setPressureUnitState] = useState<PressureUnit>(() => getSavedPressureUnit() ?? 'hPa')
  const [language, setLanguageState] = useState<Language>(() => getSavedLanguage() ?? 'en')

  function setTempUnit(unit: TempUnit) {
    setTempUnitState(unit)
    saveTempUnit(unit)
  }

  function setPressureUnit(unit: PressureUnit) {
    setPressureUnitState(unit)
    savePressureUnit(unit)
  }

  function setLanguage(lang: Language) {
    setLanguageState(lang)
    saveLanguage(lang)
  }

  return (
    <SettingsContext.Provider
      value={{ tempUnit, setTempUnit, pressureUnit, setPressureUnit, language, setLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

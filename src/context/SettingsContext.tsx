import { useState, type ReactNode } from 'react'
import {
  type TempUnit,
  type PressureUnit,
  type DesignMode,
  getSavedTempUnit,
  saveTempUnit,
  getSavedPressureUnit,
  savePressureUnit,
  getSavedLanguage,
  saveLanguage,
  getSavedDesignMode,
  saveDesignMode,
} from '../utils'
import type { Language } from '../i18n/language'
import { SettingsContext } from './settingsContextValue'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tempUnit, setTempUnitState] = useState<TempUnit>(() => getSavedTempUnit() ?? 'C')
  const [pressureUnit, setPressureUnitState] = useState<PressureUnit>(() => getSavedPressureUnit() ?? 'hPa')
  const [language, setLanguageState] = useState<Language>(() => getSavedLanguage() ?? 'en')
  const [designMode, setDesignModeState] = useState<DesignMode>(() => getSavedDesignMode() ?? 'standard')

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

  function setDesignMode(mode: DesignMode) {
    setDesignModeState(mode)
    saveDesignMode(mode)
  }

  return (
    <SettingsContext.Provider
      value={{ tempUnit, setTempUnit, pressureUnit, setPressureUnit, language, setLanguage, designMode, setDesignMode }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

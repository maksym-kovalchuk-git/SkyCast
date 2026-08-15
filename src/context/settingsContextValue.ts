import { createContext } from 'react'
import type { TempUnit, PressureUnit, DesignMode } from '../utils'
import type { Language } from '../i18n/language'

export interface SettingsContextValue {
  tempUnit: TempUnit
  setTempUnit: (unit: TempUnit) => void
  pressureUnit: PressureUnit
  setPressureUnit: (unit: PressureUnit) => void
  language: Language
  setLanguage: (language: Language) => void
  designMode: DesignMode
  setDesignMode: (mode: DesignMode) => void
}

export const SettingsContext = createContext<SettingsContextValue | null>(null)

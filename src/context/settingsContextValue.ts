import { createContext } from 'react'
import type { TempUnit, PressureUnit } from '../utils'

export interface SettingsContextValue {
  tempUnit: TempUnit
  setTempUnit: (unit: TempUnit) => void
  pressureUnit: PressureUnit
  setPressureUnit: (unit: PressureUnit) => void
}

export const SettingsContext = createContext<SettingsContextValue | null>(null)

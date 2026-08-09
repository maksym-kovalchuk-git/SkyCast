import { createContext } from 'react'
import type { TempUnit } from '../utils'

export interface SettingsContextValue {
  tempUnit: TempUnit
  setTempUnit: (unit: TempUnit) => void
}

export const SettingsContext = createContext<SettingsContextValue | null>(null)

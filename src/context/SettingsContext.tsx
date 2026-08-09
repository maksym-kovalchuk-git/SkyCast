import { useState, type ReactNode } from 'react'
import { type TempUnit, getSavedTempUnit, saveTempUnit } from '../utils'
import { SettingsContext } from './settingsContextValue'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tempUnit, setTempUnitState] = useState<TempUnit>(() => getSavedTempUnit() ?? 'C')

  function setTempUnit(unit: TempUnit) {
    setTempUnitState(unit)
    saveTempUnit(unit)
  }

  return (
    <SettingsContext.Provider value={{ tempUnit, setTempUnit }}>
      {children}
    </SettingsContext.Provider>
  )
}

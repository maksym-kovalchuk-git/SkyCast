import { useState, type ReactNode } from 'react'
import {
  type TempUnit,
  type PressureUnit,
  getSavedTempUnit,
  saveTempUnit,
  getSavedPressureUnit,
  savePressureUnit,
} from '../utils'
import { SettingsContext } from './settingsContextValue'

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [tempUnit, setTempUnitState] = useState<TempUnit>(() => getSavedTempUnit() ?? 'C')
  const [pressureUnit, setPressureUnitState] = useState<PressureUnit>(() => getSavedPressureUnit() ?? 'hPa')

  function setTempUnit(unit: TempUnit) {
    setTempUnitState(unit)
    saveTempUnit(unit)
  }

  function setPressureUnit(unit: PressureUnit) {
    setPressureUnitState(unit)
    savePressureUnit(unit)
  }

  return (
    <SettingsContext.Provider value={{ tempUnit, setTempUnit, pressureUnit, setPressureUnit }}>
      {children}
    </SettingsContext.Provider>
  )
}

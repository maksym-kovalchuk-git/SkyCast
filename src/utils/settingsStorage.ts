import { getStorageItem, setStorageItem } from './storage'
import type { TempUnit } from './formatTemp'
import type { PressureUnit } from './formatPressure'

const TEMP_UNIT_KEY = 'skycast:tempUnit'
const PRESSURE_UNIT_KEY = 'skycast:pressureUnit'

export function getSavedTempUnit(): TempUnit | null {
  const value = getStorageItem(TEMP_UNIT_KEY)
  return value === 'C' || value === 'F' ? value : null
}

export function saveTempUnit(unit: TempUnit): void {
  setStorageItem(TEMP_UNIT_KEY, unit)
}

export function getSavedPressureUnit(): PressureUnit | null {
  const value = getStorageItem(PRESSURE_UNIT_KEY)
  return value === 'hPa' || value === 'mmHg' ? value : null
}

export function savePressureUnit(unit: PressureUnit): void {
  setStorageItem(PRESSURE_UNIT_KEY, unit)
}

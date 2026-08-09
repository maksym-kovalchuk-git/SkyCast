import { getStorageItem, setStorageItem } from './storage'
import type { TempUnit } from './formatTemp'

const TEMP_UNIT_KEY = 'skycast:tempUnit'

export function getSavedTempUnit(): TempUnit | null {
  const value = getStorageItem(TEMP_UNIT_KEY)
  return value === 'C' || value === 'F' ? value : null
}

export function saveTempUnit(unit: TempUnit): void {
  setStorageItem(TEMP_UNIT_KEY, unit)
}

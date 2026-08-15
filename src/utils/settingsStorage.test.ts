import { describe, it, expect, beforeEach } from 'vitest'
import {
  getSavedTempUnit,
  saveTempUnit,
  getSavedPressureUnit,
  savePressureUnit,
  getSavedLanguage,
  saveLanguage,
  getSavedDesignMode,
  saveDesignMode,
} from './settingsStorage'

describe('settingsStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null for every setting before anything is saved', () => {
    expect(getSavedTempUnit()).toBeNull()
    expect(getSavedPressureUnit()).toBeNull()
    expect(getSavedLanguage()).toBeNull()
    expect(getSavedDesignMode()).toBeNull()
  })

  it('round-trips the temperature unit', () => {
    saveTempUnit('F')
    expect(getSavedTempUnit()).toBe('F')
  })

  it('round-trips the pressure unit', () => {
    savePressureUnit('mmHg')
    expect(getSavedPressureUnit()).toBe('mmHg')
  })

  it('round-trips the language', () => {
    saveLanguage('uk')
    expect(getSavedLanguage()).toBe('uk')
  })

  it('round-trips the design mode', () => {
    saveDesignMode('adaptive')
    expect(getSavedDesignMode()).toBe('adaptive')
  })

  it('ignores garbage values already sitting in storage', () => {
    localStorage.setItem('skycast:tempUnit', 'K')
    expect(getSavedTempUnit()).toBeNull()
  })
})

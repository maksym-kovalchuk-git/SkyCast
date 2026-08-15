import { describe, it, expect, beforeEach } from 'vitest'
import { getSavedCity, saveCity, getSavedCityLocalNames } from './cityStorage'

describe('cityStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns nothing when no city is saved', () => {
    expect(getSavedCity()).toBeNull()
    expect(getSavedCityLocalNames()).toBeUndefined()
  })

  it('round-trips a city name and its local names', () => {
    saveCity('Kyiv', { uk: 'Київ', en: 'Kyiv' })
    expect(getSavedCity()).toBe('Kyiv')
    expect(getSavedCityLocalNames()).toEqual({ uk: 'Київ', en: 'Kyiv' })
  })

  it('keeps the name even when no local names are given', () => {
    saveCity('Kyiv')
    expect(getSavedCity()).toBe('Kyiv')
    expect(getSavedCityLocalNames()).toBeUndefined()
  })
})

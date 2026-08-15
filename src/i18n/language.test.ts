import { describe, it, expect } from 'vitest'
import { isLanguage, getLocale } from './language'

describe('isLanguage', () => {
  it('accepts known languages', () => {
    expect(isLanguage('en')).toBe(true)
    expect(isLanguage('uk')).toBe(true)
  })

  it('rejects unknown values', () => {
    expect(isLanguage('fr')).toBe(false)
    expect(isLanguage('')).toBe(false)
  })
})

describe('getLocale', () => {
  it('maps uk to uk-UA', () => {
    expect(getLocale('uk')).toBe('uk-UA')
  })

  it('maps en to en-US', () => {
    expect(getLocale('en')).toBe('en-US')
  })
})

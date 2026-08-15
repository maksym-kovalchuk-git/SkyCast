import { describe, it, expect } from 'vitest'
import { translateConditionMain } from './translations'

describe('translateConditionMain', () => {
  it('translates known conditions to Ukrainian', () => {
    expect(translateConditionMain('Clouds', 'uk')).toBe('Хмарно')
    expect(translateConditionMain('Clear', 'uk')).toBe('Ясно')
  })

  it('leaves English untouched', () => {
    expect(translateConditionMain('Clouds', 'en')).toBe('Clouds')
  })

  it('falls back to the raw value for unknown conditions', () => {
    expect(translateConditionMain('Tornado', 'uk')).toBe('Tornado')
  })
})

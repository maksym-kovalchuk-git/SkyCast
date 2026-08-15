import { describe, it, expect } from 'vitest'
import { formatWind, getWindDirectionLabel } from './formatWind'

describe('formatWind', () => {
  it('formats in m/s by default', () => {
    expect(formatWind(3.4)).toBe('3 m/s')
  })

  it('formats in the Ukrainian unit', () => {
    expect(formatWind(3.4, 'uk')).toBe('3 м/с')
  })
})

describe('getWindDirectionLabel', () => {
  it('maps the four cardinal directions', () => {
    expect(getWindDirectionLabel(0)).toBe('N')
    expect(getWindDirectionLabel(90)).toBe('E')
    expect(getWindDirectionLabel(180)).toBe('S')
    expect(getWindDirectionLabel(270)).toBe('W')
  })

  it('wraps around 360 degrees', () => {
    expect(getWindDirectionLabel(360)).toBe('N')
    expect(getWindDirectionLabel(350)).toBe('N')
  })

  it('stays in range for negative degrees', () => {
    expect(getWindDirectionLabel(-10)).toBe('N')
  })

  it('returns Ukrainian labels', () => {
    expect(getWindDirectionLabel(0, 'uk')).toBe('Пн')
    expect(getWindDirectionLabel(90, 'uk')).toBe('Сх')
  })
})

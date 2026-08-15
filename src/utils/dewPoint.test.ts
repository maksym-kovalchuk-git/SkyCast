import { describe, it, expect } from 'vitest'
import { calcDewPoint } from './dewPoint'

describe('calcDewPoint', () => {
  it('returns the air temperature when humidity is 100%', () => {
    expect(calcDewPoint(20, 100)).toBeCloseTo(20, 1)
  })

  it('returns a value lower than air temp below 100% humidity', () => {
    expect(calcDewPoint(25, 50)).toBeLessThan(25)
  })

  it('matches the standard Magnus-formula reference value', () => {
    // 20°C at 50% RH -> dew point ~9.25°C
    expect(calcDewPoint(20, 50)).toBeCloseTo(9.25, 1)
  })
})

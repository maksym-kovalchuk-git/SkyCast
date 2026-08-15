import { describe, it, expect } from 'vitest'
import { getWeatherBackground } from './weatherBackground'

describe('getWeatherBackground', () => {
  it('returns the default gradient when main is undefined', () => {
    expect(getWeatherBackground(undefined, true)).toContain('radial-gradient')
  })

  it('returns different gradients for Clear day vs night', () => {
    expect(getWeatherBackground('Clear', true)).not.toBe(getWeatherBackground('Clear', false))
  })

  it('groups fog-like conditions under the same background', () => {
    const mist = getWeatherBackground('Mist', true)
    expect(getWeatherBackground('Fog', true)).toBe(mist)
    expect(getWeatherBackground('Haze', true)).toBe(mist)
    expect(getWeatherBackground('Smoke', true)).toBe(mist)
    expect(getWeatherBackground('Dust', true)).toBe(mist)
  })

  it('groups Rain and Drizzle under the same background', () => {
    expect(getWeatherBackground('Rain', true)).toBe(getWeatherBackground('Drizzle', true))
  })

  it('falls back to the default gradient for unknown conditions', () => {
    expect(getWeatherBackground('Tornado', true)).toBe(getWeatherBackground(undefined, true))
  })
})

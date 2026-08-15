import { describe, it, expect } from 'vitest'
import { formatTemp } from './formatTemp'

describe('formatTemp', () => {
  it('defaults to Celsius and rounds', () => {
    expect(formatTemp(23.4)).toBe('23°C')
    expect(formatTemp(23.6)).toBe('24°C')
  })

  it('converts to Fahrenheit', () => {
    expect(formatTemp(0, 'F')).toBe('32°F')
    expect(formatTemp(100, 'F')).toBe('212°F')
    expect(formatTemp(20, 'F')).toBe('68°F')
  })

  it('handles negative temperatures', () => {
    expect(formatTemp(-5)).toBe('-5°C')
    expect(formatTemp(-40, 'F')).toBe('-40°F')
  })
})

import { describe, it, expect } from 'vitest'
import { formatVisibility } from './formatVisibility'

describe('formatVisibility', () => {
  it('converts meters to km with one decimal', () => {
    expect(formatVisibility(10000)).toBe('10.0 km')
    expect(formatVisibility(1500)).toBe('1.5 km')
  })

  it('uses the Ukrainian unit', () => {
    expect(formatVisibility(10000, 'uk')).toBe('10.0 км')
  })
})

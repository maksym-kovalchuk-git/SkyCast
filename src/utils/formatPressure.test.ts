import { describe, it, expect } from 'vitest'
import { formatPressure } from './formatPressure'

describe('formatPressure', () => {
  it('formats hPa by default', () => {
    expect(formatPressure(1013)).toBe('1013 hPa')
  })

  it('converts to mmHg', () => {
    expect(formatPressure(1013, 'mmHg')).toBe('760 mmHg')
  })

  it('uses Ukrainian unit labels', () => {
    expect(formatPressure(1013, 'hPa', 'uk')).toBe('1013 гПа')
    expect(formatPressure(1013, 'mmHg', 'uk')).toBe('760 мм')
  })
})

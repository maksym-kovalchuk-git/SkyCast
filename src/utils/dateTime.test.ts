import { describe, it, expect } from 'vitest'
import {
  getDateKey,
  getTimeLabel,
  parseForecastDate,
  getLocalDateFromUnix,
  getDayMonthLabel,
  getWeekdayLabel,
  getHourLabel,
} from './dateTime'

describe('getDateKey', () => {
  it('extracts the date portion', () => {
    expect(getDateKey('2026-08-15 12:00:00')).toBe('2026-08-15')
  })
})

describe('getTimeLabel', () => {
  it('extracts HH:MM', () => {
    expect(getTimeLabel('2026-08-15 09:30:00')).toBe('09:30')
  })
})

describe('parseForecastDate', () => {
  it('parses the string as UTC regardless of the host timezone', () => {
    const date = parseForecastDate('2026-08-15 12:00:00')
    expect(date.getUTCFullYear()).toBe(2026)
    expect(date.getUTCMonth()).toBe(7) // August = index 7
    expect(date.getUTCDate()).toBe(15)
    expect(date.getUTCHours()).toBe(12)
  })
})

describe('getLocalDateFromUnix', () => {
  it('shifts the unix timestamp by the timezone offset', () => {
    const unix = 1755255600
    const date = getLocalDateFromUnix(unix, 3600)
    expect(date.getTime()).toBe((unix + 3600) * 1000)
  })
})

describe('getDayMonthLabel', () => {
  it('formats as DD-Month', () => {
    const date = new Date(Date.UTC(2026, 7, 8))
    expect(getDayMonthLabel(date, 'en-US')).toBe('08-August')
  })
})

describe('getWeekdayLabel', () => {
  it('formats the full weekday name', () => {
    const knownSaturday = new Date(Date.UTC(2000, 0, 1))
    expect(getWeekdayLabel(knownSaturday, 'en-US')).toBe('Saturday')
  })
})

describe('getHourLabel', () => {
  it('formats HH:MM with zero padding', () => {
    const date = new Date(Date.UTC(2026, 0, 1, 5, 3))
    expect(getHourLabel(date)).toBe('05:03')
  })
})

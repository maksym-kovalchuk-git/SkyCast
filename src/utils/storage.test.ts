import { describe, it, expect, beforeEach } from 'vitest'
import { getStorageItem, setStorageItem } from './storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('round-trips a value', () => {
    setStorageItem('key', 'value')
    expect(getStorageItem('key')).toBe('value')
  })

  it('returns null for a missing key', () => {
    expect(getStorageItem('missing')).toBeNull()
  })
})

import { describe, it, expect } from 'vitest'
import { isCityNotFoundError, isNetworkError, resolveErrorMessage } from './apiErrors'

describe('isCityNotFoundError', () => {
  it('matches the raw OWM error message', () => {
    expect(isCityNotFoundError('city not found')).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(isCityNotFoundError('City Not Found')).toBe(true)
  })

  it('matches when embedded in a longer message', () => {
    expect(isCityNotFoundError('Error: city not found (404)')).toBe(true)
  })

  it('does not match unrelated errors', () => {
    expect(isCityNotFoundError('Failed to fetch weather')).toBe(false)
    expect(isCityNotFoundError('Network error')).toBe(false)
  })
})

describe('isNetworkError', () => {
  it('treats a TypeError as a network error', () => {
    expect(isNetworkError(new TypeError('Failed to fetch'))).toBe(true)
  })

  it('does not treat a plain Error as a network error', () => {
    expect(isNetworkError(new Error('city not found'))).toBe(false)
  })

  it('does not treat non-Error values as a network error', () => {
    expect(isNetworkError('Failed to fetch')).toBe(false)
    expect(isNetworkError(null)).toBe(false)
  })
})

describe('resolveErrorMessage', () => {
  it('uses the fallback for network errors, ignoring the raw browser text', () => {
    expect(resolveErrorMessage(new TypeError('Failed to fetch'), 'Something went wrong')).toBe('Something went wrong')
  })

  it('uses the error message for our own thrown errors', () => {
    expect(resolveErrorMessage(new Error('city not found'), 'Something went wrong')).toBe('city not found')
  })

  it('uses the fallback for non-Error values', () => {
    expect(resolveErrorMessage('oops', 'Something went wrong')).toBe('Something went wrong')
  })
})

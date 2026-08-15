export function isCityNotFoundError(message: string): boolean {
  return message.toLowerCase().includes('city not found')
}

// The Fetch API spec has fetch() reject with a TypeError specifically for
// network-level failures (offline, DNS, CORS) - unlike our own API client
// code, which always throws a plain Error with a meaningful message.
export function isNetworkError(e: unknown): boolean {
  return e instanceof TypeError
}

export function resolveErrorMessage(e: unknown, fallback: string): string {
  if (isNetworkError(e)) return fallback
  return e instanceof Error ? e.message : fallback
}

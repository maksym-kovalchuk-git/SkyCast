export type TempUnit = 'C' | 'F'

export function formatTemp(tempC: number, unit: TempUnit = 'C'): string {
  const value = unit === 'F' ? (tempC * 9) / 5 + 32 : tempC
  return `${Math.round(value)}°${unit}`
}

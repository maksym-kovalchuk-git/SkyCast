export type PressureUnit = 'hPa' | 'mmHg'

const HPA_TO_MMHG = 0.750062

export function formatPressure(pressureHPa: number, unit: PressureUnit = 'hPa'): string {
  const value = unit === 'mmHg' ? pressureHPa * HPA_TO_MMHG : pressureHPa
  return `${Math.round(value)} ${unit}`
}

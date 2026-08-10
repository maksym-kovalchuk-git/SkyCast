import { formatPressure, type PressureUnit } from '../utils'
import type { Language } from '../i18n'

interface PressureGaugeProps {
  pressure: number
  unit: PressureUnit
  language: Language
}

const PRESSURE_MIN = 980
const PRESSURE_MAX = 1050

export default function PressureGauge({ pressure, unit, language }: PressureGaugeProps) {
  const percent = Math.min(100, Math.max(0, ((pressure - PRESSURE_MIN) / (PRESSURE_MAX - PRESSURE_MIN)) * 100))

  return (
    <div className="w-full">
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${percent}%`, background: 'linear-gradient(90deg, #7dd3fc, #2563eb)' }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/40 mt-1">
        <span>{formatPressure(PRESSURE_MIN, unit, language)}</span>
        <span>{formatPressure(PRESSURE_MAX, unit, language)}</span>
      </div>
    </div>
  )
}

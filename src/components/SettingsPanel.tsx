import { useSettings } from '../context/useSettings'
import type { TempUnit, PressureUnit } from '../utils'
import Modal from './Modal'

interface SettingsPanelProps {
  onClose: () => void
}

const TEMP_UNITS: { value: TempUnit; label: string }[] = [
  { value: 'C', label: '°C' },
  { value: 'F', label: '°F' },
]

const PRESSURE_UNITS: { value: PressureUnit; label: string }[] = [
  { value: 'hPa', label: 'hPa' },
  { value: 'mmHg', label: 'mm' },
]

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { tempUnit, setTempUnit, pressureUnit, setPressureUnit } = useSettings()

  return (
    <Modal onClose={onClose} ariaLabel="Settings" panelClassName="max-w-sm">
      <h2 className="text-xl text-white font-bold mb-6">Settings</h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Temperature</span>
          <div className="flex bg-white/6 border border-white/12 rounded-full p-1">
            {TEMP_UNITS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTempUnit(value)}
                aria-pressed={tempUnit === value}
                className={`px-3 py-1 text-sm rounded-full outline-none transition-colors ${
                  tempUnit === value ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">Pressure</span>
          <div className="flex bg-white/6 border border-white/12 rounded-full p-1">
            {PRESSURE_UNITS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPressureUnit(value)}
                aria-pressed={pressureUnit === value}
                className={`px-3 py-1 text-sm rounded-full outline-none transition-colors ${
                  pressureUnit === value ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

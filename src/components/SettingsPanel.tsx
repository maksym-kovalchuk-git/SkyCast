import { useSettings } from '../context/useSettings'
import type { TempUnit } from '../utils'
import Modal from './Modal'

interface SettingsPanelProps {
  onClose: () => void
}

const TEMP_UNITS: { value: TempUnit; label: string }[] = [
  { value: 'C', label: '°C' },
  { value: 'F', label: '°F' },
]

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { tempUnit, setTempUnit } = useSettings()

  return (
    <Modal onClose={onClose} ariaLabel="Settings" panelClassName="max-w-sm">
      <h2 className="text-xl text-white font-bold mb-6">Settings</h2>

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
    </Modal>
  )
}

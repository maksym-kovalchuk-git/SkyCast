import { useSettings } from '../context/useSettings'
import { useTranslation, type Language } from '../i18n'
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

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'uk', label: 'UA' },
]

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { tempUnit, setTempUnit, pressureUnit, setPressureUnit, language, setLanguage } = useSettings()
  const { t } = useTranslation()

  return (
    <Modal onClose={onClose} ariaLabel={t('settings')} panelClassName="max-w-sm">
      <h2 className="text-xl text-white font-bold mb-6">{t('settings')}</h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">{t('language')}</span>
          <div className="flex bg-white/6 border border-white/12 rounded-full p-1">
            {LANGUAGES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setLanguage(value)}
                aria-pressed={language === value}
                className={`px-3 py-1 text-sm rounded-full outline-none transition-colors ${
                  language === value ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-white/70">{t('temperature')}</span>
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
          <span className="text-sm text-white/70">{t('pressure')}</span>
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

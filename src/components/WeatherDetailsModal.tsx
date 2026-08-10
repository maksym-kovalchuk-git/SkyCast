import type { WeatherDetails } from '../types/weather'
import { formatTemp, formatWind, formatPressure, formatVisibility, getWindDirectionLabel } from '../utils'
import { DropletIcon, SunriseIcon, SunsetIcon, VisibilityIcon, WeatherIcon } from '../icons'
import { useSettings } from '../context/useSettings'
import { useTranslation } from '../i18n'
import Modal from './Modal'
import WindCompass from './WindCompass'
import PressureGauge from './PressureGauge'
import StatCard from './StatCard'

interface WeatherDetailsModalProps {
  details: WeatherDetails
  onClose: () => void
}

export default function WeatherDetailsModal({ details, onClose }: WeatherDetailsModalProps) {
  const { tempUnit, pressureUnit } = useSettings()
  const { t, language } = useTranslation()

  return (
    <Modal onClose={onClose} ariaLabel={`Weather details for ${details.cityName}`} panelClassName="max-w-2xl max-h-[85vh]">
      <p className="text-sm text-white/50">{details.cityName}</p>
      <h2 className="text-2xl text-white font-bold pr-10">
        {details.weekday}, {details.date}{details.hour ? ` · ${details.hour}` : ''}
      </h2>

      <div className="flex items-center gap-4 mt-6">
        <WeatherIcon main={details.conditionMain} icon={details.conditionIcon} size={64} />
        <div>
          <p className="text-5xl text-white font-extrabold leading-none">
            {formatTemp(details.temp, tempUnit)}
            {details.minTemp !== undefined && (
              <span className="text-2xl text-white/40 font-bold"> / {formatTemp(details.minTemp, tempUnit)}</span>
            )}
          </p>
          <p className="text-white/60 text-sm mt-1">{t('feelsLike')} {formatTemp(details.feelsLike, tempUnit)}</p>
          <p className="text-white/80 text-sm capitalize">{details.conditionDescription}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        <StatCard label={t('pressure')}>
          <p className="text-white text-xl font-bold">{formatPressure(details.pressure, pressureUnit, language)}</p>
          <PressureGauge pressure={details.pressure} unit={pressureUnit} language={language} />
        </StatCard>

        <StatCard label={t('humidity')} icon={<DropletIcon size={16} />}>
          <p className="text-white text-xl font-bold">{Math.round(details.humidity)}%</p>
          <p className="text-white/50 text-xs">{t('dewPoint')} {formatTemp(details.dewPoint, tempUnit)}</p>
        </StatCard>

        <StatCard label={t('wind')}>
          <div className="flex items-center gap-3">
            <WindCompass deg={details.windDeg} size={48} />
            <div>
              <p className="text-white text-xl font-bold">{formatWind(details.windSpeed, language)}</p>
              <p className="text-white/50 text-xs">{t('from')} {getWindDirectionLabel(details.windDeg, language)}: {details.windDeg}°</p>
              {details.windGust !== undefined && (
                <p className="text-white/50 text-xs">{t('gusts')} {formatWind(details.windGust, language)}</p>
              )}
            </div>
          </div>
        </StatCard>

        <StatCard label={t('cloudCover')}>
          <WeatherIcon main="Clouds" icon="04d" size={20} />
          <p className="text-white text-xl font-bold">{details.cloudsPercent}%</p>
        </StatCard>

        <StatCard label={t('visibility')} icon={<VisibilityIcon size={16} />}>
          <p className="text-white text-xl font-bold">{formatVisibility(details.visibility, language)}</p>
        </StatCard>

        {details.pop !== undefined && (
          <StatCard label={t('precipitation')} icon={<DropletIcon size={16} />}>
            <p className="text-white text-xl font-bold">{Math.round(details.pop * 100)}%</p>
          </StatCard>
        )}

        {details.sunrise && details.sunset && (
          <StatCard label={t('sun')}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <SunriseIcon size={16} className="text-white/50" />
                <p className="text-white text-lg font-bold">{details.sunrise}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <SunsetIcon size={16} className="text-white/50" />
                <p className="text-white text-lg font-bold">{details.sunset}</p>
              </div>
            </div>
          </StatCard>
        )}
      </div>
    </Modal>
  )
}

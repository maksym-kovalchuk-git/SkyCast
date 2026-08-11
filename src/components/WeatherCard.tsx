import type { CurrentWeather, WeatherDetails } from "../types/weather";
import { formatTemp, formatWind, formatPressure, buildCurrentWeatherDetails } from "../utils";
import { WeatherIcon, StarIcon } from "../icons";
import { useSettings } from "../context/useSettings";
import { useTranslation, translateConditionMain } from "../i18n";

interface WeatherCardProps {
  weather: CurrentWeather | null;
  cityName: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectDetails: (details: WeatherDetails) => void;
}

export default function WeatherCard({ weather, cityName, isFavorite, onToggleFavorite, onSelectDetails }: WeatherCardProps ) {
  const { tempUnit, pressureUnit } = useSettings()
  const { t, language } = useTranslation()

  return (
    <>
      {weather &&
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-5">
          <div className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-8 flex flex-col">
            <p className='text-sm text-white/50 pb-2 mr-5'>{t('weatherIn')}</p>
            <div className="flex flex-col justify-between flex-1">
              <div className="flex items-center gap-2">
                <p className="text-3xl text-white font-bold">{cityName}, {weather.sys.country}</p>
                <button
                  type="button"
                  onClick={onToggleFavorite}
                  aria-label={isFavorite ? t('removeFavorite') : t('addFavorite')}
                  aria-pressed={isFavorite}
                  className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-full outline-none hover:bg-white/10 transition-colors ${isFavorite ? 'text-amber-400' : 'text-white/40'}`}
                >
                  <StarIcon size={20} filled={isFavorite} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-7xl text-white font-extrabold">{formatTemp(weather.main.temp, tempUnit)}</span>
                <div>
                  <span className="text-md text-white font-bold">{translateConditionMain(weather.weather[0].main, language)}</span>
                  <p className="text-white/60 text-sm">{t('feelsLike')} {formatTemp(weather.main.feels_like, tempUnit)}</p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectDetails(buildCurrentWeatherDetails(weather, language, cityName))}
            className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-7 flex flex-col text-left outline-none hover:bg-white/9 transition-colors"
          >
            <div className="flex items-center">
                <WeatherIcon main={weather.weather[0].main} icon={weather.weather[0].icon} size={46} />
                <p className="text-white font-bold pl-3">{translateConditionMain(weather.weather[0].main, language)}</p>
            </div>
            <div className="flex flex-col gap-3 text-sm border-t border-white/12 pt-4 mt-auto">
              <div className="flex justify-between">
                <span className="block text-white/60">{t('humidity')}</span>
                <p className="text-white">{weather.main.humidity}%</p>
              </div>
              <div className="flex justify-between">
                <span className="block text-white/60">{t('pressure')}</span>
                <p className="text-white">{formatPressure(weather.main.pressure, pressureUnit, language)}</p>
              </div>
              <div className="flex justify-between">
                <span className="block text-white/60">{t('wind')}</span>
                <p className="text-white">{formatWind(weather.wind.speed, language)}</p>
              </div>
            </div>
          </button>
        </div>
      }
    </>
  )
}

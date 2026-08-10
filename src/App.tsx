import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather, getForecast } from './api/weather';
import { type ForecastResponse, type CurrentWeather, type GeoLocation, type WeatherDetails } from './types/weather'
import {
  CitySearch,
  WeatherCard,
  Forecast,
  HourlyForecast,
  WeatherMap,
  WeatherDetailsModal,
  WeatherCardSkeleton,
  WeatherMapSkeleton,
  HourlyForecastSkeleton,
  ForecastSkeleton,
  SettingsPanel,
} from './components';
import { SettingsIcon } from './icons';
import { getSavedCity, getSavedCityLocalNames, saveCity } from './utils';
import { useTranslation } from './i18n';


function App() {
  const { t, language } = useTranslation()
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [cityName, setCityName] = useState(() => getSavedCity() ?? 'Kyiv')
  const [cityLocalNames, setCityLocalNames] = useState(() => getSavedCityLocalNames())
  const somethingWrongMessage = t('somethingWrong')
  const displayCityName = cityLocalNames?.[language] ?? weather?.name ?? cityName

  const handleGetWeather = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      const dataWeather = await getCurrentWeather(city, language)
      setWeather(dataWeather)
      const dataForecast = await getForecast(city, language)
      setForecast(dataForecast)
    } catch (e) {
      setError( e instanceof Error ? e.message : somethingWrongMessage)
    } finally {
      setLoading(false)
    }
  }, [language, somethingWrongMessage])

  function handleSelect(loc: GeoLocation) {
    saveCity(loc.name, loc.local_names)
    setCityLocalNames(loc.local_names)
    setCityName(loc.name)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on mount and whenever the selected city or language changes
    handleGetWeather(cityName)
  }, [cityName, handleGetWeather])
  return (
    <div className="min-h-screen">
      <header className="flex flex-wrap items-center justify-between gap-4 pt-7 pb-7 pr-12 pl-12">
        <h1 className="text-2xl text-white font-extrabold tracking-tight">SkyCast</h1>
        <div className="flex items-center gap-3">
          <CitySearch onSelect={handleSelect} />
          <button
            type="button"
            onClick={() => setShowSettings(true)}
            aria-label={t('settings')}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-white/6 border border-white/12 text-white/70 hover:text-white hover:bg-white/10 outline-none transition-colors"
          >
            <SettingsIcon size={18} />
          </button>
        </div>
      </header>

      <main className="px-52 pt-4 pb-12 flex flex-col gap-6">
        {error && <p className="text-red-600">{error}</p>}
        {loading ? (
          <>
            <WeatherCardSkeleton />
            <WeatherMapSkeleton />
            <HourlyForecastSkeleton />
            <ForecastSkeleton />
          </>
        ) : (
          <>
            <WeatherCard weather={weather} cityName={displayCityName} onSelectDetails={setWeatherDetails} />
            {weather && <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} city={displayCityName} weather={weather.weather[0].main} temp={weather.main.temp} />}
            <HourlyForecast forecast={forecast} cityName={displayCityName} onSelectDetails={setWeatherDetails} />
            <Forecast forecast={forecast} cityName={displayCityName} onSelectDetails={setWeatherDetails} />
          </>
        )}
      </main>

      {weatherDetails && (
        <WeatherDetailsModal details={weatherDetails} onClose={() => setWeatherDetails(null)} />
      )}

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  )
}

export default App

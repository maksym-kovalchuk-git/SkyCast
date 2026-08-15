import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { getCurrentWeather, getCityByCoords, getForecast } from './api/weather';
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
  FavoritesPanel,
  WeatherParticles,
  HeaderIconButton,
} from './components';
import { SettingsIcon, LocationIcon, StarIcon } from './icons';
import {
  getSavedCity,
  getSavedCityLocalNames,
  saveCity,
  addRecentCity,
  getFavoriteCities,
  isFavoriteCity,
  toggleFavoriteCity,
  getWeatherBackground,
} from './utils';
import { useTranslation } from './i18n';
import { useSettings } from './context/useSettings';


function App() {
  const { t, language } = useTranslation()
  const { designMode } = useSettings()
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [locating, setLocating] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [cityName, setCityName] = useState(() => getSavedCity() ?? 'Kyiv')
  const [cityLocalNames, setCityLocalNames] = useState(() => getSavedCityLocalNames())
  const [favorites, setFavorites] = useState<GeoLocation[]>(() => getFavoriteCities())
  const somethingWrongMessage = t('somethingWrong')
  const displayCityName = cityLocalNames?.[language] ?? weather?.name ?? cityName
  const currentLocation: GeoLocation | null = weather
    ? { name: cityName, local_names: cityLocalNames, lat: weather.coord.lat, lon: weather.coord.lon, country: weather.sys.country }
    : null
  const isCurrentFavorite = currentLocation ? isFavoriteCity(currentLocation, favorites) : false
  const conditionMain = weather?.weather[0]?.main
  const isDay = weather?.weather[0]?.icon.endsWith('d') ?? true
  const adaptiveBackground =
    designMode === 'adaptive' && weather ? getWeatherBackground(conditionMain, isDay) : undefined

  const handleGetWeather = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      const [dataWeather, dataForecast] = await Promise.all([
        getCurrentWeather(city, language),
        getForecast(city, language),
      ])
      setWeather(dataWeather)
      setForecast(dataForecast)
    } catch (e) {
      setError( e instanceof Error ? e.message : somethingWrongMessage)
    } finally {
      setLoading(false)
    }
  }, [language, somethingWrongMessage])

  function handleSelect(loc: GeoLocation) {
    saveCity(loc.name, loc.local_names)
    addRecentCity(loc)
    setCityLocalNames(loc.local_names)
    setCityName(loc.name)
  }

  function handleToggleFavorite(loc: GeoLocation) {
    setFavorites(toggleFavoriteCity(loc))
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setError(t('geolocationUnsupported'))
      return
    }

    setLocating(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const results = await getCityByCoords(position.coords.latitude, position.coords.longitude)
          const loc = results[0]
          if (!loc) {
            setError(t('locationNotFound'))
            return
          }
          handleSelect(loc)
        } catch (e) {
          setError(e instanceof Error ? e.message : somethingWrongMessage)
        } finally {
          setLocating(false)
        }
      },
      () => {
        setError(t('geolocationDenied'))
        setLocating(false)
      },
      { timeout: 10000 },
    )
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on mount and whenever the selected city or language changes
    handleGetWeather(cityName)
  }, [cityName, handleGetWeather])

  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      const isSlashKey = e.code === 'Slash' || e.key === '/' || e.key === '.'
      if (!isSlashKey || weatherDetails || showSettings || showFavorites) return

      const target = e.target as HTMLElement
      const isTypingTarget = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (isTypingTarget) return

      e.preventDefault()
      searchInputRef.current?.focus()
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [weatherDetails, showSettings, showFavorites])
  return (
    <div
      className="min-h-screen isolate"
      style={adaptiveBackground ? { background: adaptiveBackground, transition: 'background 1s ease' } : undefined}
    >
      {adaptiveBackground && conditionMain && <WeatherParticles conditionMain={conditionMain} />}
      <header className="flex flex-wrap items-center justify-between gap-4 pt-7 pb-7 pr-12 pl-12">
        <h1 className="text-2xl text-white font-extrabold tracking-tight">SkyCast</h1>
        <div className="flex items-center gap-3">
          <CitySearch ref={searchInputRef} onSelect={handleSelect} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          <HeaderIconButton onClick={() => setShowFavorites(true)} ariaLabel={t('favorites')}>
            <StarIcon size={18} filled={favorites.length > 0} />
          </HeaderIconButton>
          <HeaderIconButton onClick={handleLocate} disabled={locating} ariaLabel={t('useMyLocation')}>
            <LocationIcon size={18} />
          </HeaderIconButton>
          <HeaderIconButton onClick={() => setShowSettings(true)} ariaLabel={t('settings')}>
            <SettingsIcon size={18} />
          </HeaderIconButton>
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
            <WeatherCard
              weather={weather}
              cityName={displayCityName}
              isFavorite={isCurrentFavorite}
              onToggleFavorite={() => currentLocation && handleToggleFavorite(currentLocation)}
              onSelectDetails={setWeatherDetails}
            />
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

      {showFavorites && (
        <FavoritesPanel
          favorites={favorites}
          onSelect={handleSelect}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setShowFavorites(false)}
        />
      )}
    </div>
  )
}

export default App

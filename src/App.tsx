import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type WeatherDetails } from './types/weather'
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
import { getWeatherBackground } from './utils';
import { useTranslation } from './i18n';
import { useSettings } from './context/useSettings';
import { useCityWeather, useFavoriteCities } from './hooks';


function App() {
  const { t } = useTranslation()
  const { designMode } = useSettings()
  const {
    weather,
    forecast,
    error,
    loading,
    locating,
    displayCityName,
    currentLocation,
    handleSelect,
    handleLocate,
  } = useCityWeather()
  const { favorites, toggleFavorite, isFavorite } = useFavoriteCities()
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  
  const searchInputRef = useRef<HTMLInputElement>(null)

  const isCurrentFavorite = isFavorite(currentLocation)
  const conditionMain = weather?.weather[0]?.main
  const isDay = weather?.weather[0]?.icon.endsWith('d') ?? true
  const adaptiveBackground =
    designMode === 'adaptive' && weather ? getWeatherBackground(conditionMain, isDay) : undefined

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
          <CitySearch ref={searchInputRef} onSelect={handleSelect} favorites={favorites} onToggleFavorite={toggleFavorite} />
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
              onToggleFavorite={() => currentLocation && toggleFavorite(currentLocation)}
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
          onToggleFavorite={toggleFavorite}
          onClose={() => setShowFavorites(false)}
        />
      )}
    </div>
  )
}

export default App

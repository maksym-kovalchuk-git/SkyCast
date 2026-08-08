import { useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather, getForecast } from './api/weather';
import { type ForecastResponse, type CurrentWeather, type GeoLocation, type WeatherDetails } from './types/weather'
import { CitySearch, WeatherCard, Forecast, HourlyForecast, WeatherMap, WeatherDetailsModal } from './components';
import { getSavedCity, saveCity } from './utils';


function App() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [weatherDetails, setWeatherDetails] = useState<WeatherDetails | null>(null)

  async function handleGetWeather(cityName: string) {
    setLoading(true)
    setError(null)
    try {
      const dataWeather = await getCurrentWeather(cityName)
      setWeather(dataWeather)
      const dataForecast = await getForecast(cityName)
      setForecast(dataForecast)
    } catch (e) {
      setError( e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleSelect(loc: GeoLocation) {
    saveCity(loc.name)
    handleGetWeather(loc.name)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount pattern, loading/error state must update synchronously with the request lifecycle
    handleGetWeather(getSavedCity() ?? 'Kyiv')
  }, [])
  return (
    <div className="min-h-screen">
      <header className="flex flex-wrap items-center justify-between gap-4 pt-7 pb-7 pr-12 pl-12">
        <h1 className="text-2xl text-white font-extrabold tracking-tight">SkyCast</h1>
        <CitySearch onSelect={handleSelect} />
      </header>

      <main className="px-52 pt-4 pb-12 flex flex-col gap-6">
        {loading && <p className="text-slate-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <WeatherCard weather={weather} onSelectDetails={setWeatherDetails} />
        {weather && <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} city={weather.name} weather={weather.weather[0].main} temp={weather.main.temp} />}
        <HourlyForecast forecast={forecast} onSelectDetails={setWeatherDetails} />
        <Forecast forecast={forecast} onSelectDetails={setWeatherDetails} />
      </main>

      {weatherDetails && (
        <WeatherDetailsModal details={weatherDetails} onClose={() => setWeatherDetails(null)} />
      )}
    </div>
  )
}

export default App

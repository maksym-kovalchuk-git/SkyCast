import { useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather, getForecast } from './api/weather';
import { type ForecastResponse, type CurrentWeather, type GeoLocation } from './types/weather'
import { CitySearch, WeatherCard, Forecast, HourlyForecast } from './components';


function App() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
    handleGetWeather(loc.name)
  }

  useEffect(() => {
    handleGetWeather('Kyiv')
  }, [])
  return (
    <div className="min-h-screen">
      <header className="flex bg-gradient-to-r from-sky-500/75 to-blue-600/75 flex-wrap items-center justify-between gap-4 px-8 py-6">
        <h1 className="text-3xl text-white">SkyCast</h1>
        <CitySearch onSelect={handleSelect} />
      </header>

      <main className="max-w-4xl mt-15 px-8 pb-12 flex flex-col gap-6">
        {loading && <p className="text-slate-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div>
          {weather && <p className='text-xl text-slate-800 pb-2 mr-5'>Weather in city: {weather.name}</p>}
          <WeatherCard weather={weather} />
        </div>
        <HourlyForecast forecast={forecast} />
        <Forecast forecast={forecast} />
      </main>
    </div>
  )
}

export default App

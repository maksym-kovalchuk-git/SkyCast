import { useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather, getForecast } from './api/weather';
import { type ForecastResponse, type CurrentWeather, type GeoLocation } from './types/weather'
import { CitySearch, WeatherCard, Forecast } from './components';


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
    <>
      <h1 className='text-slate-700'>SkyCast</h1>
      <CitySearch onSelect={handleSelect} />
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <WeatherCard weather={weather} />

      <Forecast forecast={forecast} />
      
    </>
  )
}

export default App

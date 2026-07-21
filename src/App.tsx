import { useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather } from './api/weather';
import type { CurrentWeather, GeoLocation } from './types/weather'
import { CitySearch } from './components';


function App() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleGetWeather(cityName: string) {
    setLoading(true)
    setError(null)
    try {
      const data = await getCurrentWeather(cityName)
      setWeather(data)
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
      {weather && 
        <div>
          <h1>{weather.name} temperature: {Math.round(weather.main.temp)}°C</h1> 
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p >{weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Wind speed: {Math.round(weather.wind.speed)} m/s</p>
        </div>
      }
    </>
  )
}

export default App

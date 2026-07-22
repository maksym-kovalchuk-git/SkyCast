import { useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather } from './api/weather';
import type { CurrentWeather, GeoLocation } from './types/weather'
import { CitySearch, WeatherCard } from './components';


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
      <WeatherCard weather={weather} />
      
    </>
  )
}

export default App

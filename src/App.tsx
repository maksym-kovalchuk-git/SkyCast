import { useState } from 'react'
import './App.css'
import { getCurrentWeather } from './api/weather';
import type { CurrentWeather } from './types/weather'


function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleGetWeather() {
    setLoading(true)
    setError(null)
    try {
      const data = await getCurrentWeather(city)
      setWeather(data)
    } catch (e) {
      setError( e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <h1 className='text-slate-800'>SkyCast</h1>
      <button onClick={() => {setCity('Kyiv')}}>Set Kyiv</button>
      <button onClick={() => {handleGetWeather()}}>Get weather</button>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && <p>{weather.name}: {weather.main.temp}°C</p>}

    </>
  )
}

export default App

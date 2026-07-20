import { useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather } from './api/weather';
import type { CurrentWeather } from './types/weather'


function App() {
  const [city, setCity] = useState('Kyiv')
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

  useEffect(() => {
    handleGetWeather()
  }, [])
  return (
    <>
      <h1 className='text-slate-700'>SkyCast</h1>
      <button onClick={() => {setCity('Rivne')}}>Set Rivne</button>
      <button onClick={() => {handleGetWeather()}}>Get weather</button>
      
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

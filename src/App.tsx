import { useEffect, useState } from 'react'
import './App.css'
import { getCurrentWeather, getCitySuggestions } from './api/weather';
import type { CurrentWeather, GeoLocation } from './types/weather'


function App() {
  const [inputSearch, setInputSearch] = useState('')
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([])
  const [suggestionsError, setSuggestionsError] = useState('')
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
    setSuggestions([])
    handleGetWeather(loc.name)
    setInputSearch('')
  }

  useEffect(() => {
    if (!inputSearch) {
      setSuggestions([])
      return
    }

    const timeoutId = setTimeout(() => {
      getCitySuggestions(inputSearch)
      .then(setSuggestions)
      .catch((e) => {
        setSuggestionsError(e instanceof Error ? e.message : 'Something went wrong')
        setSuggestions([])
      })
    }, 250)

    return () => clearTimeout(timeoutId)
  }, [inputSearch])

  useEffect(() => {
    handleGetWeather('Kyiv')
  }, [])
  return (
    <>
      <h1 className='text-slate-700'>SkyCast</h1>
      <input 
        type='text'
        value={inputSearch}
        placeholder="Enter city"
        onChange={(e) => {setInputSearch(e.target.value)}}
        className='border rounded px-3 py-2 w-full'
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s)}
            >
              {s.local_names?.en ?? s.name}{s.state ? `, ${s.state}` : ''}, {s.country}
            </li>
          ))}
        </ul>
      )}

      {suggestionsError && <p>{suggestionsError}</p>}
      
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

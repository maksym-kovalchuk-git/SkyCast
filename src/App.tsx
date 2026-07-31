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
        <div>
          {forecast && (
            <div className='flex gap-6'>
              {forecast.list.slice(0, 8).map((item) => (
                <div key={item.dt} className='flex flex-col items-center'>
                  <p>{item.dt_txt.split(' ')[1].slice(0, 5)}</p>
                  <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].main}
                      className="w-10 h-10"
                  />
                  <p>{Math.round(item.main.temp)}°C</p>
                  <p>{Math.round(item.main.feels_like)}°C</p>
                  <p>{item.main.humidity}%</p>
                  <p>{item.main.pressure} hPa</p>
                  <p>{Math.round(item.wind.speed)} m/s</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <Forecast forecast={forecast} />
      </main>
    </div>
  )
}

export default App

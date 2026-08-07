import type { CurrentWeather } from "../types/weather";
import { formatTemp } from "../utils/formatTemp";
import { getWeatherIcon } from "../icons";

interface WeatherCardProps {
  weather: CurrentWeather | null;
}

export default function WeatherCard({ weather }: WeatherCardProps ) {
  const Icon = weather ? getWeatherIcon(weather.weather[0].main, weather.weather[0].icon) : null

  return (
    <>
      {weather && Icon &&
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-5">
          <div className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-8 flex flex-col">
            <p className='text-sm text-white/50 pb-2 mr-5'>WEATHER IN</p>
            <div className="flex flex-col justify-between flex-1">
              <p className="text-3xl text-white font-bold">{weather.name}, {weather.sys.country}</p>
              <div className="flex items-center gap-4">
                <span className="text-7xl text-white font-extrabold">{formatTemp(weather.main.temp)}</span>
                <div>
                  <span className="text-md text-white font-bold">{weather.weather[0].main}</span>
                  <p className="text-white/60 text-sm">Feels like {formatTemp(weather.main.feels_like)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-7 flex flex-col">
            <div className="flex items-center">
                <Icon size={46} />
                <p className="text-white font-bold pl-3">{weather.weather[0].main}</p>
            </div>
            <div className="flex flex-col gap-3 text-sm border-t border-white/12 pt-4 mt-auto">
              <div className="flex justify-between">
                <span className="block text-white/60">Humidity</span>
                <p className="text-white">{weather.main.humidity}%</p>
              </div>
              <div className="flex justify-between">
                <span className="block text-white/60">Pressure</span>
                <p className="text-white">{weather.main.pressure} hPa</p>
              </div>
              <div className="flex justify-between">
                <span className="block text-white/60">Wind</span>
                <p className="text-white">{Math.round(weather.wind.speed)} m/s</p>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
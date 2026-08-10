import type { CurrentWeather, WeatherDetails } from "../types/weather";
import { formatTemp, formatWind, formatPressure, buildCurrentWeatherDetails } from "../utils";
import { WeatherIcon } from "../icons";
import { useSettings } from "../context/useSettings";

interface WeatherCardProps {
  weather: CurrentWeather | null;
  onSelectDetails: (details: WeatherDetails) => void;
}

export default function WeatherCard({ weather, onSelectDetails }: WeatherCardProps ) {
  const { tempUnit, pressureUnit } = useSettings()

  return (
    <>
      {weather &&
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-5">
          <div className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-8 flex flex-col">
            <p className='text-sm text-white/50 pb-2 mr-5'>WEATHER IN</p>
            <div className="flex flex-col justify-between flex-1">
              <p className="text-3xl text-white font-bold">{weather.name}, {weather.sys.country}</p>
              <div className="flex items-center gap-4">
                <span className="text-7xl text-white font-extrabold">{formatTemp(weather.main.temp, tempUnit)}</span>
                <div>
                  <span className="text-md text-white font-bold">{weather.weather[0].main}</span>
                  <p className="text-white/60 text-sm">Feels like {formatTemp(weather.main.feels_like, tempUnit)}</p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectDetails(buildCurrentWeatherDetails(weather))}
            className="h-57 bg-white/6 rounded-3xl border border-white/12 shadow-sm p-7 flex flex-col text-left outline-none hover:bg-white/9 transition-colors"
          >
            <div className="flex items-center">
                <WeatherIcon main={weather.weather[0].main} icon={weather.weather[0].icon} size={46} />
                <p className="text-white font-bold pl-3">{weather.weather[0].main}</p>
            </div>
            <div className="flex flex-col gap-3 text-sm border-t border-white/12 pt-4 mt-auto">
              <div className="flex justify-between">
                <span className="block text-white/60">Humidity</span>
                <p className="text-white">{weather.main.humidity}%</p>
              </div>
              <div className="flex justify-between">
                <span className="block text-white/60">Pressure</span>
                <p className="text-white">{formatPressure(weather.main.pressure, pressureUnit)}</p>
              </div>
              <div className="flex justify-between">
                <span className="block text-white/60">Wind</span>
                <p className="text-white">{formatWind(weather.wind.speed)}</p>
              </div>
            </div>
          </button>
        </div>
      }
    </>
  )
}
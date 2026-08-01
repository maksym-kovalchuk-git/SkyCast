import type { ForecastResponse } from "../types/weather"
import { formatTemp } from "../utils/formatTemp"

interface ForecastProps {
  forecast: ForecastResponse | null
}

export default function HourlyForecast({ forecast }: ForecastProps) {
  return (
    <>
      {forecast && (
        <div>
          <h2 className="text-2xl text-slate-800 mb-3">Hourly forecast</h2>
          <ul className="flex divide-x divide-slate-100 overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm">
            {forecast.list.slice(0, 8).map((item) => (
              <li
                key={item.dt}
                className="shrink-0 w-32 p-4 text-center pb-4"
              >
                <time dateTime={item.dt_txt} className="block text-sm text-slate-900 pb-2">
                  {item.dt_txt.split(' ')[1].slice(0, 5)}
                </time>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].main}
                  className="w-10 h-10 mx-auto"
                />
                <p className="text-slate-800">{formatTemp(item.main.temp)}</p>
                <p className="text-xs text-slate-400">Feels {formatTemp(item.main.feels_like)}</p>
                <p className="text-xs text-slate-400 mt-2">Humidity {item.main.humidity}%</p>
                <p className="text-xs text-slate-400">Wind {Math.round(item.wind.speed)} m/s</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
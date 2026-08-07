import type { ForecastResponse } from "../types/weather"
import { formatTemp } from "../utils/formatTemp"
import { getWeatherIcon } from "../icons";

interface ForecastProps {
  forecast: ForecastResponse | null
}

export default function HourlyForecast({ forecast }: ForecastProps) {
  return (
    <>
      {forecast && (
        <div>
          <h2 className="text-xl text-white font-bold my-3">Hourly forecast</h2>
          <ul className="hourly-scroll flex overflow-x-auto gap-4 pb-2">
            {forecast.list.slice(0, 12).map((item) => {
              const Icon = getWeatherIcon(item.weather[0].main, item.weather[0].icon)

              return (
                <li
                  key={item.dt}
                  className="shrink-0 w-32 p-4 text-center pb-4 bg-white/6 border border-white/12 rounded-2xl shadow-sm"
                >
                  <time dateTime={item.dt_txt} className="block text-sm text-white/60 pb-2">
                    {item.dt_txt.split(' ')[1].slice(0, 5)}
                  </time>
                  <span className="inline-block">
                    <Icon size={24} />
                  </span>
                  <p className="text-white font-extrabold pt-2 text-xl">{formatTemp(item.main.temp)}</p>
                  <p className="text-white/50 text-xs">{item.weather[0].description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
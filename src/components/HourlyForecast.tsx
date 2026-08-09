import type { ForecastSectionProps, WeatherDetails } from "../types/weather"
import { formatTemp, getTimeLabel, buildHourlyForecastDetails } from "../utils"
import { WeatherIcon } from "../icons";
import { useSettings } from "../context/useSettings";

interface HourlyForecastProps extends ForecastSectionProps {
  onSelectDetails: (details: WeatherDetails) => void
}

export default function HourlyForecast({ forecast, onSelectDetails }: HourlyForecastProps) {
  const { tempUnit } = useSettings()

  return (
    <>
      {forecast && (
        <div>
          <h2 className="text-xl text-white font-bold my-3">Hourly forecast</h2>
          <ul className="hourly-scroll flex overflow-x-auto gap-4 pb-2">
            {forecast.list.slice(0, 12).map((item) => (
              <li key={item.dt} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectDetails(buildHourlyForecastDetails(item, forecast.city.name))}
                  className="w-32 p-4 text-center pb-4 bg-white/6 border border-white/12 rounded-2xl shadow-sm outline-none hover:bg-white/9 transition-colors"
                >
                  <time dateTime={item.dt_txt} className="block text-sm text-white/60 pb-2">
                    {getTimeLabel(item.dt_txt)}
                  </time>
                  <WeatherIcon main={item.weather[0].main} icon={item.weather[0].icon} size={24} />
                  <p className="text-white font-extrabold pt-2 text-xl">{formatTemp(item.main.temp, tempUnit)}</p>
                  <p className="text-white/50 text-xs">{item.weather[0].description}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
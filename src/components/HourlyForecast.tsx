import type { ForecastResponse } from "../types/weather"
import { formatTemp } from "../utils/formatTemp"

interface ForecastProps {
  forecast: ForecastResponse | null
}

export default function HourlyForecast({ forecast }: ForecastProps) {
  return (
    <>  
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
              <p>{formatTemp(item.main.temp)}</p>
              <p>{formatTemp(item.main.feels_like)}</p>
              <p>{item.main.humidity}%</p>
              <p>{item.main.pressure} hPa</p>
              <p>{Math.round(item.wind.speed)} m/s</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
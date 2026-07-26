import type { ForecastResponse } from "../types/weather"
import { formatTemp } from "../utils/formatTemp"

interface ForecastProps {
    forecast: ForecastResponse | null
}

type DailyMinMax = {
    min: number;
    max: number
}

export default function Forecast({ forecast }: ForecastProps) {
    const todayDate = forecast?.list[0]?.dt_txt.split(' ')[0]

    const dailyForecast = forecast?.list.filter(item =>
        item.dt_txt.includes('12:00:00') && item.dt_txt.split(' ')[0] !== todayDate
    )

    const dailyMinMax: Record<string, DailyMinMax> = forecast?.list.reduce<Record<string, DailyMinMax>>((acc, item) => {
        const date = item.dt_txt.split(' ')[0];
        const temp = item.main.temp;
        const existing = acc[date]

        acc[date] = existing
            ? {min: Math.min(existing.min, temp), max: Math.max(existing.max, temp) }
            : {min: temp, max: temp}

        return acc;
    }, {}) ?? {}

    return (
        <>
            <br></br>
            <h1>5-day weather forecast</h1>
            {dailyForecast && (
                <ul className="flex">
                {dailyForecast.map((item) => {
                    const date = item.dt_txt.split(' ')[0]
                    const { min, max } = dailyMinMax[date]
                    const minTemp = formatTemp(min)
                    const maxTemp = formatTemp(max)

                    return (
                        <li key={item.dt}>
                            {date}: min: {minTemp}, max: {maxTemp}, 
                            <p>{item.weather[0].main}</p>
                            <p>Humidity: {item.main.humidity}%</p>
                            <p>Pressure: {item.main.pressure} hPa</p>
                            <p>Wind speed: {Math.round(item.wind.speed)} m/s</p>
                        </li>
                    )
                })}
                </ul>
            )}
        </>
    )
}
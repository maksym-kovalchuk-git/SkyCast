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
        <div>
            <h2 className="text-2xl text-slate-800 mb-3">5-day forecast</h2>
            {dailyForecast && (
                <div className="flex justify-between gap-3 overflow-x-auto pb-2">
                {dailyForecast.map((item) => {
                    const date = item.dt_txt.split(' ')[0]
                    const { min, max } = dailyMinMax[date]
                    const minTemp = formatTemp(min)
                    const maxTemp = formatTemp(max)
                    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                    })

                    return (
                        <div
                            key={item.dt}
                            className="shrink-0 w-38 bg-white rounded-xl border border-slate-200 p-4 text-center"
                        >
                            <p className="text-sm text-slate-500">{formattedDate}</p>
                            <p className="text-sm text-slate-700 my-1">{item.weather[0].main}</p>
                            <p className="text-slate-800">
                                {maxTemp} <span className="text-slate-400">/ {minTemp}</span>
                            </p>
                            <p className="text-xs text-slate-400 mt-2">Humidity {item.main.humidity}%</p>
                            <p className="text-xs text-slate-400">Wind {Math.round(item.wind.speed)} m/s</p>
                        </div>
                    )
                })}
                </div>
            )}
        </div>
    )
}
import type { ForecastResponse } from "../types/weather"

interface ForecastProps {
    forecast: ForecastResponse | null
}

export default function Forecast({ forecast }: ForecastProps) {
    const dailyForecast = forecast?.list.filter(item => item.dt_txt.includes('12:00:00'))

    return (
        <>
            <br></br>
            <h1>5-day weather forecast</h1>
            {dailyForecast && (
                <ul>
                {dailyForecast.map((item) => (
                    <li key={item.dt}>
                    {item.dt_txt.slice(0, 10)}: {Math.round(item.main.temp)}°C, {item.weather[0].main}
                    </li>
                ))}
                </ul>
            )}
        </>
    )
}
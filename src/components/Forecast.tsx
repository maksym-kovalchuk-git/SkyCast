import type { ForecastResponse } from "../types/weather"
import { formatTemp } from "../utils/formatTemp"

interface ForecastProps {
    forecast: ForecastResponse | null
}

type DailyMinTemps = Record<string, number>;

export default function Forecast({ forecast }: ForecastProps) {
    const dailyForecast = forecast?.list.filter(item => item.dt_txt.includes('12:00:00'))

    function getDailyMinTemp(): DailyMinTemps {
        if (!forecast) return {}

        return forecast.list.reduce<DailyMinTemps>((acc, item) => {
            const date = item.dt_txt.split(' ')[0];
            const min = item.main.temp;

            acc[date] = date in acc ? Math.min(acc[date], min) : min;
            return acc;
        }, {});
    }

    const dailyMinTemps = getDailyMinTemp()

    return (
        <>
            <br></br>
            <h1>5-day weather forecast</h1>
            {dailyForecast && (
                <ul>
                {dailyForecast.map((item) => (
                    <li key={item.dt}>
                        {item.dt_txt.slice(0, 10)}: min {formatTemp(dailyMinTemps[item.dt_txt.split(' ')[0]])}, {item.weather[0].main}
                    </li>
                ))}
                </ul>
            )}
        </>
    )
}
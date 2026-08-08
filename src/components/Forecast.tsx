import type { ForecastResponse, ForecastSectionProps, WeatherDetails } from "../types/weather"
import { formatTemp, formatWind, getDateKey, buildDailyForecastDetails } from "../utils"
import { WeatherIcon } from "../icons";

interface ForecastProps extends ForecastSectionProps {
  onSelectDetails: (details: WeatherDetails) => void
}

type DailyMinMax = {
  min: number;
  max: number
}

type ConditionInfo = {
  main: string;
  description: string;
  icon: string;
}

type DailyAverages = {
  humidity: number;
  windSpeed: number;
}

function getDailyAverages(list: ForecastResponse['list']): Record<string, DailyAverages> {
  const sums: Record<string, { humidity: number; windSpeed: number; count: number }> = {}

  for (const item of list) {
    const date = getDateKey(item.dt_txt)
    const existing = sums[date] ?? { humidity: 0, windSpeed: 0, count: 0 }

    sums[date] = {
      humidity: existing.humidity + item.main.humidity,
      windSpeed: existing.windSpeed + item.wind.speed,
      count: existing.count + 1,
    }
  }

  const averages: Record<string, DailyAverages> = {}
  for (const date in sums) {
    averages[date] = {
      humidity: sums[date].humidity / sums[date].count,
      windSpeed: sums[date].windSpeed / sums[date].count,
    }
  }

  return averages
}

const conditionPriority: Record<string, number> = {
  Thunderstorm: 7,
  Snow: 6,
  Rain: 5,
  Drizzle: 4,
  Mist: 3,
  Smoke: 3,
  Haze: 3,
  Dust: 3,
  Fog: 3,
  Clouds: 2,
  Clear: 1,
}

function getDailyCondition(list: ForecastResponse['list']): Record<string, ConditionInfo> {
  const counts: Record<string, Record<string, { count: number; icon: string; description: string }>> = {}

  for (const item of list) {
    const date = getDateKey(item.dt_txt)
    const { main, icon, description } = item.weather[0]

    counts[date] = counts[date] ?? {}
    const existing = counts[date][main]

    if (!existing) {
      counts[date][main] = { count: 1, icon, description }
    } else {
      existing.count += 1
      if (existing.icon.endsWith('n') && icon.endsWith('d')) {
        existing.icon = icon
        existing.description = description
      }
    }
  }

  const dominant: Record<string, ConditionInfo> = {}
  for (const date in counts) {
    const [main, info] = Object.entries(counts[date]).sort((a, b) => {
      const countDiff = b[1].count - a[1].count
      if (countDiff !== 0) return countDiff
      return (conditionPriority[b[0]] ?? 0) - (conditionPriority[a[0]] ?? 0)
    })[0]
    dominant[date] = { main, description: info.description, icon: info.icon }
  }

  return dominant
}

export default function Forecast({ forecast, onSelectDetails }: ForecastProps) {
  const todayDate = forecast?.list[0] && getDateKey(forecast.list[0].dt_txt)

  const dailyForecast = forecast?.list.filter(item =>
    item.dt_txt.includes('12:00:00') && getDateKey(item.dt_txt) !== todayDate
  )

  const dailyMinMax: Record<string, DailyMinMax> = forecast?.list.reduce<Record<string, DailyMinMax>>((acc, item) => {
    const date = getDateKey(item.dt_txt);
    const temp = item.main.temp;
    const existing = acc[date]

    acc[date] = existing
      ? {min: Math.min(existing.min, temp), max: Math.max(existing.max, temp) }
      : {min: temp, max: temp}

    return acc;
  }, {}) ?? {}

  const dailyCondition = getDailyCondition(forecast?.list ?? [])
  const dailyAverages = getDailyAverages(forecast?.list ?? [])

  return (
    <div>
      {dailyForecast && (<h2 className="text-xl text-white font-bold my-4 ">Daily forecast</h2>)}
      {dailyForecast && (
        <ul className="flex flex-col divide-y divide-white/12 bg-white/6 rounded-3xl border border-white/12">
          {dailyForecast.map((item) => {
            const date = getDateKey(item.dt_txt)
            const { min, max } = dailyMinMax[date]
            const minTemp = formatTemp(min)
            const maxTemp = formatTemp(max)
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
              weekday: 'short',
            })
            const condition = dailyCondition[date]
            const { humidity, windSpeed } = dailyAverages[date]

            return (
              <li key={item.dt}>
                <button
                  type="button"
                  onClick={() => onSelectDetails(buildDailyForecastDetails(item, {
                    cityName: forecast?.city.name ?? '',
                    maxTemp: max,
                    humidity,
                    windSpeed,
                    conditionMain: condition.main,
                    conditionDescription: condition.description,
                    conditionIcon: condition.icon,
                  }))}
                  className="w-full flex gap-4 items-center pl-6 pr-18 justify-between text-left outline-none hover:bg-white/6 transition-colors"
                >
                  <div className="flex items-center py-4 gap-24">
                    <time dateTime={date} className="text-sm font-bold text-white">{formattedDate}</time>
                    <span className="flex items-center">
                      <WeatherIcon main={condition.main} icon={condition.icon} size={24} />
                      <p className="text-sm text-white/60 font-semibold pl-3">{condition.description}</p>
                    </span>
                  </div>
                  <div className="flex items-center py-4 gap-18">
                    <p className="text-white font-semibold text-sm">
                      {maxTemp} <span className="text-white/40">/ {minTemp}</span>
                    </p>
                    <p className="text-xs text-white/40 font-semibold">Hum {Math.round(humidity)}%</p>
                    <p className="text-xs text-white/40 font-semibold">{formatWind(windSpeed)}</p>
                  </div>
                </button>
              </li>
            )
        })}
        </ul>
      )}
    </div>
  )
}
import type { CurrentWeather } from "../types/weather";
import { formatTemp } from "../utils/formatTemp";

interface WeatherCardProps {
    weather: CurrentWeather | null;
}

export default function WeatherCard({ weather }: WeatherCardProps ) {
    return (
        <>
            {weather &&
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-4xl text-slate-800">{formatTemp(weather.main.temp)}</span>
                            <p className="text-slate-500">
                                Feels like {formatTemp(weather.main.feels_like)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <img
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                alt={weather.weather[0].main}
                                className="w-10 h-10"
                            />
                            <p>{weather.weather[0].main}</p>
                        </div>
                    </div>                    
                    <div className="grid grid-cols-3 gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4 mt-4">
                        <div>
                            <span className="block text-slate-400">Humidity</span>
                            {weather.main.humidity}%
                        </div>
                        <div>
                            <span className="block text-slate-400">Pressure</span>
                            {weather.main.pressure} hPa
                        </div>
                        <div>
                            <span className="block text-slate-400">Wind</span>
                            {Math.round(weather.wind.speed)} m/s
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
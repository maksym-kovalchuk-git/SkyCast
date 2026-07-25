import type { CurrentWeather } from "../types/weather";
import { formatTemp } from "../utils/formatTemp";

interface WeatherCardProps {
    weather: CurrentWeather | null;
}

export default function WeatherCard({ weather }: WeatherCardProps ) {
    return (
        <>
            {weather && 
                <div>
                    <h1>{weather.name} temperature: {formatTemp(weather.main.temp)}</h1>
                    <p>Feels like: {formatTemp(weather.main.feels_like)}</p>
                    <p >{weather.weather[0].main}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Pressure: {weather.main.pressure} hPa</p>
                    <p>Wind speed: {Math.round(weather.wind.speed)} m/s</p>
                </div>
            }
        </>
    )
}
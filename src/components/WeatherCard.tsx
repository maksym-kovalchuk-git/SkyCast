import type { CurrentWeather } from "../types/weather";

interface WeatherCardProps {
    weather: CurrentWeather | null;
}

export default function WeatherCard({ weather }: WeatherCardProps ) {
    return (
        <>
            {weather && 
                <div>
                    <h1>{weather.name} temperature: {Math.round(weather.main.temp)}°C</h1> 
                    <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                    <p >{weather.weather[0].main}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Pressure: {weather.main.pressure} hPa</p>
                    <p>Wind speed: {Math.round(weather.wind.speed)} m/s</p>
                </div>
            }
        </>
    )
}
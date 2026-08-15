import { useCallback, useEffect, useState } from 'react'
import { getCurrentWeather, getCityByCoords, getForecast } from '../api/weather'
import type { CurrentWeather, ForecastResponse, GeoLocation } from '../types/weather'
import { getSavedCity, getSavedCityLocalNames, saveCity, addRecentCity } from '../utils'
import { useTranslation } from '../i18n'

export function useCityWeather() {
  const { t, language } = useTranslation()
  const [weather, setWeather] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const [cityName, setCityName] = useState(() => getSavedCity() ?? 'Kyiv')
  const [cityLocalNames, setCityLocalNames] = useState(() => getSavedCityLocalNames())
  const somethingWrongMessage = t('somethingWrong')
  const displayCityName = cityLocalNames?.[language] ?? weather?.name ?? cityName
  const currentLocation: GeoLocation | null = weather
    ? { name: cityName, local_names: cityLocalNames, lat: weather.coord.lat, lon: weather.coord.lon, country: weather.sys.country }
    : null

  const handleGetWeather = useCallback(async (city: string) => {
    setLoading(true)
    setError(null)
    try {
      const [dataWeather, dataForecast] = await Promise.all([
        getCurrentWeather(city, language),
        getForecast(city, language),
      ])
      setWeather(dataWeather)
      setForecast(dataForecast)
    } catch (e) {
      setError(e instanceof Error ? e.message : somethingWrongMessage)
    } finally {
      setLoading(false)
    }
  }, [language, somethingWrongMessage])

  function handleSelect(loc: GeoLocation) {
    saveCity(loc.name, loc.local_names)
    addRecentCity(loc)
    setCityLocalNames(loc.local_names)
    setCityName(loc.name)
  }

  function handleLocate() {
    if (!navigator.geolocation) {
      setError(t('geolocationUnsupported'))
      return
    }

    setLocating(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const results = await getCityByCoords(position.coords.latitude, position.coords.longitude)
          const loc = results[0]
          if (!loc) {
            setError(t('locationNotFound'))
            return
          }
          handleSelect(loc)
        } catch (e) {
          setError(e instanceof Error ? e.message : somethingWrongMessage)
        } finally {
          setLocating(false)
        }
      },
      () => {
        setError(t('geolocationDenied'))
        setLocating(false)
      },
      { timeout: 10000 },
    )
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch on mount and whenever the selected city or language changes
    handleGetWeather(cityName)
  }, [cityName, handleGetWeather])

  return {
    weather,
    forecast,
    error,
    loading,
    locating,
    displayCityName,
    currentLocation,
    handleSelect,
    handleLocate,
  }
}

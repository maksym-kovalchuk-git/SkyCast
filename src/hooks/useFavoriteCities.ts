import { useState } from 'react'
import type { GeoLocation } from '../types/weather'
import { getFavoriteCities, isFavoriteCity, toggleFavoriteCity } from '../utils'

export function useFavoriteCities() {
  const [favorites, setFavorites] = useState<GeoLocation[]>(() => getFavoriteCities())

  function toggleFavorite(loc: GeoLocation) {
    setFavorites(toggleFavoriteCity(loc))
  }

  function isFavorite(loc: GeoLocation | null): boolean {
    return loc ? isFavoriteCity(loc, favorites) : false
  }

  return { favorites, toggleFavorite, isFavorite }
}

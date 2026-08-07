import { useState, useEffect } from "react"
import { getCitySuggestions } from '../api/weather';
import type { GeoLocation } from '../types/weather'

interface CitySearchProps {
  onSelect: (loc: GeoLocation) => void
}

export default function CitySearch({ onSelect }: CitySearchProps) {
  const [inputSearch, setInputSearch] = useState('')
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([])
  const [suggestionsError, setSuggestionsError] = useState('')

  useEffect(() => {
    if (!inputSearch) {
      setSuggestions([])
      return
    }

    const timeoutId = setTimeout(() => {
      getCitySuggestions(inputSearch)
      .then(setSuggestions)
      .catch((e) => {
        setSuggestionsError(e instanceof Error ? e.message : 'Something went wrong')
        setSuggestions([])
      })
    }, 250)

    return () => clearTimeout(timeoutId)
  }, [inputSearch])

  function handleSelect(loc: GeoLocation) {
    setSuggestions([])
    setInputSearch('')
    onSelect(loc)
  }

  return (
    <div className="relative w-full sm:w-72">
      <div className="relative">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="12px" 
          viewBox="0 -960 960 960" 
          width="12px" 
          fill="currentColor"
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60"
        >
          <path d="M783.52-110.91 529.85-364.59q-29.76 23.05-68.64 36.57-38.88 13.52-83.12 13.52-111.16 0-188.33-77.17-77.17-77.18-77.17-188.33t77.17-188.33q77.17-77.17 188.33-77.17 111.15 0 188.32 77.17 77.18 77.18 77.18 188.33 0 44.48-13.52 83.12-13.53 38.64-36.57 68.16l253.91 254.15-63.89 63.66ZM378.09-405.5q72.84 0 123.67-50.83 50.83-50.82 50.83-123.67t-50.83-123.67q-50.83-50.83-123.67-50.83-72.85 0-123.68 50.83-50.82 50.82-50.82 123.67t50.82 123.67q50.83 50.83 123.68 50.83Z"/>
        </svg>
        <input
          type='text'
          value={inputSearch}
          placeholder="Search city..."
          onChange={(e) => {setInputSearch(e.target.value)}}
          className='h-11 bg-white/6 border border-white/12 rounded-3xl pl-9 pr-3 py-2 w-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20'
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-10">
        {suggestions.map((s) => (
          <li
          key={`${s.lat}-${s.lon}`}
          onClick={() => handleSelect(s)}
          className="px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
          {s.local_names?.en ?? s.name}{s.state ? `, ${s.state}` : ''}, {s.country}
          </li>
        ))}
        </ul>
      )}

      {suggestionsError && <p className="text-sm text-red-600 mt-1">{suggestionsError}</p>}
    </div>
  )
}
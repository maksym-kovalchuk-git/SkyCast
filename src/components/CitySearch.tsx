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
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="currentColor"
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-white"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
        </svg>
        <input
          type='text'
          value={inputSearch}
          placeholder="Enter city"
          onChange={(e) => {setInputSearch(e.target.value)}}
          className='border border-slate-300 rounded-lg pl-9 pr-3 py-2 w-full text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white'
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
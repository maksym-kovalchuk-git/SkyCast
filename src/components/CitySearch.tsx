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
            <input
                type='text'
                value={inputSearch}
                placeholder="Enter city"
                onChange={(e) => {setInputSearch(e.target.value)}}
                className='border border-slate-300 rounded-lg px-3 py-2 w-full text-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-white'
            />
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
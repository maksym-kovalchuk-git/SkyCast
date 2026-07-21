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
        <>
            <input 
                type='text'
                value={inputSearch}
                placeholder="Enter city"
                onChange={(e) => {setInputSearch(e.target.value)}}
                className='border rounded px-3 py-2 w-full'
            />
            {suggestions.length > 0 && (
                <ul>
                {suggestions.map((s) => (
                    <li
                    key={`${s.lat}-${s.lon}`}
                    onClick={() => handleSelect(s)}
                    >
                    {s.local_names?.en ?? s.name}{s.state ? `, ${s.state}` : ''}, {s.country}
                    </li>
                ))}
                </ul>
            )}

            {suggestionsError && <p>{suggestionsError}</p>}
        </>
    )
}
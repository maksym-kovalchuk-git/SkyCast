import { useState, useEffect, forwardRef } from "react"
import { getCitySuggestions } from '../api/weather';
import type { GeoLocation } from '../types/weather'
import { useTranslation } from '../i18n'
import { getRecentCities } from '../utils'

interface CitySearchProps {
  onSelect: (loc: GeoLocation) => void
}

const CitySearch = forwardRef<HTMLInputElement, CitySearchProps>(function CitySearch({ onSelect }, ref) {
  const { t, language } = useTranslation()
  const somethingWrongMessage = t('somethingWrong')
  const [inputSearch, setInputSearch] = useState('')
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([])
  const [suggestionsError, setSuggestionsError] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [focused, setFocused] = useState(false)
  const [recentCities, setRecentCities] = useState<GeoLocation[]>(() => getRecentCities())

  const visibleList = inputSearch ? suggestions : recentCities
  const showingRecent = !inputSearch && recentCities.length > 0

  useEffect(() => {
    setSuggestionsError('')
    setActiveIndex(-1)

    if (!inputSearch) {
      setSuggestions([])
      return
    }

    let ignore = false

    const timeoutId = setTimeout(() => {
      getCitySuggestions(inputSearch)
      .then((data) => {
        if (!ignore) setSuggestions(data)
      })
      .catch((e) => {
        if (!ignore) {
          setSuggestionsError(e instanceof Error ? e.message : somethingWrongMessage)
          setSuggestions([])
        }
      })
    }, 250)

    return () => {
      ignore = true
      clearTimeout(timeoutId)
    }
  }, [inputSearch, somethingWrongMessage])

  function handleSelect(loc: GeoLocation) {
    setSuggestions([])
    setActiveIndex(-1)
    setInputSearch('')
    onSelect(loc)
    setRecentCities(getRecentCities())
    ;(document.activeElement as HTMLElement | null)?.blur()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (visibleList.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % visibleList.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + visibleList.length) % visibleList.length)
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        e.preventDefault()
        handleSelect(visibleList[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setSuggestions([])
      setActiveIndex(-1)
    }
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
          aria-hidden="true"
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/60"
        >
          <path d="M783.52-110.91 529.85-364.59q-29.76 23.05-68.64 36.57-38.88 13.52-83.12 13.52-111.16 0-188.33-77.17-77.17-77.18-77.17-188.33t77.17-188.33q77.17-77.17 188.33-77.17 111.15 0 188.32 77.17 77.18 77.18 77.18 188.33 0 44.48-13.52 83.12-13.53 38.64-36.57 68.16l253.91 254.15-63.89 63.66ZM378.09-405.5q72.84 0 123.67-50.83 50.83-50.82 50.83-123.67t-50.83-123.67q-50.83-50.83-123.67-50.83-72.85 0-123.68 50.83-50.82 50.82-50.82 123.67t50.82 123.67q50.83 50.83 123.68 50.83Z"/>
        </svg>
        <input
          ref={ref}
          type='text'
          value={inputSearch}
          placeholder={t('searchPlaceholder')}
          onChange={(e) => {setInputSearch(e.target.value)}}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setFocused(true)
            setRecentCities(getRecentCities())
          }}
          onBlur={() => setFocused(false)}
          role="combobox"
          aria-expanded={focused && visibleList.length > 0}
          aria-controls="city-suggestions"
          aria-activedescendant={activeIndex >= 0 ? `city-suggestion-${activeIndex}` : undefined}
          className='h-11 bg-white/6 border border-white/12 rounded-3xl pl-9 pr-9 py-2 w-full text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20'
        />
        {!focused && !inputSearch && (
          <kbd
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-white/40 border border-white/15 rounded px-1.5 py-0.5 leading-none"
          >
            /
          </kbd>
        )}
      </div>
      {focused && visibleList.length > 0 && (
        <ul id="city-suggestions" role="listbox" className="absolute top-full left-0 w-full mt-2 bg-white/8 backdrop-blur-md border border-white/12 rounded-2xl shadow-lg overflow-hidden z-10">
        {showingRecent && (
          <li role="presentation" className="px-4 pt-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-white/40">
            {t('recentSearches')}
          </li>
        )}
        {visibleList.map((s, i) => (
          <li key={`${s.lat}-${s.lon}`} role="presentation">
            <button
              id={`city-suggestion-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(s)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`w-full text-left px-4 py-2.5 text-sm outline-none cursor-pointer transition-colors ${
                i === activeIndex ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {s.local_names?.[language] ?? s.name}{s.state ? `, ${s.state}` : ''}, {s.country}
            </button>
          </li>
        ))}
        </ul>
      )}

      {suggestionsError && <p className="text-sm text-red-400 mt-1">{suggestionsError}</p>}
    </div>
  )
})

export default CitySearch

# SkyCast

[![CI](https://github.com/maksym-kovalchuk-git/SkyCast/actions/workflows/ci.yml/badge.svg)](https://github.com/maksym-kovalchuk-git/SkyCast/actions/workflows/ci.yml)

A weather app built with React, TypeScript, and Vite — current conditions, hourly and 5-day forecasts, an interactive map, and a weather-adaptive UI.

🔗 **[Live demo](https://projectsky-cast.vercel.app/)**

## Features

- **Current weather, hourly and 5-day forecast** for any city, with a detailed stats modal (pressure gauge, humidity + dew point, wind speed/direction compass, visibility, precipitation chance, sunrise/sunset)
- **City search** with keyboard navigation (arrow keys, Enter, Escape), a `/` shortcut to focus it, and a "Recent" list when the input is empty
- **Favorite cities** — star a city from the search results or the current weather card, browse them from a side panel
- **Geolocation** — "use my location" button, opt-in only
- **Interactive map** (Leaflet) centered on the selected city
- **Settings**: °C/°F, hPa/mmHg, English/Ukrainian, and a standard/adaptive design mode
- **Adaptive design** — background gradient and particle effects (rain, snow, thunderstorm) that shift with the current weather condition
- Skeleton loading states, a translated error card for offline/city-not-found cases, and full English/Ukrainian localization

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Leaflet](https://react-leaflet.js.org/) for the map
- [Vercel](https://vercel.com/) serverless functions (`/api`) proxying the [OpenWeatherMap](https://openweathermap.org/api) API
- [Vitest](https://vitest.dev/) for unit tests

## Getting started

```bash
npm install
cp .env.example .env   # then fill in OWM_API_KEY
```

Get a free API key at [openweathermap.org/api](https://openweathermap.org/api).

```bash
npm run dev:full   # vercel dev — runs the frontend AND the /api functions
```

`npm run dev` (plain Vite) also works for UI-only changes, but the `/api` routes won't respond without `vercel dev`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server (frontend only) |
| `npm run dev:full` | `vercel dev` — frontend + `/api` serverless functions |
| `npm run build` | Type-check, then production build |
| `npm run lint` | ESLint |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run preview` | Preview a production build locally |

## Project structure

```
api/            Vercel serverless functions (weather, forecast, geocode, reverse-geocode)
src/
  api/          Frontend fetch clients for the routes above
  components/   UI components
  context/      Settings context (units, language, design mode)
  hooks/        useCityWeather, useFavoriteCities
  i18n/         Translations (en/uk) and the useTranslation hook
  icons/        Hand-built SVG icon set (weather conditions, UI icons)
  types/        Shared TypeScript types
  utils/        Formatting, storage, and other pure helpers (unit-tested)
```

## CI

GitHub Actions runs type-checking, linting, and the test suite on every push to `main` and every pull request (see `.github/workflows/ci.yml`).

## Credits

Weather data by [OpenWeatherMap](https://openweathermap.org/).

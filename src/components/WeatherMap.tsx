import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { formatTemp } from '../utils'

const cityMarkerIcon = L.divIcon({
  className: '',
  html: '<div class="city-marker-pin"><span class="city-marker-pin-dot"></span></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
})

interface WeatherMapProps {
  lat: number
  lon: number
  city: string
  weather: string
  temp: number
}

export default function WeatherMap({ lat, lon, city, weather, temp }: WeatherMapProps) {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/12">
      <MapContainer
        key={`${lat}-${lon}`}
        center={[lat, lon]}
        zoom={10}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={[lat, lon]} icon={cityMarkerIcon}>
          <Popup>
            <div className='min-w-28 text-xs '>
              <p className='text-sm font-bold'>{city}</p>
              <p className='pt-0.5 text-white/60'>
                Now: <span className='font-semibold text-white'>{formatTemp(temp)}</span>, {weather}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

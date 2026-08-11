import type { GeoLocation } from '../types/weather'
import { useTranslation } from '../i18n'
import { StarIcon } from '../icons'
import Modal from './Modal'

interface FavoritesPanelProps {
  favorites: GeoLocation[]
  onSelect: (loc: GeoLocation) => void
  onToggleFavorite: (loc: GeoLocation) => void
  onClose: () => void
}

export default function FavoritesPanel({ favorites, onSelect, onToggleFavorite, onClose }: FavoritesPanelProps) {
  const { t, language } = useTranslation()

  return (
      <Modal onClose={onClose} ariaLabel={t('favorites')} position="right">
        <h2 className="text-xl text-white font-bold mb-6">{t('favorites')}</h2>

        {favorites.length === 0 ? (
          <p className="text-white/50 text-sm">{t('noFavorites')}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {favorites.map((loc) => (
              <li key={`${loc.lat}-${loc.lon}`} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelect(loc)
                    onClose()
                  }}
                  className="flex-1 text-left px-4 py-2.5 text-sm text-white/80 bg-white/6 border border-white/12 rounded-2xl outline-none hover:bg-white/10 transition-colors"
                >
                  {loc.local_names?.[language] ?? loc.name}{loc.state ? `, ${loc.state}` : ''}, {loc.country}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleFavorite(loc)}
                  aria-label={t('removeFavorite')}
                  className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-amber-400 outline-none hover:bg-white/10 transition-colors"
                >
                  <StarIcon size={18} filled />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
  )
}

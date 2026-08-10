import { useEffect, useRef, type ReactNode } from 'react'
import { useTranslation } from '../i18n'

interface ModalProps {
  onClose: () => void
  ariaLabel: string
  panelClassName?: string
  children: ReactNode
}

export default function Modal({ onClose, ariaLabel, panelClassName = '', children }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`modal-scroll relative w-full overflow-y-auto bg-white/8 backdrop-blur-2xl border border-white/12 rounded-3xl shadow-2xl p-6 sm:p-8 ${panelClassName}`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t('close')}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white outline-none transition-colors"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="20" y2="20" />
            <line x1="20" y1="4" x2="4" y2="20" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  )
}

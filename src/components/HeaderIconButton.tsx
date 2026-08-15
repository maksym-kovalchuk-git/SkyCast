import type { ReactNode } from 'react'

interface HeaderIconButtonProps {
  onClick: () => void
  ariaLabel: string
  disabled?: boolean
  children: ReactNode
}

export default function HeaderIconButton({ onClick, ariaLabel, disabled, children }: HeaderIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-white/6 border border-white/12 text-white/70 hover:text-white hover:bg-white/10 outline-none transition-colors disabled:opacity-50"
    >
      {children}
    </button>
  )
}

interface StatIconProps {
  size?: number
  className?: string
}

export function DropletIcon({ size = 20, className }: StatIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.1c-3.6 4.7-7 9.2-7 13a7 7 0 0 0 14 0c0-3.8-3.4-8.3-7-13z" />
    </svg>
  )
}

export function VisibilityIcon({ size = 20, className }: StatIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M2 12c1.8-3.6 6-7 10-7s8.2 3.4 10 7c-1.8 3.6-6 7-10 7s-8.2-3.4-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function SunriseIcon({ size = 20, className }: StatIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
      <path d="M7 17a5 5 0 0 1 10 0" />
      <line x1="2" y1="21" x2="22" y2="21" />
      <polyline points="9 8 12 5 15 8" />
      <line x1="12" y1="5" x2="12" y2="10" />
      <line x1="4" y1="14" x2="6" y2="14" />
      <line x1="18" y1="14" x2="20" y2="14" />
    </svg>
  )
}

export function SunsetIcon({ size = 20, className }: StatIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
      <path d="M7 17a5 5 0 0 1 10 0" />
      <line x1="2" y1="21" x2="22" y2="21" />
      <polyline points="9 7 12 10 15 7" />
      <line x1="12" y1="5" x2="12" y2="10" />
      <line x1="4" y1="14" x2="6" y2="14" />
      <line x1="18" y1="14" x2="20" y2="14" />
    </svg>
  )
}

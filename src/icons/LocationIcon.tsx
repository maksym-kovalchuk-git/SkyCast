interface LocationIconProps {
  size?: number
}

export default function LocationIcon({ size = 20 }: LocationIconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="9" r="6" />
      <polygon points="12,21 8,12 16,12" />
    </svg>
  )
}

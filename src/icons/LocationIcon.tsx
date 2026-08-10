import { useId } from 'react'

interface LocationIconProps {
  size?: number
}

export default function LocationIcon({ size = 20 }: LocationIconProps) {
  const maskId = useId()

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24">
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <circle cx="12" cy="9" r="2.3" fill="black" />
      </mask>
      <g fill="currentColor" mask={`url(#${maskId})`}>
        <circle cx="12" cy="9" r="6" />
        <polygon points="12,21 8,12 16,12" />
      </g>
    </svg>
  )
}

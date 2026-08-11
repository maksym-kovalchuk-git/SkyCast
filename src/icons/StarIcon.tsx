interface StarIconProps {
  size?: number
  filled?: boolean
}

const STAR_POINTS = '12,3 14.12,9.09 20.56,9.22 15.42,13.11 17.29,19.28 12,15.6 6.71,19.28 8.58,13.11 3.44,9.22 9.88,9.09'

export default function StarIcon({ size = 20, filled = false }: StarIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <polygon points={STAR_POINTS} />
    </svg>
  )
}

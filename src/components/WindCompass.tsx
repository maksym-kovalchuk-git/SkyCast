interface WindCompassProps {
  deg: number
  size?: number
}

export default function WindCompass({ deg, size = 72 }: WindCompassProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="33" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
      <text x="36" y="13" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">N</text>
      <text x="36" y="66" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">S</text>
      <text x="9" y="39" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">W</text>
      <text x="63" y="39" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">E</text>
      <g transform={`rotate(${deg} 36 36)`}>
        <line x1="36" y1="36" x2="36" y2="14" stroke="#7dd3fc" strokeWidth="3" strokeLinecap="round" />
        <polygon points="36,8 30,20 42,20" fill="#7dd3fc" />
      </g>
      <circle cx="36" cy="36" r="3.5" fill="#2563eb" />
    </svg>
  )
}

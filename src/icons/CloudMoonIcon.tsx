interface IconProps {
  size?: number
}

export default function CloudMoonIcon({ size = 24 }: IconProps) {
  return (
    <div className="cloud-icon" style={{ width: size, height: size }}>
      <span className="inline-block cloud-moon-part"></span>
      <span className="inline-block cloud-part1"></span>
      <span className="inline-block cloud-part2"></span>
      <span className="inline-block cloud-part3"></span>
    </div>
  )
}

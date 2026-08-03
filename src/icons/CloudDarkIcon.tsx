interface IconProps {
  size?: number
}

export default function CloudDarkIcon({ size = 24 }: IconProps) {
  return (
    <div className="cloud-icon" style={{ width: size, height: size }}>
      <span className="inline-block cloud-dark-part1"></span>
      <span className="inline-block cloud-dark-part2"></span>
      <span className="inline-block cloud-dark-part3"></span>
    </div>
  )
}

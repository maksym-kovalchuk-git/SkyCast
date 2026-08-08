interface IconProps {
  size?: number
}

export default function ClearNight({ size = 24 }: IconProps) {
  return (
    <div aria-hidden="true" className="inline-block cloud-icon" style={{ width: size, height: size }}>
      <span className="inline-block cloud-part1"></span>
      <span className="inline-block cloud-part2"></span>
      <span className="inline-block cloud-part3"></span>
    </div>
  )
}
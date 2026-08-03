interface IconProps {
  size?: number
}

export default function MistIcon({ size = 24 }: IconProps) {
  return (
    <div className="mist-icon" style={{ width: size, height: size }}>
      <span className="inline-block mist-part1"></span>
      <span className="inline-block mist-part2"></span>
      <span className="inline-block mist-part3"></span>
    </div>
  )
}
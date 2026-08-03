interface IconProps {
  size?: number
}

export default function ThunderstormIcon({ size = 24 }: IconProps) {
  return (
    <div 
      className="thunderstorm-icon"
      style={{ width: size, height: size }}
    >
      <span className="inline-block thunderstorm-part1"></span>
      <span className="inline-block thunderstorm-part2"></span>
      <span className="inline-block thunderstorm-lightning1"></span>
      <span className="inline-block thunderstorm-part3"></span>
      <span className="inline-block thunderstorm-drop1"></span>
      <span className="inline-block thunderstorm-drop2"></span>
    </div>
  )
}
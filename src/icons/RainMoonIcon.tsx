interface IconProps {
  size?: number
}

export default function RainMoonIcon({ size = 24 }: IconProps) {
  return (
    <div className="rain-icon" style={{ width: size, height: size }}>
      <span className="inline-block rain-moon-part"></span>
      <span className="inline-block rain-part1"></span>
      <span className="inline-block rain-part2"></span>
      <span className="inline-block rain-part3"></span>
      <span className="inline-block rain-drop1"></span>
      <span className="inline-block rain-drop2"></span>
      <span className="inline-block rain-drop3"></span>
    </div>
  )
}

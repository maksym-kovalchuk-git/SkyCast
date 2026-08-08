interface IconProps {
  size?: number
}

export default function SnowIcon({ size = 24 }: IconProps) {
  return (
    <div
      aria-hidden="true"
      className="inline-block snow-icon"
      style={{ width: size, height: size }}
    >
      <span className="inline-block snow-part1"></span>
      <span className="inline-block snow-part2"></span>
      <span className="inline-block snow-part3"></span>
      <div className="snow-drop">
        <span className="inline-block snow-drop1"></span>
        <span className="inline-block snow-drop2"></span>
        <span className="inline-block snow-drop3"></span>
      </div>
    </div>
  )
}
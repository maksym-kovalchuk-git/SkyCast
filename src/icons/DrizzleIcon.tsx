interface IconProps {
  size?: number
}

export default function DrizzleIcon({ size = 24 }: IconProps) {
  return (
    <div
      aria-hidden="true"
      className="inline-block drizzle-icon"
      style={{ width: size, height: size }}
    >
      <span className="inline-block drizzle-part1"></span>
      <span className="inline-block drizzle-part2"></span>
      <span className="inline-block drizzle-part3"></span>
      <span className="inline-block drizzle-drop1"></span>
      <span className="inline-block drizzle-drop2"></span>
      <span className="inline-block drizzle-drop3"></span>
    </div>
  )
}
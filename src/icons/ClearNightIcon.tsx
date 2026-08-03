interface IconProps {
  size?: number
}

export default function ClearNightIcon({ size = 24 }: IconProps) {
  return (
    <div className="sun-night-icon" style={{ width: size, height: size }}>
      <span className=""></span>
    </div>
  )
}
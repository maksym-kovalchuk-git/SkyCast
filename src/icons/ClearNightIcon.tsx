interface IconProps {
  size?: number
}

export default function ClearNightIcon({ size = 24 }: IconProps) {
  return (
    <div aria-hidden="true" className="inline-block sun-night-icon" style={{ width: size, height: size }}>
      <span className=""></span>
    </div>
  )
}
interface IconProps {
  size?: number
}

export default function ClearIcon({ size = 24 }: IconProps) {
  return (
    <span aria-hidden="true" className="inline-block sun-icon" style={{ width: size, height: size }}></span>
  )
}
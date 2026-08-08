export function formatWind(speed: number): string {
  return `${Math.round(speed)} m/s`
}

const WIND_DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

export function getWindDirectionLabel(deg: number): string {
  const steps = WIND_DIRECTIONS.length
  const index = ((Math.round(deg / 45) % steps) + steps) % steps
  return WIND_DIRECTIONS[index]
}

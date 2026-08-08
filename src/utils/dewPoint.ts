export function calcDewPoint(tempC: number, humidityPercent: number): number {
  const a = 17.27
  const b = 237.7
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidityPercent / 100)
  return (b * alpha) / (a - alpha)
}

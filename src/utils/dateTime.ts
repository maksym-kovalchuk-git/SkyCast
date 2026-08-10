export function getDateKey(dtTxt: string): string {
  return dtTxt.split(' ')[0]
}

export function getTimeLabel(dtTxt: string): string {
  return dtTxt.split(' ')[1].slice(0, 5)
}

export function parseForecastDate(dtTxt: string): Date {
  return new Date(`${dtTxt.replace(' ', 'T')}Z`)
}

export function getLocalDateFromUnix(unixSeconds: number, timezoneOffsetSeconds: number): Date {
  return new Date((unixSeconds + timezoneOffsetSeconds) * 1000)
}

export function getDayMonthLabel(date: Date, locale: string): string {
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = date.toLocaleDateString(locale, { month: 'long', timeZone: 'UTC' })
  return `${day}-${month}`
}

export function getWeekdayLabel(date: Date, locale: string): string {
  return date.toLocaleDateString(locale, { weekday: 'long', timeZone: 'UTC' })
}

export function getHourLabel(date: Date): string {
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

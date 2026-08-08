export function getDateKey(dtTxt: string): string {
  return dtTxt.split(' ')[0]
}

export function getTimeLabel(dtTxt: string): string {
  return dtTxt.split(' ')[1].slice(0, 5)
}

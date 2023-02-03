export const useCurrencyView = (value: any): string | null => {
  if (!value) return null
  let valueSplit = value.split('')
  if (parseInt(valueSplit[0]) === 0) return value

  if (!parseInt(value)) return null

  let view = ''
  value = parseInt(value.replaceAll(',', ''), 10)
  let valueRev = value.toString().split('').reverse().join('')
  for (let i = 0; i < valueRev.length; i++) if (i % 3 === 0) view += valueRev.substr(i, 3) + ','
  return view
    .split('', view.length - 1)
    .reverse()
    .join('')
}


export function normizeCount (num) {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e4, symbol: '万' }
    // { value: 1e6, symbol: 'M' },
    // { value: 1e9, symbol: 'G' },
    // { value: 1e12, symbol: 'T' },
    // { value: 1e15, symbol: 'P' },
    // { value: 1e18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(2).replace(rx, '$1') + si[i].symbol
}
function _pad (num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
export function format (interval) {
  interval = interval | 0
  const minute = (interval / 60) | 0
  const second = _pad(interval % 60)
  return `${minute}:${second}`
}

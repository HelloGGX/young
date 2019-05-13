
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

export function downloadFile (sUrl) {
  // iOS devices do not support downloading. We have to inform user about this.
  // if (/(iP)/g.test(navigator.userAgent)) {
  //   alert('Your device does not support files downloading. Please try again in desktop browser.')
  //   return false
  // }

  // If in Chrome or Safari - download via virtual link click
  if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
    // Creating new link node.
    var link = document.createElement('a')
    link.href = sUrl

    if (link.download !== undefined) {
      // Set HTML5 download attribute. This will prevent file from opening if supported.
      var fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length)
      link.download = fileName
    }

    // Dispatching click event.
    if (document.createEvent) {
      var e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }

  // Force file download (whether supported by server).
  if (sUrl.indexOf('?') === -1) {
    sUrl += '?download'
  }

  window.open(sUrl, '_self')
  return true
}

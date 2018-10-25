export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, className) {
  debugger
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)

  el.className = newClass.join(' ')
}
export function removeClass (el, cName) {
  if (hasClass(el, cName)) {
    el.className = el.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ')
  }
}

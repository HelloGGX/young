import { Dialog } from './module'
import { processComponentName } from 'common/js/utils'

const components = [
  // popup
  Dialog
]

function install (Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  components.forEach((Component) => {
    // ignore radio
    // if (Component === Radio) {
    //   return
    // }
    Component.install(Vue)
  })
}

const apiComponents = {
  /* eslint-disable no-undef */
  install
}

components.forEach((Component) => {
  const name = processComponentName(Component, {
    firstUpperCase: true
  })
  apiComponents[name] = Component
})
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default apiComponents

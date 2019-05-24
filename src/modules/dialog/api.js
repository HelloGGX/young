import createAPI from 'common/js/create-api'

export default function addDialog (Vue, Dialog) {
  createAPI(Vue, Dialog, ['confirm', 'cancel', 'toggle', 'close', 'click'], true)
}

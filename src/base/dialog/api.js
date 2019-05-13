import createAPI from 'common/js/create-api'
import Dialog from './dialog.vue'
import Vue from 'vue'

export default function addDialog () {
  createAPI(Vue, Dialog, ['confirm', 'cancel', 'toggle', 'close'], true)
}

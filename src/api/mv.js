
import { HTTP } from 'utils/request'
import { commonParamsMv, options } from './config'

export class MvModel extends HTTP {
  getMv ({ word = '', page = 1 } = {}) {
    let emptyObj = Object.create(null)
    const url = '/music/api/mv/'
    const data = Object.assign(emptyObj, commonParamsMv, {
      page: page,
      type: 'so',
      word: word
    })
    return this.get(url, data, options)
  }
}

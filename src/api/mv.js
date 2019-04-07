import { HTTP } from 'utils/request'
import { commonParams } from './config'

export class MvModel extends HTTP {
  getSearch ({ id = '', page = 1 } = {}) {
    let emptyObj = Object.create(null)
    const url = '/music/api/mv'
    const data = Object.assign(emptyObj, commonParams, {
      mv: 'qq',
      page: page,
      type: 'so',
      id: id
    })
    return this.get(url, data)
  }
}

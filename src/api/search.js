import { HTTP } from 'utils/request'
import { commonParams } from './config'

export class SearchModel extends HTTP {
  getSearch ({ nu = 20, id = '', page = 1, cache = 0 } = {}) {
    let emptyObj = Object.create(null)
    const url = '/music/api/'
    const data = Object.assign(emptyObj, commonParams, {
      cache: cache,
      page: page,
      type: 'so',
      nu: nu,
      id: id
    })
    console.log(data)
    return this.get(url, data)
  }
}

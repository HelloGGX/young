import { HTTP } from 'utils/request'
import { commonParams } from './config'

class SongModel extends HTTP {
  getLyric (opt) {
    let emptyObj = Object.create(null)
    const url = '/music/api/'
    const data = Object.assign(emptyObj, commonParams, {
      type: 'lrc',
      id: opt.id
    })
    return this.get(url, data)
  }
  getSongUrl (opt) {
    let emptyObj = Object.create(null)
    const url = '/music/api/'
    const data = Object.assign(emptyObj, commonParams, {
      type: 'song',
      id: opt.id
    })
    return this.get(url, data)
  }
}
export { SongModel }

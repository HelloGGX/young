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
  getSongAllUrl (opt) {
    let emptyObj = Object.create(null)
    const url = '/music/api/'
    emptyObj['mp3'] = Object.assign({}, commonParams, {
      type: 'song',
      id: opt.id,
      size: 'mp3',
      cache: 0
    })
    emptyObj['hq'] = Object.assign({}, commonParams, {
      type: 'song',
      id: opt.id,
      cache: 0
    })
    emptyObj['ape'] = Object.assign({}, commonParams, {
      type: 'song',
      id: opt.id,
      size: 'ape',
      cache: 0
    })
    emptyObj['flac'] = Object.assign({}, commonParams, {
      type: 'song',
      id: opt.id,
      size: 'flac',
      cache: 0
    })
    console.log(emptyObj)
    return this.getAll(url, emptyObj)
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

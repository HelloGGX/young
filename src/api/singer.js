import jsonp from 'common/js/jsonp'
import { HTTP } from 'utils/request'
import { qqcommonParams, options } from './config'
class SingerModel extends HTTP {
  getSingerList () {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, qqcommonParams, {
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq'
    })

    return jsonp(url, data, options)
  }
  getSingerDetail (singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, qqcommonParams, {
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 80,
      songstatus: 1,
      singermid: singerId
    })

    return jsonp(url, data, options)
  }
}
export { SingerModel }

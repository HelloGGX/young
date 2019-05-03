import jsonp from 'common/js/jsonp'
import { HTTP } from 'utils/request'
import { qqcommonParams, options } from './config'

class RankModel extends HTTP {
  getRankList () {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    const data = Object.assign({}, qqcommonParams, {
      needNewCode: 1,
      uin: 0,
      platform: 'h5'
    })

    return jsonp(url, data, options)
  }
  getRankDetail (topid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    const data = Object.assign({}, qqcommonParams, {
      topid,
      page: 'detail',
      type: 'top',
      tpl: 3,
      platform: 'h5',
      needNewcode: 1
    })

    return jsonp(url, data, options)
  }
}
export { RankModel }

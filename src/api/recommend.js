import request from 'utils/request'
import jsonp from 'common/js/jsonp'
import { commonParams, options, qqcommonParams } from './config'

export default {

  // 推荐页数据
  getRecommend () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, qqcommonParams, {
      platform: 'h5',
      uin: 0,
      needNewCode: 1
    })

    return jsonp(url, data, options)
  },
  // 歌单详情数据
  getSongList (opt) {
    let emptyObj = Object.create(null)
    const url = '/music/api/'
    const data = Object.assign(emptyObj, commonParams, {
      type: 'songlist',
      id: opt.id
    })
    return request.get(url, data)
  }
}

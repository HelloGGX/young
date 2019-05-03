
import { normizeCount } from 'common/js/utils'

export function createRank (data) { // 对数据进行一层封装转化，good
  return {
    desc: normizeCount(data.listennum),
    author: data.ListName,
    picUrl: data.pic_album
  }
}

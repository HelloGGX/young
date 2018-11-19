import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getRecommend (data) {
  const url = 'https://wis.qq.com/weather/common'
  let emptyObj = Object.create(null)
  let resultData = Object.assign(emptyObj, commonParams, data)
  return jsonp(url, resultData, options)
}

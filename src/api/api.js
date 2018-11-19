import request from 'utils/request'

export default {
  // 查询所有首页数据
  getWeatherData (data) {
    return request.get(data)
  }
}

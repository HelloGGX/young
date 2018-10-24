import request from 'utils/request'

export default {
  // 查询所有首页数据
  getIndexData (data) {
    return request.get('getIndex.php', data)
  }
}

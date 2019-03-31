import { playMode } from 'common/js/config'

const state = {// 状态管理
  isLoading: false,
  netWork: true, // 默认有网
  loginSucess: false, // 登录状态
  musicList: [], // 推荐歌单信息
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  topList: {}
}

export default state

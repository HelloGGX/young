import { playMode } from 'common/js/config'

const state = {// 状态管理
  isLoading: false,
  netWork: true, // 默认有网
  loginSucess: false, // 登录状态
  musicList: [], // 推荐歌单信息
  singer: {}, // 选择的歌手
  rank: {}, // 排行
  playing: false,
  fullScreen: false,
  mvFullScreen: false, // mv全屏
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  topList: {}
}

export default state

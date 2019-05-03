import types from './mutation-types'

const mutations = {
  [types.SET_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  },
  [types.SET_NETWORK] (state, netWork) {
    state.netWork = netWork
  },
  [types.SET_LOGINSUCESS] (state, loginSucess) {
    state.loginSucess = loginSucess
  },
  [types.SET_MUSICLIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [types.SET_MV_FULL_SCREEN] (state, flag) {
    state.mvFullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_RANK] (state, rank) {
    state.rank = rank
  }
}

export default mutations

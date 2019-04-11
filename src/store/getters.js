// export const singer = state => state.singer
const getters = {
  isLoading: state => state.isLoading,
  netWork: state => state.netWork,
  loginSucess: state => state.loginSucess,
  musicList: state => state.musicList,
  singer: state => state.singer,
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  mvFullScreen: state => state.mvFullScreen,
  playlist: state => state.playlist,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong: (state) => {
    return state.playlist[state.currentIndex] || {}
  }
}
export default getters

import types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'lodash'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.mid === song.mid
  })
}
const actions = {
  selectPlay: function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, false)
    commit(types.SET_PLAYING_STATE, true)
  }
}
export default actions

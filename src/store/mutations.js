import * as types from './mutation-types'

const mutations = {
  [types.SET_LOADING] (state, payload) {
    state.isLoading = payload.isLoading
  },
  [types.SET_NETWORK] (state, netWork) {
    state.netWork = netWork
  }
}

export default mutations

import * as types from './mutation-types'

const mutations = {
  [types.SET_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  },
  [types.SET_NETWORK] (state, netWork) {
    state.netWork = netWork
  },
  [types.SET_LOGINSUCESS] (state, loginSucess) {
    state.loginSucess = loginSucess
  }
}

export default mutations

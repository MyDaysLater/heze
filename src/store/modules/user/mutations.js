import * as types from './mutation_type'
const mutations = {
  [types.SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  }
}
export default mutations

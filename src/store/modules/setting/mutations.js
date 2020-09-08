import * as types from './mutation_type'

const mutations = {
  [types.SET_THEME]  (state, val) {
    state.theme = val
  },
  [types.SET_COLOR] (state, val) {
    state.color = val
  },
  [types.SET_LAYOUT_MODE] (state, val) {
    state.layoutMode = val
  },
  [types.SET_SIDE_FIXED] (state, val) {
    state.sideFixed = val
  },
  [types.SET_HEADER_FIXED] (state, val) {
    state.headerFixed = val
  }
}
export default mutations

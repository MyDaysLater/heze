export default {
  state: {
    menu: []
  },
  getters: {
    menuList: state => state.menu
  },
  mutations: {
    SETMENU: (state, menu) => {
      state.menu = menu
    }
  }
}

export default {
  state: {
    addRoutes: []
  },
  getters: {
    asyncRoutes: state => state.addRoutes
  },
  mutations: {
    SETROUTES: (state, route) => {
      state.addRoutes = route
    }
  }
}

export default {
  state: {
    cancelTokenArr: []
  },
  mutations: {
    pushToken (state, payload) {
      state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken ({ cancelTokenArr }) {
      cancelTokenArr.forEach(item => {
        item('路由跳转取消请求')
      })
      cancelTokenArr = []
    }
  }
}

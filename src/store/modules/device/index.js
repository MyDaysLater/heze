export default {
  state: {
    deviceType: ''
  },
  getters: {
    getDeviceType: state => state.deviceType
  },
  mutations: {
    SET_DEVICE (state, device) {
      state.deviceType = device
    }
  }
}

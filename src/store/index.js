import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import setting from './modules/setting'
import menu from './modules/menu'
import route from './modules/route'
import device from './modules/device'
import api from './modules/api'
import logger from 'vuex/dist/logger'
Vue.use(Vuex)
var debug = process.env.NODE_ENV === 'production'
export default new Vuex.Store({
  modules: {
    user,
    setting,
    menu,
    route,
    device,
    api
  },
  plugins: debug ? [] : [logger()]
})

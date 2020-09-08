import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
// import './mock'
import api from './api'
import '@/interceptor'
import baseURL from '@/config/urlConfig'
Vue.use(Antd)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.baseURL = baseURL
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

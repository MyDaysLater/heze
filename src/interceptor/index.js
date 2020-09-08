import router from '@/router'
import store from '@/store'
import $api from '@/api'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Cookie from 'js-cookie'
import GenerateRoutes from './permission'
import { generatorDynamicMenu } from './menu'
const whiteList = ['login']
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  nprogress.start()
  store.commit('clearToken')
  const token = Cookie.get('token')
  if (token) {
    const userInfo = store.getters.getUserInfo
    if (!Object.keys(userInfo).length) {
      $api.getInfo().then((res) => {
        store.commit('SET_USER_INFO', res)
        const routerMap = GenerateRoutes(res)
        router.addRoutes(store.getters.asyncRoutes)
        const menu = generatorDynamicMenu(routerMap[0].children)
        store.commit('SETMENU', menu)
        next({ path: to.path })
      }, () => {
        nprogress.done()
        Cookie.remove('token')
        next({
          path: '/user/login'
        })
      })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({
        path: '/user/login'
      })
    }
  }
})
router.afterEach(() => {
  nprogress.done() // finish progress bar
})

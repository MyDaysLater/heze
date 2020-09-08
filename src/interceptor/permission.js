import { asyncRouterMap } from '@/config/routerConfig'
import store from '@/store'
/**
 * 过滤账户是否拥有某一个权限
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
const hasPermission = (permission, route) => {
  if (route.meta && route.meta.permission) {
    for (let i = 0; i < permission.length; i++) {
      if (route.meta.permission.includes(permission[i])) {
        return true
      }
    }
    return false
  }
  return true
}

const filterAsyncRouter = (routeMap, role) => {
  const accessedRouters = routeMap.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
export default (data) => {
  // const { resources } = data
  // const roles = resources.split(',')
  const roles = []
  const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
  accessedRouters.push({
    path: '*',
    redirect: '/404'
  })
  store.commit('SETROUTES', accessedRouters)
  return accessedRouters
}

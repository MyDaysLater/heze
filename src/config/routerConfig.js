const baseRouter = [
  {
    path: '/user',
    redirect: '/user/login',
    component: () => import('@/layout/loginLayout.vue'),
    children: [
      {
        path: '/user/login',
        name: 'login',
        meta: { title: '河南社保后台管理' },
        component: () => import('@/views/user/login.vue')
      }
    ]
  },
  {
    path: '/404',
    meta: { title: '404' },
    component: () => import('@/views/exception/404.vue')
  }
]
const asyncRouterMap = [
  {
    path: '/',
    redirect: '/workspace/mainBoard',
    component: () => import('@/layout/basicLayout'),
    children: [
      {
        path: '/workspace/mainBoard',
        meta: { title: '首页', icon: 'home', hiddenHeaderContent: false },
        component: () => import('@/views/mainBoard/mainBoard')
      },
      {
        path: '/workspace/cardPrintingRecord',
        meta: { title: '制卡记录', icon: 'file-search', hiddenHeaderContent: false },
        component: () => import('@/views/cardPrintingRecord/cardPrintingRecord')
      },
      {
        path: '/workspace/bankClassification',
        meta: { title: '银行分类', icon: 'container', hiddenHeaderContent: false },
        component: () => import('@/views/bankClassification/bankClassification')
      },
      {
        path: '/workspace/clientManagement',
        meta: { title: '终端管理', icon: 'desktop', hiddenHeaderContent: false },
        component: () => import('@/views/clientManagement/clientManagement')
      },
      {
        path: '/workspace/userManagement',
        meta: { title: '用户管理', icon: 'user', hiddenHeaderContent: false },
        component: () => import('@/views/userManagement/userManagement')
      }
    ]
  }
]
export {
  baseRouter,
  asyncRouterMap
}

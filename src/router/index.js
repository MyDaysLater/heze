import Vue from 'vue'
import VueRouter from 'vue-router'
import { baseRouter } from '@/config/routerConfig'
Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: baseRouter
})

export default router

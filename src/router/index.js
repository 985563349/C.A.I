import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRoutes } from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  routes: constantRoutes
})

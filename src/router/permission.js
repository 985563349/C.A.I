import router from './index'
import store from '@/store'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({
  showSpinner: false
})

const writeRoutes = ['/sign-in']

router.beforeEach(async (to, from, next) => {
  nprogress.start()

  const { token, roleRoutes } = store.getters

  if (token) {
    if (to.path === '/sign-in') {
      next({ path: '/home' })
    } else {
      const hasRoutes = roleRoutes?.length > 0
      if (hasRoutes) {
        next()
      } else {
        try {
          // 请求用户信息
          const userInfo = await store.dispatch('user/getUserInfo')
          // 生成路由
          const roleRoutes = await store.dispatch('user/generateRoutes', userInfo)
          // 动态挂载路由
          router.addRoutes(roleRoutes)
          // 跳转
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
        }
      }
    }
  } else {
    if (writeRoutes.includes(to.path)) {
      next()
    } else {
      next({ path: '/sign-in' })
    }
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

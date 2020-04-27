import router from './index'
import store from '@/store'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

nprogress.configure({
  showSpinner: false
})

const writeRoutes = ['/sign-in']

router.beforeEach((to, from, next) => {
  nprogress.start()

  if (store.getters['user/token']) {
    if (to.path === '/sign-in') {
      next({ path: '/home' })
    } else {
      next()
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

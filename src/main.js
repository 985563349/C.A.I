import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import App from './App.vue'
import '@/assets/styles/index.scss'

import '@/router/permission'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/components'
import '@/icons'

Vue.config.productionTip = false

Vue.use(ElementUI)

// const isDev = process.env.NODE_ENV === 'development'

const { mockXHR } = require('../mock')
mockXHR()

// if (isDev) {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

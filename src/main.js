import Vue from 'vue'
import router from '@/router'
import store from '@/store'

import App from './App.vue'
import '@/assets/styles/index.scss'

import '@/router/permission'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

const ENV = process.env.NODE_ENV

if (ENV !== 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

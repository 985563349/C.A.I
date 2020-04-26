import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import user from './modules/user'

Vue.use(Vuex)

const ENV = process.env.NODE_ENV

export default new Vuex.Store({
  modules: {
    user
  },
  plugins: ENV !== 'production' ? [createLogger()] : []
})

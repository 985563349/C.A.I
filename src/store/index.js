import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const ENV = process.env.NODE_ENV

export default new Vuex.Store({
  state: {
    token: ''
  },
  plugins: ENV !== 'production' ? [createLogger()] : []
})

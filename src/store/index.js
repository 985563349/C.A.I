import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

import createPersistedState from 'vuex-persistedstate'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const isDEV = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  modules: {
    app,
    user
  },
  plugins: [
    createPersistedState()
  ]
    .concat(isDEV ? [createLogger()] : [])
})

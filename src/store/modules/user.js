import { signIn } from '@/api/modules/user'

const user = {
  namespaced: true,
  state: {
    token: ''
  },
  getters: {
    token: state => state.token
  },
  mutations: {
    SET_TOKEN: (state, token) => (state.token = token)
  },
  actions: {
    async signIn ({ commit }, userData) {
      const data = await signIn(userData)
      commit('SET_TOKEN', data.token)
      return data
    }
  }
}

export default user

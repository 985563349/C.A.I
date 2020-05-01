import { signIn, getUserInfo } from '@/api/modules/user'
import { generateMenuListByRole } from '@/store/tool'
import routes from '@/router/routes'

const user = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    userRoutes: []
  },
  mutations: {
    SET_TOKEN: (state, token) => (state.token = token),
    SET_USER_INFO: (state, userInfo) => (state.userInfo = userInfo)
  },
  actions: {
    signIn: async ({ commit }, userData) => {
      const data = await signIn(userData)
      commit('SET_TOKEN', data.token)
      return data
    },
    getUserInfo: async ({ commit }) => {
      try {
        const userInfo = await getUserInfo()
        commit('SET_USER_INFO', userInfo)
        return userInfo
      } catch (error) {
        Promise.reject(error)
      }
    },
    generateRoutes: ({ commit }, userInfo) => {
      // const { role } = userInfo
      // generateRoutesByRole(routes, role)
      return routes
    },
    generateMenuList: ({ dispatch }, routes) => {
      const menuList = generateMenuListByRole(routes)
      // 提交至app模块
      console.log(menuList)
      dispatch('app/setMenuList', menuList, { root: true })
    }
  }
}

export default user

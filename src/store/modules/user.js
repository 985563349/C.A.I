import { signIn, getUserInfo } from '@/api/modules/user'
import { generateRoutesByRole, generateMenuList } from '@/store/tool'
import { constantRoutes, asyncRoutes } from '@/router/routes'

const user = {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    roleRoutes: []
  },
  mutations: {
    SET_TOKEN: (state, token) => (state.token = token),
    SET_USER_INFO: (state, userInfo) => (state.userInfo = userInfo),
    SET_ROLE_ROUTES: (state, roleRoutes) => (state.roleRoutes = roleRoutes)
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
    generateRoutes: ({ commit, dispatch }, userInfo) => {
      const { role } = userInfo
      // 生成可访问路由
      const accessedRoutes = constantRoutes.concat(generateRoutesByRole(asyncRoutes, role))
      commit('SET_ROLE_ROUTES', accessedRoutes)
      // 生成菜单列表
      dispatch('generateMenuList', accessedRoutes)
      return accessedRoutes
    },
    generateMenuList: ({ dispatch }, routes) => {
      const menuList = generateMenuList(routes)
      // 提交至app模块
      dispatch('app/setMenuList', menuList, { root: true })
    }
  }
}

export default user

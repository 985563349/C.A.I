const app = {
  namespaced: true,
  state: {
    isCollapse: false,
    menuList: []
  },
  mutations: {
    SET_IS_COLLAPSE: (state, status) => (state.isCollapse = status),
    SET_MENU_LIST: (state, menuList) => (state.menuList = menuList)
  },
  actions: {
    setIsCollapse: ({ commit }, status) => {
      commit('SET_IS_COLLAPSE', status)
    },
    setMenuList: ({ commit }, menuList) => {
      commit('SET_MENU_LIST', menuList)
    }
  }
}

export default app

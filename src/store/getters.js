const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  routes: state => state.user.routes,
  isCollapse: state => state.app.isCollapse,
  menuList: state => state.app.menuList
}

export default getters

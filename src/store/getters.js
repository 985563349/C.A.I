const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roleRoutes: state => state.user.roleRoutes,
  isCollapse: state => state.app.isCollapse,
  menuList: state => state.app.menuList
}

export default getters

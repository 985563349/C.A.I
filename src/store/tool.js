import path from 'path'

class MenuItem {
  constructor ({ path, title, icon, children }) {
    this.path = path
    this.title = title
    this.icon = icon
    this.children = children
  }
}

const resolvePath = path.join

export const generateRoutesByRole = (routes, role) => {}

export const generateRoutesByLimit = (routes, limit) => {}

export const generateMenuListByRole = routes => {
  const res = []

  const loop = (routeList, basePath, prev) => {
    routeList.forEach(route => {
      if (route.hidden) {
        return
      }

      const foo = new MenuItem(route)
      const children = route.children

      if (children?.length > 0) {
        // 路由晋升，当前路由下只有一个子路由，自动晋升为根路由
        if (children.length === 1) {
          const rootRoute = children[0]
          const path = resolvePath(basePath, foo.path, rootRoute.path)
          Object.assign(foo, { ...rootRoute, path })
          Reflect.deleteProperty(foo, 'children')
        } else {
          foo.children = []
          loop(children, route.path, foo.children)
        }
      } else {
        foo.path = resolvePath(basePath, foo.path)
        Reflect.deleteProperty(foo, 'children')
      }

      prev.push(foo)
    })
  }

  loop(routes, '', res)
  return res
}
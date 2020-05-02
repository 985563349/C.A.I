import path from 'path'
// import { deepClone } from '@/assets/utils/tool'

class MenuItem {
  constructor ({ path, title, icon, children }) {
    this.path = path
    this.title = title
    this.icon = icon
    this.children = children
  }
}

const resolvePath = path.join

export const generateRoutesByRole = (routes, role) => {
  // 超级管理员可访问所有路由
  if (role === 'admin') {
    return routes
  }

  const loop = routeList => {
    return routeList.reduce((prev, route) => {
      if (route?.meta?.roles && !route?.meta?.roles.includes(role)) {
        return prev
      }

      if (route.children) {
        route.children = loop(route.children)
        route.children.length > 0 && prev.push(route)
      } else {
        prev.push(route)
      }
      return prev
    }, [])
  }

  return loop(routes)
}

export const generateRoutesByLimit = (routes, limit) => {}

export const generateMenuList = routes => {
  const loop = (routeList, basePath) => {
    return routeList.reduce((prev, route) => {
      if (route.hidden) {
        return prev
      }

      const menuItem = new MenuItem(route)
      menuItem.path = resolvePath(basePath, menuItem.path)
      const children = menuItem.children

      if (children?.length > 0) {
        menuItem.children = loop(children, menuItem.path)
        // 处理路由晋升
        if (!route.alwaysShow && children.length === 1) {
          const rootMenuItem = children[0]
          Object.assign(menuItem, rootMenuItem, { path: resolvePath(basePath, menuItem.path, rootMenuItem.path) })
          Reflect.deleteProperty(menuItem, 'children')
        }
      } else {
        Reflect.deleteProperty(menuItem, 'children')
      }

      prev.push(menuItem)

      return prev
    }, [])
  }

  return loop(routes, '')
}

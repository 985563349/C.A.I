import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/sign-in',
    component: () => import('@/pages/sign'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/pages/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/pages/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        title: '首页',
        icon: 'dashboard-fill',
        component: () => import('@/pages/home')
      }
    ]
  },
  {
    path: '/profile',
    redirect: '/profile/index',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/pages/profile')
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/component',
    component: Layout,
    title: '组件',
    icon: 'appstore-fill',
    children: [
      {
        path: 'table',
        title: '综合table',
        component: () => import('@/pages/components/table')
      },
      {
        path: 'tree-transfer',
        title: '树形穿梭框',
        component: () => import('@/pages/components/tree-transfer')
      },
      {
        path: 'performance',
        title: '性能分析',
        component: () => import('@/pages/components/performance')
      }
    ]
  },
  {
    path: '/position',
    component: Layout,
    children: [
      {
        path: 'index',
        title: '地理定位',
        icon: 'location-fill',
        component: () => import('@/pages/position')
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    title: '权限测试页',
    icon: 'lock-fill',
    children: [
      {
        path: 'page',
        title: '页面权限',
        component: () => import('@/pages/permission/page'),
        meta: {
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        title: '指令权限',
        component: () => import('@/pages/permission/directive')
      },
      {
        path: 'role',
        title: '角色权限',
        component: () => import('@/pages/permission/role')
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    title: '嵌套路由',
    icon: 'align-right',
    children: [
      {
        path: 'menu1',
        title: '菜单1',
        children: [
          {
            path: 'menu1-1',
            title: '菜单1-1'
          },
          {
            path: 'menu1-2',
            title: '菜单1-2',
            alwaysShow: true,
            children: [
              {
                path: 'menu1-2-1',
                title: '菜单1-2-1'
              }
            ]
          },
          {
            path: 'menu1-3',
            title: '菜单1-3'
          }
        ]
      },
      {
        path: 'menu2',
        title: '菜单2'
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    title: '错误页面',
    icon: 'error-fill',
    children: [
      {
        path: '404',
        title: '404',
        component: () => import('@/pages/error-page/404')
      },
      {
        path: '401',
        title: '401',
        component: () => import('@/pages/error-page/401')
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    title: '系统管理',
    icon: 'setting-fill',
    alwaysShow: true,
    children: [
      {
        path: 'menu-manage',
        title: '菜单管理',
        component: () => import('@/pages/system/menu-manage')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

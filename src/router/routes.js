import Layout from '@/layout'

const routes = [
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
            children: [
              {
                path: 'menu1-2-1',
                title: '菜单1-2-1'
              },
              {
                path: 'menu1-2-2',
                title: '菜单1-2-2'
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
  }
]

export default routes

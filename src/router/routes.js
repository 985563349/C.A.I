import Layout from '@/layout'
import Sign from '@/pages/sign'
import Home from '@/pages/home'

const routes = [
  {
    path: '/sign-in',
    component: Sign
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      }
    ]
  }
]

export default routes

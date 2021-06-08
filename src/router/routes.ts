import { RouteRecordRaw } from 'vue-router';
import Layout from '../layout/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('../pages/welcome.vue'),
      },
    ],
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    children: [
      {
        path: 'index',
        component: () => import('../pages/table.vue'),
      },
    ],
  },
  {
    path: '/sign-in',
    component: () => import('../pages/sign-in.vue'),
  },
];

export default routes;

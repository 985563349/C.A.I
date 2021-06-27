import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/welcome.vue'),
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
        component: () => import('@/views/table.vue'),
      },
    ],
  },
  {
    path: '/sign-in',
    component: () => import('@/views/sign-in.vue'),
  },
];

export default routes;

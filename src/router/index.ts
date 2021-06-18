import { createWebHistory, createRouter } from 'vue-router';
import routes from '@/router/routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

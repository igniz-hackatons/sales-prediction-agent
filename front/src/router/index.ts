import { createRouter, createWebHistory } from 'vue-router';

import IndexPage from '@/routes/IndexPage.vue';

const routes = [
  {
    path: '/',
    component: IndexPage

  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

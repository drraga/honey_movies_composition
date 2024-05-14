import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import FilmsView from '@/views/FilmsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/films/top/',
      redirect: '/',
    },
    {
      path: '/films/:category/:id',
      name: 'FilmsView',
      component: FilmsView,
    },
    {
      path: '/films/:id/',
      component: () => import('@/views/MoviePageSingle.vue'),
    },
    {
      path: '/films/search/:id',
      component: () => import('@/views/SearchResults.vue'),
    },
    {
      path: '/films/genres/:id',
      component: () => import('@/views/GenresSelected.vue'),
    },
    {
      path: '/films/countries/:id',
      component: () => import('@/views/CountriesSelected.vue'),
    },
  ],
});

export default router;

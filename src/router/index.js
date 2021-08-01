import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/album',
    name: 'Album View',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "albumView" */ '../views/AlbumView.vue'),
  },
  {
    path: '/login',
    name: 'Login View',
    component: () => import(/* webpackChunkName: "loginView" */ '../views/LoginView.vue'),
  },
  {
    path: '/album/create',
    name: 'Create Album View',
    component: () => import(/* webpackChunkName: "albumCreateView" */ '../views/CreateAlbumView')
  },
  {
    path: '/photo/upload',
    name: 'Upload Photo View',
    component: () => import(/* webpackChunkName: "upload" */ '../views/CreatePhotoView')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
// import RegistrationAuth from '@/components/auth/RegistrationAuth.vue'
//import store from '@/store/index';

const routes = [
  {
    path: '/auth',
    //component: DefaultLayout,
    redirect: '/',
    name: 'auth',
    children: [
      {
        path: '/auth/register',
        name: 'register',
        component: () => import('@/components/auth/RegistrationAuth.vue'),
      },
      {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/components/auth/LoginAuth.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard'),
      },
    ],
  },
  {
    path: '/logout',
    name: 'logout',
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/components/auth/LogoutAuth'
      ),
  },
  {
    path: '/logintest',
    name: 'logintest',
    //meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/components/auth/LogoutAuth'
      ),
  },
  {
    path: '/settings',
    name: 'settings',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    //redirect: '/settings',
    children: [
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/Settings.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'page500',
        component: () => import('@/views/pages/Page500'),
      },
    ],
  },
  {
    path: '/products',
    name: 'products',
    component: DefaultLayout,
    meta: { requiresAuth: true },
    redirect: '/',
    children: [
      {
        path: '/products/men',
        name: 'men',
        component: () => import('@/views/products/MenProducts'),
      },
    ],
  },
  // {
  //   path: '/track-order',
  //   name: 'TrackOrder',
  //   component: () => import('@/views/TrackOrder'),
  // },
  // {
  //   path: '/account',
  //   name: 'Account',
  //   component: () => import('@/views/AccountSettings'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

// Auth 
// Using a Guard for restricting pages with no Auth/Permissions (checked through tokens)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) { //!store.getters.isLoggedIn
      // if the user is not authenticated
      next({
        name: 'login', // namepath: '/login',// query: { redirect: to.fullPath } // save the current route for after login
      });
    } else {
      next(); // if the user is authenticated
    }
  } else {
    next(); // if the route does not require authentication
  }
});

export default router

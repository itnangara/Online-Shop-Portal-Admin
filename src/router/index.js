import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
// import RegistrationAuth from '@/components/auth/RegistrationAuth.vue'

const routes = [
  {
    path: '/auth',
    //component: DefaultLayout,
    redirect: '/',
    name: 'auth',
    children: [
      {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/components/auth/RegistrationAuth.vue'),
      },
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/components/auth/LoginAuth.vue'),
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    //redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/components/auth/LoginAuth'),
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
    name: 'Settings',
    component: DefaultLayout,
    redirect: '/settings',
    children: [
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
    ],
  },
  {
    path: '/products',
    component: DefaultLayout,
    redirect: '/',
    name: 'Products',
    children: [
      {
        path: '/products/men',
        name: 'Men',
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

export default router

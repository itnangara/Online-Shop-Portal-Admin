import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
    ],
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
        /*component: () =>
          import(webpackChunkName: "dashboard"  '@/views/Settings.vue'),
          */
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
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
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
  // {
  //   path: '/logout',
  //   name: 'Logout',
  //   component: () => import('@/views/pages/Login'),
  // },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router

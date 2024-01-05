import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import TestView from '@/views/TestView.vue'

const routes = [
  {
    path: '/tests',
    name: 'tests',
    component: TestView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/departments',
    name: 'departments',
    component: DepartmentView
  },
  {
    path: '/employees',
    name: 'employee',
    component: EmployeeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

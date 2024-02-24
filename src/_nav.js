export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: '',
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Management Menu',
    icon: '',
  },
  {
    component: 'CNavGroup',
    name: 'Products',
    // to: '/products',
    // icon: 'cil-basket',
    icon: 'fas fa-basket',
    items: [
      {
        component: 'CNavItem',
        name: 'Men',
        to: '/products/men',
      },
      {
        component: 'CNavItem',
        name: 'Women',
        to: '/products/women',
      },
      {
        component: 'CNavItem',
        name: 'Children',
        to: '/products/children',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Users',
    to: '/users',
    // icon: 'cil-basket',
    icon: 'fas fa-basket',
    items: [
      {
        component: 'CNavItem',
        name: 'Admin',
        to: '/users/admins',
      },
      {
        component: 'CNavItem',
        name: 'Customers',
        to: '/Users/customers',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Orders',
    to: '/orders',
    // icon: 'cil-basket',
    icon: 'fas fa-basket',
    items: [
      {
        component: 'CNavItem',
        name: 'Pending',
        to: '/orders/pending',
      },
      {
        component: 'CNavItem',
        name: 'Completed',
        to: '/orders/completed',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Settings',
    to: '/settings',
    icon: '',
    badge: {
      color: '',
      text: '',
    },
  },
]

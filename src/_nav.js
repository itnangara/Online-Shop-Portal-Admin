export default [
  {
    component: 'CNavItem',
    name: 'All Products',
    to: '/dashboard',
    icon: '',
    badge: {
      color: '',
      text: '',
    },
  },
  {
    component: 'CNavItem',
    name: 'TrackOder',
    // to: '/track-order',
    icon: '',
  },
  {
    component: 'CNavTitle',
    name: 'Category',
    icon: '',
  },
  {
    component: 'CNavGroup',
    name: 'Products',
    to: '/products',
    // icon: 'cil-basket',
    icon: 'fas fa-basket',
    items: [
      {
        component: 'CNavItem',
        name: 'Toys',
        to: '/products/toys',
      },
      {
        component: 'CNavItem',
        name: 'Clothes',
        to: '/products/clothes',
      },
      {
        component: 'CNavItem',
        name: 'Accessories',
        to: '/products/accessories',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Other',
    // to: '/other',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavTitle',
    name: 'Settings',
  },
  {
    component: 'CNavItem',
    name: 'Account',
    // to: '/account',
    icon: 'cil-star',
  },
]

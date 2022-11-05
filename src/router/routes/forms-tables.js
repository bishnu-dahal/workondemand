export default [

  {
    path: '/onboardings',
    name: 'onboardings',
    component: () => import('@/views/table/bs-table/onBoarding/list_onBoarding.vue'),
    meta: {
      pageTitle: 'OnBoarding',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/addOnboardings',
    name: 'addOnboardings',
    component: () => import('@/views/table/bs-table/onBoarding/add_onBoarding.vue'),
    meta: {
      pageTitle: 'Boardings',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_onBoarding/:id',
    name: 'edit_onBoarding',
    component: () => import('@/views/table/bs-table/onBoarding/edit_onBoarding.vue'),
    meta: {
      pageTitle: 'Edit OnBoarding',
      breadcrumb: [{
        text: 'Edit',
      },
      {
        text: 'OnBoarding',
        active: true,
      },
      ],
    },
  },
  {
    path: '/add_category',
    name: 'add_category',
    component: () => import('@/views/table/bs-table/categories/add_category.vue'),
    meta: {
      pageTitle: 'Add Category',
      breadcrumb: [{
        text: 'Create',
      },
      {
        text: 'Category',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_category/:id',
    name: 'edit_category',
    component: () => import('@/views/table/bs-table/categories/edit_category.vue'),
    meta: {
      pageTitle: 'Edit Category',
      breadcrumb: [{
        text: 'Edit',
      },
      {
        text: 'Category',
        active: true,
      },
      ],
    },
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/table/bs-table/categories/list_categories.vue'),
    meta: {
      pageTitle: 'Categories',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/add_subCategory/:id',
    name: 'add_subCategory',
    component: () => import('@/views/table/bs-table/subCategories/add_subCategory.vue'),
    meta: {
      pageTitle: 'Add Sub Category',
      breadcrumb: [{
        text: 'Create',
      },
      {
        text: 'Sub Category',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_subCategory/:id/:cat_id',
    name: 'edit_subCategory',
    component: () => import('@/views/table/bs-table/subCategories/edit_subCategory.vue'),
    meta: {
      pageTitle: 'Edit Sub Category',
      breadcrumb: [{
        text: 'Edit',
      },
      {
        text: 'Sub Category',
        active: true,
      },
      ],
    },
  },
  {
    path: '/subCategories/:id',
    name: 'subCategories',
    component: () => import('@/views/table/bs-table/subCategories/list_subCategories.vue'),
    meta: {
      pageTitle: 'Sub Categories',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },

  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },
  {
    path: '/sliders',
    name: 'sliders',
    component: () => import('@/views/table/bs-table/sliders/list_slider.vue'),
    meta: {
      pageTitle: 'Sliders',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/addsliders',
    name: 'addsliders',
    component: () => import('@/views/table/bs-table/sliders/add_slider.vue'),
    meta: {
      pageTitle: 'Sliders',
      breadcrumb: [{
        text: 'Create',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
  {
    path: '/edit_sliders/:id',
    name: 'edit_sliders',
    component: () => import('@/views/table/bs-table/sliders/edit_slider.vue'),
    meta: {
      pageTitle: 'Edit Slider',
      breadcrumb: [{
        text: 'Edit',
      },
      {
        text: 'Sliders',
        active: true,
      },
      ],
    },
  },
  {
    path: '/residentialUsers',
    name: 'residentialUsers',
    component: () => import('@/views/table/bs-table/residentialUsers/list_residentialUsers.vue'),
    meta: {
      pageTitle: 'Residential Users',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'Residential Users',
        active: true,
      },
      ],
    },
  },
  {
    path: '/service_providers',
    name: 'service_providers',
    component: () => import('@/views/table/bs-table/serviceProviders/list_service_providers.vue'),
    meta: {
      pageTitle: 'Service Providers',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'View',
        active: true,
      },
      ],
    },
  },
]

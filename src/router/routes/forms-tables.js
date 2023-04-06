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
    path: '/commercialUsers',
    name: 'commercialUsers',
    component: () => import('@/views/table/bs-table/commercialUsers/listCommercialUsers.vue'),
    meta: {
      pageTitle: 'Commercial Users',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'Commercial Users',
        active: true,
      },
      ],
    },
  },
  {
    path: '/updateCommercialUsers/:id',
    name: 'updateCommercialUsers',
    component: () => import('@/views/table/bs-table/commercialUsers/updateCommercialUsers.vue'),
    meta: {
      pageTitle: 'Update Commercial Users',
      breadcrumb: [{
        text: 'Update',
      },
      {
        text: 'Update Commercial Users',
        active: true,
      },
      ],
    },
  },

  {
    path: '/update_residendialUser/:id',
    name: 'update_residendialUser',
    component: () => import('@/views/table/bs-table/residentialUsers/update_residendialUser.vue'),
    meta: {
      pageTitle: 'Update Residendial User',
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
    path: '/update_In_house_staff/:id',
    name: 'update_In_house_staff',
    component: () => import('@/views/table/bs-table/inHouseStaff/updateInHouseStaff.vue'),
    meta: {
      pageTitle: 'Update In House Stff User',
      breadcrumb: [{
        text: 'Update',
      },
      {
        text: 'Hose Staff Users',
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
  {
    path: '/service_providers_reviews/:id',
    name: 'service_providers_reviews',
    component: () => import('@/views/table/bs-table/serviceProviders/listServiceProviderReviews.vue'),
    meta: {
      pageTitle: 'Service Provider Ratings',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'Service Provider Ratings',
        active: true,
      },
      ],
    },
  },
  {
    path: '/bookings',
    name: 'bookings',
    component: () => import('@/views/table/bs-table/bookings/list_bookings.vue'),
    meta: {
      pageTitle: 'Bookings',
      breadcrumb: [{
        text: 'List',
      },
      {
        text: 'Bookings',
        active: true,
      },
      ],
    },
  },

  {
    path: '/update_booking/:id',
    name: 'update-bookings',
    component: () => import('@/views/table/bs-table/bookings/update_booking.vue'),
    meta: {
      pageTitle: 'Booking',
      breadcrumb: [{
        text: 'Update',
      },
      {
        text: 'Booking',
        active: true,
      },
      ],
    },
  },



  {
    path: '/bookingDetail/:id',
    name: 'bookingDetail',
    component: () => import('@/views/pages/profile/Profile.vue'),
    meta: {
      pageTitle: 'Booking Detail',
      breadcrumb: [
        {
          text: 'Booking',
        },
        {
          text: 'Booking Detail',
          active: true,
        },
      ],
    },
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import('@/views/table/bs-table/jobs/list_jobs.vue'),
    meta: {
      pageTitle: 'Jobs',
      breadcrumb: [
        {
          text: 'Jobs',
        },
        {
          text: 'Jobs',
          active: true,
        },
      ],
    },
  },
  {
    path: '/usersTransactions',
    name: 'usersTransactions',
    component: () => import('@/views/table/bs-table/transactions/listUserTransaction.vue'),
    meta: {
      pageTitle: 'Users Transactions',
      breadcrumb: [
        {
          text: 'Users Transactions',
        },
        {
          text: 'Users Transactions',
          active: true,
        },
      ],
    },
  },
  {
    path: '/serviceProviderTransactions',
    name: 'serviceProviderTransactions',
    component: () => import('@/views/table/bs-table/transactions/listServiceProviderTransaction.vue'),
    meta: {
      pageTitle: 'Service Provider Transactions',
      breadcrumb: [
        {
          text: 'Service Provider Transactions',
        },
        {
          text: 'Service Provider Transactions',
          active: true,
        },
      ],
    },
  },

  {
    path: '/listPromotions',
    name: 'listPromotions',
    component: () => import('@/views/table/bs-table/promotions/listPromo.vue'),
    meta: {
      pageTitle: 'List Promotions',
      breadcrumb: [
        {
          text: 'List Promotions',
        },
        {
          text: 'List Promotions',
          active: true,
        },
      ],
    },
  },
  {
    path: '/addPromotions',
    name: 'addPromotions',
    component: () => import('@/views/table/bs-table/promotions/addPromot.vue'),
    meta: {
      pageTitle: 'Create Promotions',
      breadcrumb: [
        {
          text: 'Create Promotions',
        },
        {
          text: 'Create Promotions',
          active: true,
        },
      ],
    },
  },
  {
    path: '/updatePromotions/:id',
    name: 'updatePromotions',
    component: () => import('@/views/table/bs-table/promotions/editPromo.vue'),
    meta: {
      pageTitle: 'Update Promotions',
      breadcrumb: [
        {
          text: 'Update Promotions',
        },
        {
          text: 'Update Promotions',
          active: true,
        },
      ],
    },
  },
  {
    path: '/listPaymentGateways',
    name: 'listPaymentGateways',
    component: () => import('@/views/table/bs-table/paymentgateway/list_paymentgateway.vue'),
    meta: {
      pageTitle: 'List Payment Gateways',
      breadcrumb: [
        {
          text: 'List Payment Gateways',
        },
        {
          text: 'List Payment Gateways',
          active: true,
        },
      ],
    },
  },
  {
    path: '/addPaymentGateways',
    name: 'addPaymentGateways',
    component: () => import('@/views/table/bs-table/paymentgateway/add_paymentgateway.vue'),
    meta: {
      pageTitle: 'Create Payment Gateways',
      breadcrumb: [
        {
          text: 'Create Payment Gateways',
        },
        {
          text: 'Create Payment Gateways',
          active: true,
        },
      ],
    },
  },
  {
    path: '/updatePaymentGateways/:id',
    name: 'updatePaymentGateways',
    component: () => import('@/views/table/bs-table/paymentgateway/edit_paymentgateway.vue'),
    meta: {
      pageTitle: 'Update Payment Gateways',
      breadcrumb: [
        {
          text: 'Update Payment Gateways',
        },
        {
          text: 'Update Payment Gateways',
          active: true,
        },
      ],
    },
  },
  {
    path: '/globalSettings',
    name: 'globalSettings',
    component: () => import('@/views/table/bs-table/global/globalSettings.vue'),
    meta: {
      pageTitle: 'Update Payment Gateways',
      breadcrumb: [
        {
          text: 'Update Payment Gateways',
        },
        {
          text: 'Update Payment Gateways',
          active: true,
        },
      ],
    },
  },
  {
    path: '/agencies',
    name: 'agencies',
    component: () => import('@/views/table/bs-table/agency/list_agency.vue'),
    meta: {
      pageTitle: 'Agencies',
      breadcrumb: [
        {
          text: 'Agencies',
        },
        {
          text: 'Agencies',
          active: true,
        },
      ],
    },
  },
  {
    path: '/createAgencies',
    name: 'createAgencies',
    component: () => import('@/views/table/bs-table/agency/add_agency.vue'),
    meta: {
      pageTitle: 'Create Agencies',
      breadcrumb: [
        {
          text: 'Agencies',
        },
        {
          text: 'Agencies',
          active: true,
        },
      ],
    },
  },

  {
    path: '/updateAgencies/:id',
    name: 'updateAgencies',
    component: () => import('@/views/table/bs-table/agency/update_agency.vue'),
    meta: {
      pageTitle: 'Update Agencies',
      breadcrumb: [
        {
          text: 'Agencies',
        },
        {
          text: 'Agencies',
          active: true,
        },
      ],
    },
  },
  {
    path: '/createInHouseStaff',
    name: 'CreateInHouseStaff',
    component: () => import('@/views/table/bs-table/inHouseStaff/CreateInHouseStaff.vue'),
    meta: {
      pageTitle: 'Create Staff',
      breadcrumb: [
        {
          text: 'Staff',
        },
        {
          text: 'In house',
          active: true,
        },
      ],
    },
  },
  {
    path: '/listInHouseStaff',
    name: 'listInHouseStaff',
    component: () => import('@/views/table/bs-table/inHouseStaff/listInHoseUser.vue'),
    meta: {
      pageTitle: 'List Staff',
      breadcrumb: [
        {
          text: 'Staff',
        },
        {
          text: 'In house',
          active: true,
        },
      ],
    },
  },
]

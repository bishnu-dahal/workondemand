<template>
  <b-card
    v-if="data"
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Bookings Statistics</b-card-title>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in data"
          :key="item.icon"
          xl="12"
          sm="12"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-2"
            >
              <b-avatar
                size="48"
                :variant="item.color"
              >
                <feather-icon
                  size="24"
                  :icon="item.icon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

import axios from '@axios'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  props: {

  },

  data() {
    return {

      data: [],

    }
  },

  mounted() {
    this.getstats()
  },
  methods: {

    getstats() {
      axios.get('booking/bookingsChart')

        .then(response => {
          console.log('response', response.data.data)
          var dict = []
          dict.push(
     { "subtitle": "Cancelled Bookings",  "title" : response.data.cancelledBookings ,   "icon": "PackageIcon" , "color" : "light-info" , "class" : "mb-1" },
     { "subtitle": "Pending Bookings",  "title" : response.data.pendingBookings , "icon": "PackageIcon" , "color" : "light-info", "class" : "mb-1"},
     { "subtitle": "Completed Bookings",  "title" : response.data.inProgressBookings ,"icon": "PackageIcon" , "color" : "light-danger" , "class" : "mb-1"});
          this.data = dict

          // TODO
        }).catch(error => {
          console.error(error)
        })
    },

  },
}
</script>

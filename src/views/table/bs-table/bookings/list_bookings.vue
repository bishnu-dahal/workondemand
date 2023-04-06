<template>
  <div>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-between">
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                variant="outline-primary"
                @click="
                  getDocuments();
                "
              >
                <feather-icon icon="SearchIcon" />
              </b-button>
            </b-input-group-prepend>
            <b-form-input
              v-model="searchTerm"
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @keyup="searchTimeOut()"
            />
            <b-input-group-append>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                v-b-modal.modal-advancesearch
                variant="outline-primary"
              >
                Advance search
              </b-button>
            </b-input-group-append>
          </b-input-group>

        </div>
      </b-form-group>
      <!-- <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                :to="{ name: 'create-bookings' }"
                title="Create Category"
              >
                ADD+
              </b-button>
            </b-input-group-prepend>
          </b-input-group>
        </div>
      </b-form-group> -->
    </div>
    <b-modal
      id="modal-advancesearch"
      ref="searchModel"
      hide-footer
      title="Advance Search"
      size="lg"
      cancel-variant="outline-secondary"
    >
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <b-form-group
              label="Service Provider"
              label-for="autosuggest__input"
            >
              <vue-autosuggest
                v-model="formValues.serviceProviderSearch"
                :suggestions="serviceProviderfilteredOptions"
                :limit="10"
                :input-props="{
                  id: 'autosuggest__input',
                  class: 'form-control',
                  placeholder: 'Search with name or ID',
                }"
                @input="onInputChange(formValues)"
                @selected="assignServiceProviderField(formValues, $event)"
              >
                <template slot-scope="{ suggestion }">
                  <span class="my-suggestion-item">{{ suggestion.item.name }}, {{ suggestion.item.id }}
                  </span>
                </template>
              </vue-autosuggest>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="User"
              label-for="autosuggest__input"
            >
              <vue-autosuggest
                v-model="formValues.userSearch"
                :suggestions="usersfilteredOptions"
                :limit="10"
                :input-props="{
                  id: 'autosuggest__input',
                  class: 'form-control',
                  placeholder: 'Search with name or ID',
                }"
                @input="onInputChangeUser(formValues)"
                @selected="assignUserField(formValues, $event)"
              >
                <template slot-scope="{ suggestion }">
                  <span class="my-suggestion-item">{{ suggestion.item.name }}, {{ suggestion.item.id }}
                  </span>
                </template>
              </vue-autosuggest>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Category"
              label-for="autosuggest__input"
            >
              <vue-autosuggest
                v-model="formValues.categorySearch"
                :suggestions="categoryfilteredOptions"
                :limit="10"
                :input-props="{
                  id: 'autosuggest__input',
                  class: 'form-control',
                  placeholder: 'Search with name or ID',
                }"
                @input="onInputChangeCategory(formValues)"
                @selected="assignUserCategoryField(formValues, $event)"
              >
                <template slot-scope="{ suggestion }">
                  <span class="my-suggestion-item">{{ suggestion.item.name }}, {{ suggestion.item.id }}
                  </span>
                </template>
              </vue-autosuggest>
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="
                (page = 1), (searchTerm = ''), closeSearch(), getDocuments()
              "
            >
              <span>GO</span>
            </b-button>

            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="outline-primary"
              class="mr-1"
              @click="resetSearch"
            >
              <span>Reset</span>
            </b-button>

            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="outline-secondary"
              class="mr-1"
              @click="closeSearch"
            >
              <span>Cancel</span>
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <b-table
      :items="items"
      :fields="fields"
      responsive
      class="mb-0 bg-white"
      :busy="isBusy"
    >
      <template #cell(Options)="row">
        <b-form-group>
          <div class="d-flex align-items-center w-fit-content">
            <b-input-group>
              <b-input-group-prepend>
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  size="sm"
                  variant="outline-primary"
                  :class="row.detailsShowing ? 'active' : ''"
                  @click="row.toggleDetails"
                >
                  <feather-icon
                    v-if="row.detailsShowing"
                    icon="ChevronUpIcon"
                  />

                  <feather-icon
                    v-else
                    icon="ChevronDownIcon"
                  />
                </b-button>
              </b-input-group-prepend>

              <b-input-group-append v-if="$ability.can('edit', 'employees')">
                <b-button
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  size="sm"
                  :to="{
                    name: 'update-bookings',
                    params: { id: row.item.id },
                  }"
                  variant="outline-primary text-success"
                >
                  <feather-icon icon="EditIcon" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </b-form-group>
      </template>

      <!-- full detail on click -->
      <template #row-details="row">
        <b-card no-body>
          <b-row>
            <b-col cols="12">
              <b-tabs
                pills
                card
                vertical
              >
                <b-tab
                  title="Booking Details"
                  active
                >
                  <b-card-text>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Address</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.address }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Latitude</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.latitude }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Longitude</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.longitude }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>description</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.Description }}
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-tab>

                <b-tab title="User">
                  <b-card-text>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>id</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.user.id }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>First Name</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.user.first_name }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Last Name</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.user.last_name }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Email</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.user.email }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Phone Number</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.user.phone_number }}
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-tab>

                <b-tab title="Service Provider">
                  <b-card-text>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>First Name</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service_provider.first_name }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Last Name</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service_provider.last_name }}
                      </b-col>
                    </b-row>

                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Email</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service_provider.email }}
                      </b-col>
                    </b-row>

                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Phone Number</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service_provider.phone_number }}
                      </b-col>
                    </b-row>

                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Profile Photo</strong>
                      </b-col>
                      <b-col
                        cols="10"
                      >
                        <enlargeable-image
                          :src="row.item.service_provider.profile_photo"
                          :src_large="row.item.service_provider.profile_photo"
                          animation_duration="600"
                        >
                          <b-img
                            style="max-height: 80px"
                            thumbnail
                            :src="row.item.service_provider.profile_photo"
                          />
                        </enlargeable-image>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-tab>

                <b-tab title="Payment Type">
                  <b-card-text>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Payment via</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.payment_type.title }}
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-tab>

                <b-tab title="Service">
                  <b-card-text>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Service</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service.title }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Price</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service.price }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Price Unit</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service.price_unit }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Service Category</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service.service_provider_categories.title }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom border-left">
                      <b-col cols="2">
                        <strong>Service Sub Category</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.service.service_provider_subcategories.title }}
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-col>
          </b-row>
        </b-card>
      </template>

      <template #cell(status)="data">
        <b-badge
          pill
          :variant="statusVariant(data.value)"
        >
          {{ data.value }}
        </b-badge>
      </template>

      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle" />
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>

    <div class="d-flex justify-content-end">
      <b-pagination
        v-model="page"
        :total-rows="count"
        :per-page="pageSize"
        pills
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import axios from '@axios'
import { VueAutosuggest } from 'vue-autosuggest'
import {
  BTable,
  BFormCheckbox,
  BButton,
  BCard,
  BRow,
  BCol,
  BAvatar,
  BBadge,
  BImg,
  BTabs,
  BTab,
  BCardText,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BFormDatepicker,
  BFormFile,
  BFormTextarea,
  BFormRadio,
  BForm,
  BFormCheckboxGroup,
  BFormRating,
  BListGroupItem,
  BListGroup,
  BPopover,
  BSpinner,
} from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import EnlargeableImage from '@diracleo/vue-enlargeable-image'

export default {
  components: {
    BTable,
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
    BImg,
    BTabs,
    BTab,
    BCardText,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormDatepicker,
    BFormFile,
    BFormTextarea,
    BFormRadio,
    BForm,
    BFormCheckboxGroup,
    BFormRating,
    BListGroup,
    BListGroupItem,
    BPopover,
    BSpinner,
    EnlargeableImage,
    VueAutosuggest,

  },
  directives: {
    Ripple,
  },
  data() {
    return {
      Day: '',
      popoverShow: false,
      base_url: '',
      isSubmitting: false,

      serviceProviderfilteredOptions: [],
      usersfilteredOptions: [],
      categoryfilteredOptions: [],

      formValues: {
        title: '',
        searchTerm: '',
        serviceProviderSearch: '',
        userSearch: '',
        categorySearch: '',
        service_provider_id: null,
        user_id: null,
        category_id: null,
      },
      options: {
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['Y', 'm', 'd'],
        },
      },
      exportLimit: '',
      isBusy: true,
      fields: [{
        key: 'Options',
        thClass: 'customHead',
      },
      {
        key: 'id',
        label: 'ID',
        sortable: true,
        thClass: 'customHead',
      },
      {
        key: 'subTotal',
        label: 'SubTotal',
        sortable: true,
        thClass: 'customHead',
      },
      {
        key: 'total',
        label: 'Total',
        sortable: true,
        thClass: 'customHead',
      },
      {
        key: 'discount',
        label: 'Discount',
        sortable: true,
        thClass: 'customHead',
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        thClass: 'customHead',
      },
      {
        key: 'start_date',
        label: 'Date',
        sortable: true,
        thClass: 'customHead',
      },
      ],
      items: [],
      /* eslint-disable global-require */

      searchTerm: '',
      pageSize: 10,
      page: 1,
      count: 0,
    }
  },

  mounted() {
    this.getDocuments()
  },
  methods: {
    onClose() {
      this.popoverShow = false
    },

    assignServiceProviderField(item, event) {
      console.log('name', event.item)
      item.service_provider_id = event.item.id
      item.serviceProviderSearch = event.item.name
    },
    assignUserField(item, event) {
      console.log('name', event.item)
      item.user_id = event.item.id
      item.userSearch = event.item.name
    },
    assignUserCategoryField(item, event) {
      console.log('name', event.item)
      item.category_id = event.item.id
      item.categorySearch = event.item.name
    },
    getDocuments() {
        console.log(this.formValues);
      this.isBusy = true

      axios
        .post(`/booking/admin_get_bookings/${this.page}/${this.searchTerm}`,
          this.formValues)
        .then(response => {
          this.items = response.data.data
          this.base_url = response.data.base_url
          this.count = response.data.totalRows
          this.isBusy = false

          // TODO
        })
        .catch(error => {
          console.error(error)
        })
    },

    onInputChange(item) {
      const text = item.serviceProviderSearch
      if (text === '' || text === undefined) {
        return
      }
      axios
        .get(`serviceProvider/getServiceProviderDropdown/${item.serviceProviderSearch}`)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)
              this.serviceProviderfilteredOptions = [
                {
                  data: response.data.data,
                },
              ]
              console.log('item', item)
            } else {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                  text: response.data.message,
                },
              })
            }
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: 'Something went wrong, try again later',
              },
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    onInputChangeUser(item) {
      const text = item.userSearch
      if (text === '' || text === undefined) {
        return
      }
      axios
        .get(`users/usersDropdown/${item.userSearch}`)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)
              this.usersfilteredOptions = [
                {
                  data: response.data.data,
                },
              ]
              console.log('item', item)
            } else {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                  text: response.data.message,
                },
              })
            }
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: 'Something went wrong, try again later',
              },
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    onInputChangeCategory(item) {
      const text = item.categorySearch
      if (text === '' || text === undefined) {
        return
      }
      axios
        .get(`categories/CategoriesDropdown/${item.categorySearch}`)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)
              this.categoryfilteredOptions = [
                {
                  data: response.data.data,
                },
              ]
              console.log('item', item)
            } else {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'AlertCircleIcon',
                  variant: 'danger',
                  text: response.data.message,
                },
              })
            }
          } else {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: 'Something went wrong, try again later',
              },
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    handlePageChange(value) {
      this.page = value
      this.isBusy = true
      this.getDocuments()
    },
    searchTimeOut() {
      let timeout = null
      clearTimeout(timeout)
      // Make a new timeout set to go off in 1000ms
      timeout = setTimeout(() => {
        this.page = 1
        this.getDocuments()
      }, 1000)
    },
    statusVariant(ownerType) {
      if (ownerType === 'Pending') {
        return 'light-success'
      }
      if (ownerType === 'In Progress') {
        return 'light-warning'
      }
      if (ownerType === 'Decline') {
        return 'danger'
      }
      if (ownerType === 'Approval') {
        return 'ight-info'
      }
      if (ownerType === 'Canceled') {
        return 'danger'
      }
      if (ownerType === 'Completed') {
        return 'light-primary'
      }
      return 'light-warning'
    },
    closeSearch() {
      this.$refs.searchModel.hide()
    },
    resetSearch() {
      console.log(this.formValues)

      Object.entries(this.formValues).forEach(([key]) => {
        this.formValues[key] = ''
      })

      console.log(this.formValues)
    },
  },
}
</script>

<style lang="css">
.enlargeable-image .full {
    z-index: 9999 !important;

    background-color: rgba(0, 0, 0, 0.5) !important;
}

.customHead {
    background-color: #00A688 !important;
    color: #fff;
}

<style>textarea {
    resize: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.hr_divider {
    border-bottom: 2px solid #82868b;
}

</style><style lang="scss">
@import "@core/scss/vue/libs/vue-autosuggest.scss";
</style>

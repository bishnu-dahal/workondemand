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
          </b-input-group>
        </div>
      </b-form-group>
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                :to="{ name: 'add_category' }"
                title="Create Category"
              >
                ADD+
              </b-button>
            </b-input-group-prepend>
          </b-input-group>
        </div>
      </b-form-group>
    </div>
    <b-table
      :items="items"
      :fields="fields"
      responsive
      class="mb-0 bg-white"
      :busy="isBusy"
    >
      <template #cell(Options)="row">

        <div>
          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
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

                <b-input-group-append>
                  <b-button
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    size="sm"
                    :to="{name: 'updateuser', params: { id: row.item.id } }"
                    variant="outline-primary text-success"
                  >
                    <feather-icon icon="EditIcon" />
                  </b-button>
                </b-input-group-append>
                <b-input-group-append>
                  <b-button
                    v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                    size="sm"
                    variant="outline-primary text-danger"
                    @click="deleteDocument(row.item.id)"
                  >
                    <feather-icon icon="Trash2Icon" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </b-form-group>
        </div>
      </template>
      <template #cell(image)="data">
        <enlargeable-image
          :src="'http://localhost:4000' + data.value"
          :src_large="'http://localhost:4000' + data.value"
          animation_duration="600"
        >
          <b-img
            thumbnail
            style="max-height: 80px"
            :src="'http://localhost:4000' + data.value"
          />
        </enlargeable-image>
      </template>
      <!-- full detail on click -->

      <template #row-details="row">
        <b-card no-body>
          <b-row>
            <b-col cols="12">
              <b-tabs
                pills
                card
                horizontal
              >

                <b-tab title="Service Provider Details">
                  <b-card-text>
                    <b-row class="border-bottom ">
                      <b-col cols="2">
                        <strong>First Name</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.first_name }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom ">
                      <b-col cols="2">
                        <strong>Last Name</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.last_name }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom  ">
                      <b-col cols="2">
                        <strong>Photo</strong>
                      </b-col>
                      <b-col cols="10">
                        <enlargeable-image
                          :src="row.item.profile_photo"
                          :src_large="row.item.profile_photo"
                          animation_duration="600"
                        >
                          <b-img
                            style="max-height: 80px;"
                            thumbnail
                            :src="row.item.national_id_photo"
                          />
                        </enlargeable-image>
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom ">
                      <b-col cols="2">
                        <strong>Id Card Number</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.id_card_number }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom ">
                      <b-col cols="2">
                        <strong>Email</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.email }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom ">
                      <b-col cols="2">
                        <strong>Phone Number</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.phone_number }}
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom  ">
                      <b-col cols="2">
                        <strong>Id Card Photo</strong>
                      </b-col>
                      <b-col cols="10">
                        <enlargeable-image
                          :src="row.item.national_id_photo"
                          :src_large="row.item.national_id_photo"
                          animation_duration="600"
                        >
                          <b-img
                            style="max-height: 80px;"
                            thumbnail
                            :src="row.item.national_id_photo"
                          />
                        </enlargeable-image>
                      </b-col>
                    </b-row>
                    <b-row class="border-bottom ">
                      <b-col cols="2">
                        <strong>Active</strong>
                      </b-col>
                      <b-col cols="10">
                        {{ row.item.active }}
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-tab>

                <b-tab title="Services">
                  <b-card-text>
                    <b-row class="border-bottom ">
                      <b-col cols="12">
                        <b-table
                          :items="row.item.service_provider_services"
                          :fields="serviceProviderServicesFields"
                          striped
                          responsive
                          class="mb-0"
                          :busy="isBusy"
                          show-empty
                        >
                          <template #cell(Options)="row">

                            <div>
                              <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
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

                                    <b-input-group-append>
                                      <b-button
                                        v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                                        size="sm"
                                        :to="{name: 'updateuser', params: { id: row.item.id } }"
                                        variant="outline-primary text-success"
                                      >
                                        <feather-icon icon="EditIcon" />
                                      </b-button>
                                    </b-input-group-append>
                                    <b-input-group-append>
                                      <b-button
                                        v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                                        size="sm"
                                        variant="outline-primary text-danger"
                                        @click="deleteDocument(row.item.id)"
                                      >
                                        <feather-icon icon="Trash2Icon" />
                                      </b-button>
                                    </b-input-group-append>
                                  </b-input-group>
                                </div>
                              </b-form-group>
                            </div>
                          </template>
                          <template #empty="scope">
                            <h4>{{ scope.emptyText }}</h4>
                          </template>
                          <template #cell(service_provider_categories)="data">
                            {{ data.value.title }}
                          </template>
                          <template #cell(service_provider_subcategories)="data">
                            {{ data.value.title }}
                          </template>

                        </b-table>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-tab>

                <b-tab title="Availbilities">
                  <template #row-details="row">
                    <b-card no-body>
                      <b-row>
                        <b-col
                          cols="12"
                          class="text-center p-0 m-0"
                        >
                          <label class="h4 p-0 py-1">Payment List</label>
                        </b-col>
                        <b-col cols="12">
                          <b-tabs
                            pills
                            card
                            horizontal
                          />
                        </b-col>
                      </b-row>

                    </b-card>
                  </template>
                </b-tab>
              </b-tabs>
            </b-col>
          </b-row>
          <b-row class="border-bottom ">
            <b-col
              cols="12"
              class="text-right"
            >
              <strong>Created By : </strong>
              {{ row.item.created_by }}
            </b-col>
          </b-row>
          <b-row
            v-if="row.item.updated_by"
            class="border-bottom "
          >
            <b-col
              cols="12"
              class="text-right"
            >
              <strong>Updated By : </strong>
              {{ row.item.updated_by }}
            </b-col>
          </b-row>

          <!-- <b-button
              size="sm"
              variant="outline-secondary"
              @click="row.toggleDetails"
            >
              Hide Details
            </b-button> -->
        </b-card>
      </template>
      <template #cell(profile_photo)="data">
        <enlargeable-image
          :src="'http://localhost:4000' + data.value"
          :src_large="'http://localhost:4000' + data.value"
          animation_duration="600"
        >
          <b-img
            thumbnail
            style="max-height: 80px"
            :src="'http://localhost:4000' + data.value"
          />
        </enlargeable-image>
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

      filteredOptions: [],

      formValues: {
        title: '',
        searchTerm: '',
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
      fields: [
        {
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
          key: 'first_name',
          label: 'First Name',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'last_name',
          label: 'Last Name',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'phone_number',
          label: 'Phone Number',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'profile_photo',
          label: 'Image',
          sortable: true,
          thClass: 'customHead',
        },
      ],
      serviceProviderServicesFields: [
        {
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
          key: 'title',
          label: 'Title',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'price',
          label: 'Price',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'price_unit',
          label: 'Price Unit',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'service_provider_categories.title',
          label: 'Category',
          sortable: true,
          thClass: 'customHead',
        },
        {
          key: 'service_provider_subcategories.title',
          label: 'Category',
          sortable: true,
          thClass: 'customHead',
        },
      ],
      serviceProviderAvailability: [
        {
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
          key: 'day',
          label: 'Day',
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

    deleteDocument(id) {
      console.log(id)
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          axios
            .get(`users/delete_residential_user/${id}`)
            .then(response => {
              if (response.data.hasOwnProperty('success')) {
                if (response.data.success === true) {
                  this.getDocuments()
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Transaction Deleted Successfully',
                      icon: 'EditIcon',
                      variant: 'success',
                    },
                  })
                  console.log('Transaction Deleted Successfully')
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
        }
      })
    },

    getDocuments() {
      this.isBusy = true

      axios
        .get(`/serviceProvider/get_All_service_providers/${this.page}/${this.searchTerm}`)

        .then(response => {
          this.items = response.data.data
          this.base_url = response.data.base_url
          this.count = response.data.totalRows
          this.isBusy = false
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
      if (ownerType == 'Low') {
        return 'primary'
      } if (ownerType == 'Medium') {
        return 'warning'
      } if (ownerType == 'High') {
        return 'danger'
      }
      return 'primary'
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
</style><style>
textarea {
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
                        <!-- <b-card-text>
                          <b-row class="border-bottom ">
                            <b-col cols="12" />
                            <b-tab
                              v-for="item in row.item.service_provider_availability"
                              :key="item.id"
                              :title="item.day"
                              :title-link-class="'mx-1 border border-primary tabs_margin_calss'"
                            >
                              <b-card-text>
                                <b-row class="border-bottom ">
                                  <b-col cols="2">
                                    <strong>ID</strong>
                                  </b-col>
                                  <b-col cols="10">
                                    {{ item.id }}
                                  </b-col>
                                </b-row>
                              </b-card-text>
                            </b-tab>
                          </b-row>
                        </b-card-text> -->
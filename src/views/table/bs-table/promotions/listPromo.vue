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
      <b-form-group>
        <div class="d-flex align-items-center">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                :to="{ name: 'addPromotions' }"
                title="Create Promotions"
              >
                ADD+
              </b-button>
            </b-input-group-prepend>
          </b-input-group>
        </div>
      </b-form-group>
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
            <label for="v-from_date">From Date</label>
            <b-input-group>
              <cleave
                id="from_date"
                v-model="formValues.fromDate"
                class="form-control"
                :raw="false"
                :options="options.date"
                placeholder="YYYY-MM-DD"
              />

              <b-input-group-append>
                <b-form-datepicker
                  v-model="formValues.fromDate"
                  show-decade-nav
                  button-only
                  right
                  locale="en-US"
                  aria-controls="v-from_date"
                />
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col md="6">
            <label for="v-to_date">To Date</label>
            <b-input-group>
              <cleave
                id="to_date"
                v-model="formValues.toDate"
                class="form-control"
                :raw="false"
                :options="options.date"
                placeholder="YYYY-MM-DD"
              />

              <b-input-group-append>
                <b-form-datepicker
                  v-model="formValues.toDate"
                  show-decade-nav
                  button-only
                  right
                  locale="en-US"
                  aria-controls="v-to_date"
                />
              </b-input-group-append>
            </b-input-group>
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
                    :to="{ name: 'updatePromotions', params: { id: row.item.id } }"
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
      <!-- full detail on click -->

      <template #cell(createdAt)="data">
        {{ data.value | moment("DD/MM/YYYY") }}
      </template>
      <template #cell(expiry_date)="data">
        {{ data.value | moment("DD/MM/YYYY") }}
      </template>
      <template #row-details="row">
        <b-card no-body>
          <b-row>
            <b-col
              cols="12"
              class="m-0 p-2"
            >
              <b-card-text>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Total Vouchers</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.total_vouchers }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Total Vouchers Remians</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.total_vouchers_remian }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Expiry Date</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.expiry_date }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Created Date</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.createdAt }}
                  </b-col>
                </b-row>
                <b-row class="border-bottom">
                  <b-col cols="2">
                    <strong>Description</strong>
                  </b-col>
                  <b-col cols="10">
                    {{ row.item.dis }}
                  </b-col>
                </b-row>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
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
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'

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
    Cleave,

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
        fromDate: null,
        toDate: null,
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
        key: 'code',
        label: 'Promo Code',
        sortable: true,
        thClass: 'customHead',
      },
      {
        key: 'dis',
        label: 'Description',
        sortable: true,
        thClass: 'customHead',
      },
      {
        key: 'discount',
        label: 'Discount',
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
            .get(`promotions/deletePromotion/${id}`)
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
      console.log(this.formValues)
      this.isBusy = true

      axios
        .post(`/promotions/getAllPromotions/${this.page}/${this.searchTerm}`,
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

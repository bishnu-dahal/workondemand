<template>
  <div>
    <form-wizard
      ref="wizard"
      color="#7367F0"
      :title="null"
      :subtitle="null"
      layout="horizontal"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="wizard-vertical mb-2"
      @on-complete="formSubmitted"
    >
      <tab-content title="Account Details">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Agency Details
            </h5>
            <small class="text-muted">
              Enter Agency Account Details.
            </small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="First Name"
              label-for="v-name"
            >
              <b-form-input
                id="v-name"
                v-model="formValues.first_name"
                placeholder="Enter First Name"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Last Name"
              label-for="v-last_name"
            >
              <b-form-input
                id="v-last_name"
                v-model="formValues.last_name"
                placeholder="Enter Last Name"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Email"
              label-for="v-email"
            >
              <b-form-input
                id="v-email"
                v-model="formValues.email"
                placeholder="Enter Email"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Phone Number"
              label-for="v-phone_number"
            >
              <b-form-input
                id="v-phone_number"
                v-model="formValues.phone_number"
                placeholder="Enter Phone Number"
              />

            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Password"
              label-for="v-password"
            >
              <b-form-input
                id="v-password"
                v-model="formValues.password"
                placeholder="Enter Password"
              />
            </b-form-group>
          </b-col>

          <b-col md="12">
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Profile Photo"
                  label-for="v-emp_photo"
                >

                  <b-form-file
                    id="v-emp_photo"
                    v-model="formValues.profile_photo"
                    accept="image/* , .pdf"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <enlargeable-image
                  v-if="formValues.ui_emp_photo"
                  :src="formValues.ui_emp_photo"
                  :src_large="formValues.ui_emp_photo"
                  animation_duration="600"
                >
                  <b-img
                    style="max-height: 80px;"
                    thumbnail
                    :src="formValues.ui_emp_photo"
                  />
                </enlargeable-image>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </tab-content>

      <!-- personal info tab -->
      <tab-content title="Company Information">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Company Details
            </h5>
            <small class="text-muted">Enter Company Details.</small>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Company Owner Name"
              label-for="v-owner_name"
            >
              <b-form-input
                id="v-email"
                v-model="formValues.owner_name"
                placeholder="Enter Company Owner Name"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Company Name"
              label-for="v-company_name"
            >
              <b-form-input
                id="v-email"
                v-model="formValues.company_name"
                placeholder="Enter Company Name"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Company Registration Numbers"
              label-for="v-company_registration_number"
            >
              <b-form-input
                id="v-company_registration_number"
                v-model="formValues.company_registration_number"
                placeholder="Enter Company Registration Number"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="VAT"
              label-for="v-vat"
            >
              <b-form-input
                id="v-vat"
                v-model="formValues.vat"
                placeholder="Enter VAT"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Position In Company"
              label-for="v-position_in_company"
            >
              <b-form-input
                id="v-position_in_company"
                v-model="formValues.position_in_company"
                placeholder="Enter position_in_company"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Agency Status"
              label-for="v-purchaseType"
            >
              <v-select
                id="v-purchaseType"
                v-model="formValues.status"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="statusTypes"
                label="text"
                :reduce="text => text.value"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>

      <!-- address -->
      <tab-content title="Address Details">
        <b-row>
          <b-col
            cols="12"
            class="mb-2"
          >
            <h5 class="mb-0">
              Address Details
            </h5>
            <small class="text-muted" />
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Building Name"
              label-for="v-building_name"
            >
              <b-form-input
                id="v-building_name"
                v-model="formValues.building_name"
                placeholder="Enter Building Name"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Company Address"
              label-for="v-company_address"
            >
              <b-form-input
                id="v-company_address"
                v-model="formValues.company_address"
                placeholder="Enter Company Address"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </tab-content>
    </form-wizard>

  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import EnlargeableImage from '@diracleo/vue-enlargeable-image'

import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'

import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormDatepicker,
  BFormFile,
  BFormTextarea,
  BFormCheckbox,
  BFormRadio,
  BFormCheckboxGroup,
  BImg,
  BFormRating,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
} from 'bootstrap-vue'
import axios from '@axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    BFormFile,
    BFormTextarea,
    BFormCheckbox,
    BFormRadio,
    vSelect,
    BFormCheckboxGroup,
    BImg,
    EnlargeableImage,
    BFormRating,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    Cleave,
  },
  data() {
    return {
      options: {
        phone: {
          prefix: '9665',
          blocks: [12],
          uppercase: true,
          noImmediatePrefix: true,
        },
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['Y', 'm', 'd'],
        },
      },
      isSubmitting: false,
      formValues: {

        first_name: '',
        last_name: '',
        profile_photo: '',
        phone_number: '',
        email: '',
        password: '',
        company_name: null,
        company_registration_number: '',
        vat: '',
        owner_name: '',
        position_in_company: '',
        building_name: '',
        company_address: '',
        status: '',

      },

      statusTypes: [
        { value: 'Active', text: 'Active' },
        { value: 'Pending', text: 'Pending' },
        { value: 'Rejected', text: 'Rejected' },
      ],
    }
  },

  created() {
    this.getAgency()
  },

  mounted() {
    const { wizard } = this.$refs
    wizard.activateAll()
  },
  methods: {
    addLoading() {
      const accordionItems = [...document.getElementsByClassName('wizard-btn')]

      accordionItems.forEach(accordionItem => {
        accordionItem.classList.add('disabled')
        accordionItem.setAttribute('disabled', 'disabled')
        accordionItem.innerHTML = '<span>Please Wait</span>'
      })
    },
    removeLoading() {
      const accordionItems = [...document.getElementsByClassName('wizard-btn')]

      accordionItems.forEach(accordionItem => {
        accordionItem.classList.remove('disabled')
        accordionItem.removeAttribute('disabled')
        accordionItem.innerHTML = '<span>Submit</span>'
      })
    },
    getAgency() {
      console.log(this.$route.params.id)
      const appendWithurl = `agency/getAgencyById/${this.$route.params.id}`

      axios.get(appendWithurl).then(response => {
        console.log(response.data)
        this.formValues = response.data.data
        this.initTrHeight()
        console.log('Category Fetched')
      }).catch(error => {
        console.error(error)
      })
    },
    formSubmitted() {
      this.addLoading()

      const formData = new FormData()

      Object.entries(this.formValues).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          console.log(key, value)
          if (value instanceof File) {
            formData.append(key, value)
          } else {
            formData.append(key, JSON.stringify(value))
          }
        } else if (value !== null) {
          formData.append(key, value)
        }
      })
      axios.post(`/agency/update_agency/${this.$route.params.id}`,
        this.formValues).then(response => {
        console.log(response)
        if (response.data.hasOwnProperty('success')) {
          if (response.data.success === true) {
            this.$router.replace('/agencies')
              .then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: 'Employee Created',
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
              })
          } else {
            this.removeLoading()
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: response.data.message,
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            })
          }
        } else {
          this.removeLoading()
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
      }).catch(error => {
        console.error(error)
      })
    },
  },
}
</script>

<style lang="css" >

.enlargeable-image .full  {
  z-index:9999 !important;

  background-color: rgba(0,0,0,0.5) !important;
}

.wizard-icon-container{

  background-color: #004aad !important;
}

.stepTitle.active{

  color: #004aad !important;
}

.wizard-btn{

  background-color: #004aad !important;
}

</style>

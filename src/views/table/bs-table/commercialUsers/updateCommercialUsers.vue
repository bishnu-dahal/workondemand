<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="First Name"
          label-for="v-first_name"
        >
          <b-form-input
            id="v-first_name'"
            v-model="formValues.first_name"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Last Name"
          label-for="v-last_name"
        >
          <b-form-input
            id="v-last_name'"
            v-model="formValues.last_name"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Email"
          label-for="v-email"
        >
          <b-form-input
            id="v-email'"
            v-model="formValues.email"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Phone Number"
          label-for="v-phone_number"
        >
          <b-form-input
            id="v-phone_number'"
            v-model="formValues.phone_number"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="FCM Token"
          label-for="v-fcm_token"
        >
          <b-form-input
            id="v-fcm_token'"
            v-model="formValues.fcm_token"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Stripe Customer Id"
          label-for="v-stripe_customerId"
        >
          <b-form-input
            id="v-stripe_customerId'"
            v-model="formValues.stripe_customerId"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Comopany Name"
          label-for="v-company_name"
        >
          <b-form-input
            id="v-company_name'"
            v-model="formValues.company.company_name"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Company Registration Number"
          label-for="v-company_registration_number"
        >
          <b-form-input
            id="v-company_registration_number'"
            v-model="formValues.company.company_registration_number"
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
            v-model="formValues.company.vat"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Owner Name"
          label-for="v-owner_name"
        >
          <b-form-input
            id="v-owner_name'"
            v-model="formValues.company.owner_name"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Position In Company"
          label-for="v-position_in_company"
        >
          <b-form-input
            id="v-position_in_company'"
            v-model="formValues.company.position_in_company"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Building Name"
          label-for="v-building_name"
        >
          <b-form-input
            id="v-building_name'"
            v-model="formValues.company.building_name"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Company Address"
          label-for="v-company_address"
        >
          <b-form-input
            id="v-company_address'"
            v-model="formValues.company.company_address"
          />
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Company Can Pay after Service"
          label-for="payment_type"
        >
          <v-select
            id="payment_type"
            v-model="formValues.company.can_pay_later"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="payment_type"
            label="text"
            :reduce="(text) => text.value"
          />
        </b-form-group>
      </b-col>

      <!-- submit and reset -->
      <b-col md="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
          :disabled="isSubmitting"
          @click="Submit"
        >
          <b-spinner
            v-if="isSubmitting"
            small
          />
          <span v-if="isSubmitting">Please Wait</span>

          <span v-if="!isSubmitting">Submit</span>
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormDatepicker,
  BFormTimepicker,
  BCard,
  BSpinner,
  BFormFile,
  BFormTextarea,
  BInputGroupAppend,
  BInputGroup,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import axios from '@axios'
import { heightTransition } from '@core/mixins/ui/transition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { VueAutosuggest } from 'vue-autosuggest'

import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import axiosIns from '@/libs/axios'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    vSelect,
    BButton,
    BFormDatepicker,
    BCard,
    BSpinner,
    BFormFile,
    BFormTextarea,
    BInputGroupAppend,
    Cleave,
    BInputGroup,
    BFormTimepicker,

  },
  directives: {
    Ripple,
  },

  mixins: [heightTransition],

  data() {
    return {
      options: {
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['Y', 'm', 'd'],
        },
      },
      payment_type: [
        {
          value: 'Yes',
          text: 'Yes',
        },
        {
          value: 'NO',
          text: 'NO',
        },
      ],

      isSubmitting: false,

      formValues: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        fcm_token: '',
        stripe_customerId: '',
        company: {
          company_name: '',
          company_registration_number: '',
          vat: '',
          owner_name: '',
          position_in_company: '',
          building_name: '',
          company_address: '',
          can_pay_later: '',
        },
      },
    }
  },
  mounted() {
    this.initTrHeight()
    this.getUserDetail()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    Submit() {
      this.isSubmitting = true
      console.log('submit', this.formValues)

      axios
        .post(`users/admin_update_commercial_user/${this.$route.params.id}`, this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/commercialUsers').then(() => {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: response.data.message,
                    icon: 'EditIcon',
                    variant: 'success',
                  },
                })
              })
            } else {
              this.isSubmitting = false

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
            this.isSubmitting = false

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
    getUserDetail() {
      console.log(this.$route.params.id)
      axios.get(`users/commercialUserDetail/${this.$route.params.id}`).then(response => {
        console.log(response.data)
        this.formValues = response.data.data
        this.initTrHeight()
      }).catch(error => {
        console.error(error)
      })
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
      })
    },
  },
}
</script>

<style>
textarea {
  resize: vertical;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.hr_divider {
  border-bottom: 2px solid #82868b;
}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-autosuggest.scss";
</style>

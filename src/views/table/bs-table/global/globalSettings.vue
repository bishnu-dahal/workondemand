<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="Service Fee"
          label-for="v-service_fee"
        >
          <b-form-input
            id="v-service_fee'"
            v-model="formValues.service_fee"
          />
        </b-form-group>
        
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Chatwoot Account Id"
          label-for="v-chatwoot_account_id"
        >
          <b-form-input
            id="v-chatwoot_account_id'"
            v-model="formValues.chatwoot_account_id"
          />
        </b-form-group>
        
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Chatwoot Inbox Id"
          label-for="v-chatwoot_inbox_id"
        >
          <b-form-input
            id="v-chatwoot_inbox_id'"
            v-model="formValues.chatwoot_inbox_id"
          />
        </b-form-group>
        
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Stripe Public Key"
          label-for="v-stripe_publish_key"
        >
          <b-form-input
            id="v-service_fee'"
            v-model="formValues.stripe_publish_key"
          />
        </b-form-group>
        
      </b-col>

      <b-col md="6">
        <b-form-group
          label="Stripe Secret Key"
          label-for="v-stripe_secret_key"
        >
          <b-form-input
            id="v-service_fee'"
            v-model="formValues.stripe_secret_key"
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

      isSubmitting: false,

      formValues: {
        id: '',
        service_fee: '',
        chatwoot_account_id: '',
        chatwoot_inbox_id: '',
        stripe_publish_key: '',
        stripe_secret_key: '',
      },
    }
  },
  mounted() {
    this.initTrHeight()
    this.getSettings()
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
        .post(`globalSettings/update_payment_gateways/${this.formValues.id}`, this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/dashboard/ecommerce').then(() => {
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
    getSettings() {
      axios.get('globalSettings/get_global_seeting/').then(response => {
        console.log(response.data)
        this.formValues = response.data.data
        this.initTrHeight()
        console.log('Category Fetched')
      }).catch(error => {
        console.error(error)
      })
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        // this.trSetHeight(this.$refs.form.scrollHeight);
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

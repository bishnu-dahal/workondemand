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
            label="Password"
            label-for="v-password"
          >
            <b-form-input
              id="v-password'"
              v-model="formValues.password"
            />
          </b-form-group>
  
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
        </b-col></b-row>
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
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          phone_number: '',
          fcm_token: '',
          stripe_customerId: '',
        },
      }
    },
    mounted() {
      this.initTrHeight()
      // this.getUserDetail()
    },
    created() {
      window.addEventListener('resize', this.initTrHeight)
    },
    destroyed() {
      window.removeEventListener('resize', this.initTrHeight)
    },
    methods: {
      Submit() {
        console.log('submit', this.formValues)
  
        axios
          .post('serviceProvider/create_service_provider', this.formValues)
          .then(response => {
            if (response.data.hasOwnProperty('success')) {
              if (response.data.success === true) {
                console.log(response.data.data)
  
                this.$router.replace('/service_providers').then(() => {
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
        axios.get(`users/userDetail/${this.$route.params.id}`).then(response => {
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
  
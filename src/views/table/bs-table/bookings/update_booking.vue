<template>
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
              label="Service"
              label-for="autosuggest__input"
            >
              <vue-autosuggest
                v-model="formValues.userSearch"
                :suggestions="usersfilteredOptions"
                :limit="10"
                :input-props="{
                  id: 'autosuggest__input',
                  class: 'form-control',
                  placeholder: 'Search with Service Name',
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
            label="Title"
            label-for="v-title"
          >
            <b-form-input
              id="v-title'"
              v-model="formValues.title"
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
            @click="imageUpload"
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
    BCard,
    BSpinner,
    BFormFile,
    BFormTextarea,
    BInputGroupAppend,
    BInputGroup,
  } from 'bootstrap-vue'
  import Ripple from 'vue-ripple-directive'
  import axios from '@axios'
  import { heightTransition } from '@core/mixins/ui/transition'
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
  import { VueAutosuggest } from 'vue-autosuggest'
  import Cleave from 'vue-cleave-component'
  
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
      VueAutosuggest,
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
        serviceProviderfilteredOptions: [],
        usersfilteredOptions: [],
        formValues: {
          description: '',
          address: '',
          latitude: '',
          longitude: '',
          subTotal: '',
          total: '',
          discount: '',
          status: '',
          start_date: '',
          user:{
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            image: ''
          },
          service_provider: {
            id: '',
            first_name: '',
            last_name: '',
            profile_photo: '',
            email: '',
            phone_number: '',
            active: ''
        },
        },
  
      }
    },
    mounted() {
      this.initTrHeight()
      this.getBookingDetail()
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
          .post('/categories/add_categories', this.formValues)
          .then(response => {
            if (response.data.hasOwnProperty('success')) {
              if (response.data.success === true) {
                console.log(response.data.data)
  
                this.$router.replace('/categories').then(() => {
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
      getBookingDetail() {
      console.log(this.$route.params.id)
      const appendWithurl = `booking/admin_service_provider_booking_detail/${this.$route.params.id}`

      axios.get(appendWithurl).then(response => {
        console.log(response.data)
        this.formValues = response.data.data
        this.initTrHeight()
        console.log('Category Fetched')
      }).catch(error => {
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
  
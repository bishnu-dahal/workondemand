<template>
  <b-form @submit.prevent>
    <b-row>

      <b-col md="6">
        <b-form-group
          label="Promotion Code"
          label-for="v-code"
        >
          <b-form-input
            id="v-code'"
            v-model="formValues.code"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Discount"
          label-for="v-discount"
        >
          <b-form-input
            id="v-discount'"
            v-model="formValues.discount"
            type="number"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Total Vouchers"
          label-for="v-total_vouchers"
        >
          <b-form-input
            id="v-total_vouchers'"
            v-model="formValues.total_vouchers"
            type="number"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <label for="v-expiry_date">Expiry Date</label>
        <b-input-group>
          <cleave
            id="expiry_date"
            v-model="formValues.expiry_date"
            class="form-control"
            :raw="false"
            :options="options.date"
            placeholder="YYYY-MM-DD"
          />

          <b-input-group-append>
            <b-form-datepicker
              v-model="formValues.expiry_date"
              show-decade-nav
              button-only
              right
              locale="en-US"
              aria-controls="v-expiry_date"
            />
          </b-input-group-append>
        </b-input-group>
      </b-col>

      <b-col md="6">
        <b-form-group label="Description">
          <b-form-textarea
            id="notes"
            v-model="formValues.dis"
            placeholder="Search Note's Here.."
            rows="2"
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
        code: '',
        dis: '',
        discount: '',
        total_vouchers: '',
        expiry_date: '',
      },

    }
  },
  mounted() {
    this.initTrHeight()
    this.getPromotionDetail()
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
        .post(`/promotions/updatePromotion/${this.$route.params.id}`, this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/listPromotions').then(() => {
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
    getPromotionDetail() {
      console.log(this.$route.params.id)
      const appendWithurl = `promotions/getSinglePromotionById/${this.$route.params.id}`

      axios.get(appendWithurl).then(response => {
        this.formValues = response.data.data
        this.initTrHeight()
        console.log('Category Fetched')
      }).catch(error => {
        console.error(error)
      })
    },
    imageChange(e) {
      this.file = e.target.files[0]
    },
    imageUpload() {
      const formData = new FormData()
      formData.append('image', this.file)
      console.log(formData)
      axios
        .post('/categories/uploadFile', formData)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              this.formValues.image = response.data.filePATH
              this.Submit()
              console.log('image Url', this.formValues.image)
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: response.data.message,
                  icon: 'EditIcon',
                  variant: 'success',
                },
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

<template>
  <b-form @submit.prevent>
    <b-row>
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
      <b-col md="6">
        <b-form-group
          label="Attachment (*)."
          label-for="attachment"
        >
          <b-form-file
            id="attachment"
            v-model="formValues.image"
            accept="image/* , .pdf"
            placeholder="Upload attachment..."
            drop-placeholder="Drop file here..."
            @change="imageChange($event)"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Description"
          label-for="v-description"
        >
          <b-form-textarea
            id="v-description'"
            v-model="formValues.description"
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

import Cleave from 'vue-cleave-component'
import { image } from 'vee-validate/dist/rules'

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
        title: '',
        image: '',
        description: '',
      },
      file: '',

    }
  },
  mounted() {
    this.initTrHeight()
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
        .post('/onboarding/add_on_boarding', this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/onboardings').then(() => {
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
    imageChange(e) {
      this.file = e.target.files[0]
    },
    imageUpload() {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('path', 'uploads/onBoardings')
      console.log(formData)
      axios
        .post('/onboarding/uploadFile',
          formData)
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

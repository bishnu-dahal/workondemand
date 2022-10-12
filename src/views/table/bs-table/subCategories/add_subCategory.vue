<template>
  <b-form @submit.prevent>
    <b-row>
      <b-col md="6">
        <b-form-group
          label="Category"
          label-for="v-category_name"
        >
          <b-form-input
            id="v-category_name'"
            v-model="formValues.category_name"
            :readonly="disabled_category"
          />
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
      <b-col md="6">
        <b-form-group
          label="Color"
          label-for="v-color"
        >
          <b-form-input
            id="v-color'"
            v-model="formValues.color"
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
      disabled_category: true,

      formValues: {
        title: '',
        image: '',
        color: '',
        category_name: '',
        category_id: '',
      },

    }
  },
  mounted() {
    this.getCategoryDetail()
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
        .post('/subcategories/add_subCategories', this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)
              this.$router.replace(`/subCategories/${this.formValues.category_id}`).then(() => {
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
      console.log(formData)
      axios
        .post('/subcategories/uploadFile', formData)
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
    getCategoryDetail() {
      console.log(this.$route.params.id)
      const appendWithurl = `categories/getCategoryById/${this.$route.params.id}`

      axios.get(appendWithurl).then(response => {
        this.formValues.category_name = response.data.data.title
        this.formValues.category_id = response.data.data.id
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

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
          label="Category"
          label-for="v-category"
        >
          <v-select
            id="v-categoty"
            v-model="formValues.category_id"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :options="categories"
            label="text"
            :reduce="(text) => text.value"
            @input="assignCategory"
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
import vSelect from 'vue-select'

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
    vSelect,
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
        color: '',
        category_id: '',
        categoty: '',
      },
      categories: [],
      file: '',

    }
  },
  mounted() {
    this.getAllCategories()
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
        .post('/slider/add_slider', this.formValues)
        .then(response => {
          if (response.data.hasOwnProperty('success')) {
            if (response.data.success === true) {
              console.log(response.data.data)

              this.$router.replace('/sliders').then(() => {
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
      axios
        .post('/slider/uploadFile',
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
    getAllCategories() {
      const appendWithurl = 'categories/getAllCategoriesDropdown'
      axios.get(appendWithurl).then(response => {
        this.categories = response.data.data
        this.initTrHeight()
        console.log('Category Fetched')
      }).catch(error => {
        console.error(error)
      })
    },
    assignCategory(item) {
      // const val = this.categories.find(cat => cat.text === item).value
      // this.formValues.category_id = val
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

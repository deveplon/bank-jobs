<template>
  <div class="create-job-content">
    <toast />
    <b-card class="create-job-content">
      <b-form @submit="onSubmit">
        <h4 class="text-center mb-3">Create new job</h4>

        <b-form-row class="mb-3">
          <b-col class="d-flex justify-content-center">
            <label class="company-logo upload-image-label" for="uploadCompanyLogo">
              <img class="company-logo-img" :src="fileImage" />
            </label>
            <input
              id="uploadCompanyLogo"
              class="hidden-file-input"
              type="file"
              @change="uploadFile"
            />
          </b-col>

          <b-col class="d-flex justify-content-center">
            <div class="company-logo">
              <img class="company-logo-img" src="/company-logo.png" alt="Start IGU logo" />
            </div>
          </b-col>
        </b-form-row>

        <b-form-group
          v-for="(textInput, i) in textInputs"
          :id="`${textInput.id}-group`"
          :key="i"
          :label="textInput.label"
          :label-for="textInput.id"
        >
          <b-form-input
            :id="textInput.id"
            v-model="form[textInput.key]"
            :type="textInput.type ? textInput.type : 'text'"
            required
            :state="states[textInput.key]"
            :placeholder="`The ${textInput.label.toLowerCase()} here...`"
            @blur="states[textInput.key] = textInput.type === 'email' ? isValidEmail(form[textInput.key]) : isValidText(form[textInput.key])"
          />

          <b-form-invalid-feedback
            :state="states[textInput.key]"
            v-text="`Invalid ${textInput.label.toLowerCase()}`"
          />
          <b-form-valid-feedback :state="states[textInput.key]" v-text="'Looks Good.'" />
        </b-form-group>

        <b-button class="mt-5" type="submit" block variant="primary">
          <b-spinner v-if="loading" small variant="outline-primary" label="Small Spinner" />
          <span v-else>Create</span>
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

import { isValidText, isValidEmail } from '~/utils/form-validator.js'

export default {
  components: {
    Toast
  },
  data() {
    return {
      loading: false,
      companyLogoImg: '',
      images: {
        companyLogo: null
      },
      form: {
        jobTitle: '',
        workPlace: '',
        jobDescription: '',
        salary: '',
        start: '',
        contact: ''
      },
      states: {
        jobTitle: null,
        workPlace: null,
        jobDescription: null,
        salary: null,
        start: null,
        contact: null
      },
      textInputs: [
        { id: 'job-title', label: 'Job title', key: 'jobTitle' },
        { id: 'work-place', label: 'Work place', key: 'workPlace' },
        {
          id: 'job-description',
          label: 'Job description',
          key: 'jobDescription'
        },
        { id: 'salary', label: 'Salary', key: 'salary' },
        { id: 'start', label: 'Start', key: 'start', type: 'date' },
        { id: 'contact', label: 'Contact', key: 'contact', type: 'email' }
      ]
    }
  },
  computed: {
    fileImage() {
      return this.companyLogoImg ? this.companyLogoImg : '/no-image.png'
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const {
        job: { companyLogo }
      } = await $axios.$get('job/last')

      return { companyLogoImg: companyLogo }
    } catch (err) {
      return { companyLogoImg: '' }
    }
  },
  methods: {
    formatNames(files) {
      return files.length === 1 ? files[0].name : 'Select file'
    },
    uploadFile(e) {
      const reader = new FileReader()
      const file = e.target.files[0]
      reader.onload = e => {
        this.companyLogoImg = e.target.result
      }
      reader.readAsDataURL(file)
      this.images.companyLogo = file
    },
    async onSubmit(e) {
      e.preventDefault()

      this.loading = true

      const form = !this.images.companyLogo
        ? { job: { ...this.form, companyLogo: this.companyLogoImg } }
        : { file: this.images.companyLogo, job: this.form }

      const url = !this.images.companyLogo ? 'job/create' : 'job/createWithFile'
      try {
        await this.$store.dispatch(url, form)
        this.loading = false
        this.$store.dispatch('toast/showToast', {
          message: 'New job created',
          variant: 'success'
        })
        this.form = {
          jobTitle: '',
          workPlace: '',
          jobDescription: '',
          salary: '',
          start: '',
          contact: ''
        }
        setTimeout(() => {
          window.location = '/'
        }, 3500)
      } catch (err) {
        this.$store.dispatch('toast/showToast', { message: err.message })
        this.loading = false
      }
    },
    isValidText,
    isValidEmail
  }
}
</script>

<style scoped>
.create-job-content {
  width: 95%;
}
.company-logo {
  display: block;
  height: 80px;
}
.company-logo-img {
  display: block;
  height: 100%;
}
.hidden-file-input {
  display: none;
}
.upload-image-label {
  cursor: pointer;
}
</style>

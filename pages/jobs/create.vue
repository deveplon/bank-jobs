<template>
  <div class="create-job-content">
    <toast />
    <b-card class="create-job-content">
      <b-form @submit="onSubmit">
        <h4 class="text-center mb-3">
          Create new job
        </h4>

        <b-form-row class="mb-3">
          <b-col>
            <b-form-file
              v-model="images.bankLogo"
              :state="Boolean(images.bankLogo)"
              :file-name-formatter="formatNames"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
              accept="image/*"
            />
          </b-col>

          <b-col>
            <b-form-file
              v-model="images.companyLogo"
              :state="Boolean(images.companyLogo)"
              :file-name-formatter="formatNames"
              placeholder="Choose a file..."
              drop-placeholder="Drop file here..."
              accept="image/*"
            />
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
          <b-form-valid-feedback
            :state="states[textInput.key]"
            v-text="'Looks Good.'"
          />
        </b-form-group>

        <b-button class="mt-5" type="submit" block variant="primary">
          <b-spinner
            v-if="loading"
            small
            variant="outline-primary"
            label="Small Spinner"
          />
          <span v-else>
            Create
          </span>
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
      images: {
        bankLogo: null,
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
        { id: 'job-description', label: 'Job description', key: 'jobDescription' },
        { id: 'salary', label: 'Salary', key: 'salary' },
        { id: 'start', label: 'Start', key: 'start', type: 'date' },
        { id: 'contact', label: 'Contact', key: 'contact', type: 'email' }
      ]
    }
  },
  methods: {
    formatNames(files) {
      return files.length === 1 ? files[0].name : 'Select file'
    },
    async onSubmit(e) {
      e.preventDefault()
      try {
        await this.$store.dispatch('job/create', { file: this.images.companyLogo, job: this.form })
      } catch (err) {

      }
    },
    isValidText,
    isValidEmail
  }
}
</script>

<style>
.create-job-content {
  width: 95%;
}
</style>

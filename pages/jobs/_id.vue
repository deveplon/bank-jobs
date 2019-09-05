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
          <b-form-textarea
            v-if="textInput.type === 'textarea'"
            :id="textInput.id"
            v-model="form[textInput.key]"
            :placeholder="`The ${textInput.label.toLowerCase()} here...`"
            rows="5"
            max-rows="10"
          ></b-form-textarea>

          <b-form-input
            v-else
            :id="textInput.id"
            v-model="form[textInput.key]"
            :type="textInput.type ? textInput.type : 'text'"
            :placeholder="`The ${textInput.label.toLowerCase()} here...`"
          />
        </b-form-group>

        <b-button class="mt-5" type="submit" block variant="primary">
          <b-spinner v-if="loading" small variant="outline-primary" label="Small Spinner" />
          <span v-else>Update</span>
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

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
      textInputs: [
        { id: 'ui-job-id', label: 'UI Job Id', key: 'uiJobId' },
        { id: 'job-title', label: 'Job title', key: 'jobTitle' },
        { id: 'logo-url', label: 'Logo Url', key: 'logoUrl' },
        {
          id: 'company-address',
          label: 'Company Address',
          key: 'companyAddress'
        },
        {
          id: 'job-tasks',
          label: 'Job Tasks',
          key: 'jobTasks'
        },
        { id: 'driver-license', label: 'Driver License', key: 'driverLicense' },
        {
          id: 'language-demand',
          label: 'Language Demand',
          key: 'languageDemand'
        },
        {
          id: 'personal-profile',
          label: 'Personal Profile',
          key: 'personalProfile'
        },
        { id: 'working-hours', label: 'Working Hours', key: 'workingHours' },
        { id: 'salary', label: 'Salary', key: 'salary' },
        {
          id: 'work-body',
          label: 'Work Body',
          key: 'workBody',
          type: 'textarea'
        },
        { id: 'internship', label: 'Internship', key: 'internship' },
        {
          id: 'contract-start',
          label: 'Contract Start',
          key: 'contractStart',
          type: 'date'
        },
        {
          id: 'contract-end',
          label: 'Contract End',
          key: 'contractEnd',
          type: 'date'
        },
        {
          id: 'cv-deadline',
          label: 'CV Deadline',
          key: 'cvDeadline',
          type: 'date'
        },
        { id: 'contact', label: 'Contact', key: 'contact' }
      ]
    }
  },
  computed: {
    fileImage() {
      if (this.companyLogoImg) return this.companyLogoImg

      return this.form.companyLogo ? this.form.companyLogo : '/no-image.png'
    }
  },
  async asyncData({ redirect, $axios, params: { id } }) {
    try {
      const {
        job: { _id, ...form }
      } = await $axios.$get(`job/${id}`)

      return { jobId: id, form }
    } catch (err) {
      redirect('/')
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

      const { companyLogo, ...job } = this.form

      const formData = !this.images.companyLogo
        ? { id: this.jobId, job: this.form }
        : { id: this.jobId, file: this.images.companyLogo, job }

      const url = !this.images.companyLogo ? 'job/update' : 'job/updateWithFile'
      try {
        const newId = await this.$store.dispatch(url, formData)
        this.loading = false
        this.$store.dispatch('toast/showToast', {
          message: 'Job successfully updated',
          variant: 'success'
        })
        setTimeout(() => {
          window.location = `/jobs/${newId}`
        }, 2500)
      } catch (err) {
        this.$store.dispatch('toast/showToast', { message: err.message })
        this.loading = false
      }
    }
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

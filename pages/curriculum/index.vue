<template>
  <div class="contact">
    <toast />
    <b-card class="contact-form">
      <b-form @submit="onSubmit">
        <h2 class="text-center mb-4">Send Curriculum</h2>
        <b-form-group id="email-group" label="Email address:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            :state="validEmail"
            placeholder="Enter your email here"
            @blur="validEmail = isValidEmail(form.email)"
          />
          <b-form-invalid-feedback
            :state="validEmail"
          >Invalid email please use something like test@test.com</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validEmail">Looks Good.</b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="name-group" label="Your Name:" label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            required
            :state="validName"
            placeholder="Enter your name here"
            @blur="validName = isValidText(form.name)"
          />

          <b-form-invalid-feedback :state="validName">Invalid name, only accept letters</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validName">Looks Good.</b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="phone-group" label="Your Phone:" label-for="phone">
          <b-form-input
            id="phone"
            v-model="form.phone"
            type="number"
            required
            :state="validPhone"
            placeholder="Enter your phone here"
            @blur="validPhone = isValidNumber(form.phone)"
          />

          <b-form-invalid-feedback :state="validPhone">Invalid phone, only accept numbers</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validPhone">Looks Good.</b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="file-group" label="Your Curriculum:" label-for="curriculum">
          <b-form-file
            id="curriculum"
            v-model="curriculum"
            :state="Boolean(curriculum)"
            placeholder="Choose a file..."
            drop-placeholder="Drop file here..."
            :file-name-formatter="formatNames"
          />
        </b-form-group>

        <b-button class="mt-4" type="submit" block variant="outline-primary" :disabled="loading">
          <b-spinner v-if="loading" small variant="outline-primary" label="Small Spinner" />
          <span v-else>Submit</span>
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

import {
  isValidEmail,
  isValidText,
  isValidNumber
} from '~/utils/form-validator.js'

export default {
  layout: 'auth',
  middleware: 'auth/authenticated',
  components: {
    Toast
  },
  data() {
    return {
      curriculum: null,
      form: {
        email: '',
        name: '',
        phone: ''
      },
      validEmail: null,
      validName: null,
      validPhone: null,
      loading: false
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()

      if (!this.curriculum) {
        this.$store.dispatch('toast/showToast', {
          message: 'Curriculum file is required',
          variant: 'warning'
        })
        return
      }

      this.loading = true

      try {
        await this.$store.dispatch('contact/send', {
          file: this.curriculum,
          contact: this.form
        })

        this.loading = false
        this.$store.dispatch('toast/showToast', {
          message: 'New job created',
          variant: 'success'
        })
        this.form = {
          email: '',
          name: '',
          phone: ''
        }
      } catch (err) {
        this.$store.dispatch('toast/showToast', {
          message:
            'We experiment some problems and cannot process your request now'
        })
        this.loading = false
      }
    },
    formatNames(files) {
      if (files.length === 1) {
        return files[0].name
      }
      return `${files.length} files selected`
    },
    isValidEmail,
    isValidText,
    isValidNumber
  }
}
</script>

<style scoped>
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.contact-form {
  flex-basis: 50%;
  padding: 20px 25px 30px 25px;
  border: 1px solid var(--border-and-shadow);
  border-radius: 5px;
  box-shadow: 1px 2px 5px var(--border-and-shadow);
}
</style>

<template>
  <div class="sign-up-content">
    <toast />
    <b-card class="sign-up-content">
      <b-form @submit="onSubmit">
        <h4 class="text-center mb-3">Sing Up New User</h4>
        <b-form-group id="email-group" label="Email address:" label-for="email" inline>
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            :state="validEmail"
            placeholder="Enter email"
          />
        </b-form-group>

        <b-form-group id="name-group" label="Your Name:" label-for="name">
          <b-form-input
            id="name"
            v-model="form.name"
            required
            :state="validName"
            placeholder="Enter your name here"
          />
        </b-form-group>

        <b-form-group id="password-group" label="Your Password:" label-for="pass">
          <b-form-input
            id="pass"
            v-model="form.password"
            type="password"
            required
            :state="validPass"
            placeholder="Enter your password here"
          />
        </b-form-group>

        <b-form-group
          id="confirm-group"
          label="Your Password Confirmation:"
          label-for="confirm-pass"
        >
          <b-form-input
            id="confirm-pass"
            v-model="form.confirm"
            type="password"
            required
            :state="validConfirm"
            placeholder="Enter your password again here"
          />
        </b-form-group>

        <b-button class="mt-5" type="submit" block variant="primary">
          <b-spinner v-if="loading" small variant="outline-primary" label="Small Spinner" />
          <span v-else>Submit</span>
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

import { onSubmit } from '~/utils/auth.js'

export default {
  components: {
    Toast
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        confirm: ''
      },
      loading: false
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const submit = onSubmit.bind(this)
      await submit('auth/register', this.form, 'User succesfully created!')
    }
  }
}
</script>

<style scoped>
.sign-up-content {
  width: 100%;
}
</style>

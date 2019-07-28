<template>
  <div class="sign-up">
    <toast />
    <div class="sign-up-form">
      <b-form @submit="onSubmit">
        <h2 class="text-center mb-4">
          Sing Up
        </h2>
        <b-form-group id="email-group" label="Email address:" label-for="email">
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            required
            :state="validEmail"
            placeholder="Enter email"
            @blur="validEmail = isValidEmail(form.email)"
          />
          <b-form-invalid-feedback :state="validEmail">
            Invalid email please use something like test@test.com
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validEmail">
            Looks Good.
          </b-form-valid-feedback>
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

          <b-form-invalid-feedback :state="validName">
            Invalid name, only accept letters
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validName">
            Looks Good.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="password-group"
          label="Your Password:"
          label-for="pass"
        >
          <b-form-input
            id="pass"
            v-model="form.password"
            type="password"
            required
            :state="validPass"
            placeholder="Enter your password here"
            @blur="validPass = isValidPass(form.password)"
          />

          <b-form-invalid-feedback :state="validPass">
            The password must be at least 6 characters long
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validPass">
            Looks Good.
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group
          id="confirm-group"
          label="Your Password Confirmation:"
          label-for="pass"
        >
          <b-form-input
            id="pass"
            v-model="form.confirm"
            type="password"
            required
            :state="validConfirm"
            placeholder="Enter your password again here"
            @blur="validConfirm = match(form.password, form.confirm)"
          />

          <b-form-invalid-feedback :state="validConfirm">
            The password and password confirmation does not match
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validConfirm">
            Looks Good.
          </b-form-valid-feedback>
        </b-form-group>

        <b-button class="mt-4" type="submit" block variant="outline-primary">
          <b-spinner
            v-if="loading"
            small
            variant="outline-primary"
            label="Small Spinner"
          />
          <span v-else>
            Submit
          </span>
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

import {
  isValidText,
  isValidEmail,
  isValidPass,
  match
} from '~/utils/form-validator.js'

import { onSubmit } from '~/utils/auth.js'

export default {
  middleware: 'auth/authenticated',
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
      validEmail: null,
      validPass: null,
      validName: null,
      validConfirm: null,
      loading: false
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const submit = onSubmit.bind(this)
      await submit('auth/register', this.form)
    },
    isValidText,
    isValidEmail,
    isValidPass,
    match
  }
}
</script>

<style scoped>
.sign-up {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.sign-up-form {
  flex-basis: 30%;
  padding: 20px 25px 30px 25px;
  border: 1px solid var(--border-and-shadow);
  border-radius: 5px;
  box-shadow: 1px 2px 5px var(--border-and-shadow);
}
</style>

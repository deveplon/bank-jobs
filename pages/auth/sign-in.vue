<template>
  <div class="sign-in">
    <toast />
    <b-card class="login-form">
      <b-form @submit="onSubmit">
        <h2 class="text-center mb-4">
          Sing In
        </h2>
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
          <b-form-invalid-feedback :state="validEmail">
            Invalid email please use something like test@test.com
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validEmail">
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

        <div class="mt-4 d-flex justify-content-center">
          <NLink to="/remember-pass">
            forgot your password?
          </NLink>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

import { isValidEmail, isValidPass } from '~/utils/form-validator.js'
import { onSubmit } from '~/utils/auth.js'

export default {
  layout: 'auth',
  middleware: 'auth/authenticated',
  components: {
    Toast
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      validEmail: null,
      validPass: null,
      loading: false
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const submit = onSubmit.bind(this)
      await submit('auth/login', this.form)
    },
    isValidEmail,
    isValidPass
  }
}
</script>

<style scoped>
.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.login-form {
  flex-basis: 30%;
  padding: 20px 25px 30px 25px;
  border: 1px solid var(--border-and-shadow);
  border-radius: 5px;
  box-shadow: 1px 2px 5px var(--border-and-shadow);
}
</style>

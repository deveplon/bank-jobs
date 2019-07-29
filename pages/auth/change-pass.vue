<template>
  <div class="sign-up-content">
    <toast />
    <b-card class="sign-up-content">
      <b-form @submit="onSubmit">
        <h4 class="text-center mb-3">
          Change You Password
        </h4>

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
          label-for="confirm-pass"
        >
          <b-form-input
            id="confirm-pass"
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

        <b-button class="mt-5" type="submit" block variant="primary">
          <b-spinner
            v-if="loading"
            small
            variant="primary"
            label="Small Spinner"
          />
          <span v-else>
            Submit
          </span>
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Toast from '~/components/global/Toast.vue'

import { isValidPass, match } from '~/utils/form-validator.js'

import { onSubmit } from '~/utils/auth.js'

export default {
  components: {
    Toast
  },
  data() {
    return {
      form: {
        password: '',
        confirm: ''
      },
      validPass: null,
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
    isValidPass,
    match
  }
}
</script>

<style scoped>
.sign-up-content {
  width: 90%;
}
</style>

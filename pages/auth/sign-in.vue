<template>
  <div class="sign-in">
    <div class="login-form">
      <b-form v-if="show" @submit="onSubmit" @reset="onReset">
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
            placeholder="Enter email"
            @blur="validEmail = emailValidation"
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
            @blur="validPass = passwordValidation"
          />

          <b-form-invalid-feedback :state="validPass">
            The password must be at least 6 characters long
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validPass">
            Looks Good.
          </b-form-valid-feedback>
        </b-form-group>

        <b-button class="mt-4" type="submit" block variant="outline-primary">
          Submit
        </b-button>

        <div class="mt-4 d-flex justify-content-center">
          <NLink to="/remember-pass">
            forgot your password?
          </NLink>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth/authenticated',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      validEmail: null,
      validPass: null,
      show: true
    }
  },
  computed: {
    emailValidation() {
      return /\S+@\S+\.\S+/.test(this.form.email)
    },
    passwordValidation() {
      return /^[a-zA-Z0-9_\-#$^+=!*()@%&]*$/gm.test(this.form.password)
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(e) {
      e.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
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

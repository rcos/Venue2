<template>
  <div>
    <form class="login-form">
      <InputField ref="email_field" v-on:set-input-value="setEmail" label="username" />
      <InputField ref="password_field" v-on:set-input-value="setPassword" label="password" type="password" />
      <div v-if="show_invalid_login" id="invalid-login">Invalid username or password</div>
    </form>
  </div>
</template>

<script>
  import InputField from '@/components/InputField.vue'

  export default {
    name: 'LoginForm',
    components: {
      InputField
    },
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        show_invalid_login: false
      }
    },
    created() {
      window.addEventListener("keypress", (e) => {
        if (e.key == 'Enter') {
          console.log(`Attempting login`)
          this.login ()
        }
      })
    },
    methods: {
      login() {
        console.log("Login function was called.")

        this.$refs.email_field.emitInputValue()
        this.$refs.password_field.emitInputValue()
        console.log("Current User: " + this.user + " email: " + this.user.email +
          " password: " + this.user.password)
        this.$store.dispatch('login', this.user)
          .then(() => this.$router.push({name: 'dashboard'}))
          .catch((err) => this.show_invalid_login = true)
      },
      setEmail(email) {
        console.log("Received email: " + email)
        this.user.email = email
      },
      setPassword(password) {
        console.log("Received password: " + password)
        this.user.password = password
      }
    }
  }
</script>

<style>
/* Login Form */
.login-form {
  /*border: black solid;*/
  padding-top: 30px;
  position: relative;
  margin: auto;
  width: 28rem;
}

#invalid-login {
  color: #ff1100;
}
</style>

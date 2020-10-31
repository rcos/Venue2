<template>
  <div>
    <form class="login-form">
      <InputField ref="user_id_field" v-on:set-input-value="setUserId" label="user-id" id="username"/>
      <InputField ref="password_field" v-on:set-input-value="setPassword" label="password" id="password" type="password" />
      <div v-if="show_invalid_login" id="invalid-login">Invalid user id or password</div>
    </form>
  </div>
</template>

<script>
  import InputField from '@/components/InputField.vue'
  import AuthAPI from '@/services/AuthAPI.js';

  export default {
    name: 'LoginForm',
    components: {
      InputField
    },
    data() {
      return {
        user: {
          user_id: '',
          password: ''
        },
        show_invalid_login: false
      }
    },
    created() {
      window.addEventListener("keypress", (e) => {
        if (e.key == 'Enter') {
          this.login ()
        }
      })
    },
    methods: {
      login() {
        this.$refs.user_id_field.emitInputValue()
        this.$refs.password_field.emitInputValue()
        this.$store.dispatch('login', this.user)
          .then(() => this.$router.push({name: 'dashboard'}))
          .catch((err) => this.show_invalid_login = true)
      },
      signup() {
        this.$refs.user_id_field.emitInputValue()
        this.$refs.password_field.emitInputValue()
        AuthAPI.checkForTempUser(this.user.user_id, this.user.password).then(res => {
          let temp_user = res.data
          this.$router.push({name: 'set_permanent_password', params: {user_id: temp_user._id},
            query: {user: temp_user}})
        }).catch(err => { this.show_invalid_login = true})        
      },
      setUserId(user_id) {
        this.user.user_id = user_id
      },
      setPassword(password) {
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

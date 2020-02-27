<template>
  <div>
    <Logo />
    <LoginButton v-if="show_login_button" 
    v-on:show-login-form="showLoginForm"/>
    <LoginForm v-if="show_login_form" v-on:show-login-button="showLoginButton" />
  </div>
</template>

<script>
  import Logo from '@/components/Logo.vue'
  import LandingInfoSM from '@/components/LandingInfoSM.vue'
  import LoginButton from '@/components/LoginButton.vue'
  import LoginForm from '@/Forms/LoginForm.vue'

  export default {
    components: {
      Logo,
      LandingInfoSM,
      LoginButton,
      LoginForm
    },
    data() {
      return {
        show_login_button: true,
        show_login_form: false
      }
    },
    created() {
    },
    methods: {
      showLoginButton() {
        this.show_login_button = true
        this.show_login_form = false
      },
      showLoginForm() {
        this.show_login_form = true
        this.show_login_button = false
      }
    }
  }
</script>
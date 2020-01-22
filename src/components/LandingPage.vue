<template>
  <div>
    <LandingInfo />
    <LoginSignupButtons v-on:show-login-buttons="showLoginButtons" v-if="show_login_signup_buttons" />
    <LoginButtons v-else />
  </div>
</template>

<script>
  import LandingInfo from './LandingInfo.vue'
  import LoginSignupButtons from './LoginSignupButtons.vue'
  import LoginButtons from './LoginButtons.vue'

  export default {
    components: {
      LandingInfo,
      LoginSignupButtons,
      LoginButtons
    },
    data() {
      return {
        show_login_signup_buttons: true
      }
    },
    created() {
    },
    methods: {
      showLoginButtons() {
        console.log("I enter this function")
        this.show_login_signup_buttons = !this.show_login_signup_buttons
      }
    }
  }
</script>
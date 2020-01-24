<template>
  <div>
    <!-- <LandingInfo /> -->
<!--     <LoginSignupButtons v-if="show_login_signup_buttons" v-on:show-login-buttons="showLoginButtons" />
    <LoginButtons v-else /> -->
    <LandingInfoSM />
    <LoginForm />
  </div>
</template>

<script>
  import LandingInfo from './LandingInfo.vue'
  import LoginSignupButtons from './LoginSignupButtons.vue'
  import LoginButtons from './LoginButtons.vue'
  import LoginForm from './Forms/LoginForm.vue'
  import LandingInfoSM from './LandingInfoSM.vue'

  export default {
    components: {
      LandingInfo,
      LoginSignupButtons,
      LoginButtons,
      LoginForm,
      LandingInfoSM
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
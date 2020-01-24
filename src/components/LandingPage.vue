<template>
  <div>
<!--     <LandingInfo v-if="!show_login_form && !show_signup_form" />
    <LoginSignupButtons v-if="show_login_signup_buttons" 
    v-on:show-login-buttons="showLoginButtons" v-on:show-signup-buttons="showSignupButtons" />
    <LoginButtons v-if="show_login_buttons" v-on:show-login-form="showLoginForm" />
    <LandingInfoSM v-if="show_login_form || show_signup_form" />
    <LoginForm v-if="show_login_form" />
    <SignupForm v-if="show_signup_form" /> -->
    <!-- <StudentSignupForm /> -->
    <InstructorSignupForm />
  </div>
</template>

<script>
  import LandingInfo from './LandingInfo.vue'
  import LoginSignupButtons from './LoginSignupButtons.vue'
  import LoginButtons from './LoginButtons.vue'
  import LoginForm from './Forms/LoginForm.vue'
  import LandingInfoSM from './LandingInfoSM.vue'
  import StudentSignupForm from './Forms/StudentSignupForm.vue'
  import InstructorSignupForm from './Forms/InstructorSignupForm.vue'

  export default {
    components: {
      LandingInfo,
      LoginSignupButtons,
      LoginButtons,
      LoginForm,
      LandingInfoSM,
      StudentSignupForm,
      InstructorSignupForm
    },
    data() {
      return {
        show_login_signup_buttons: true,
        show_login_buttons: false,
        show_login_form: false,
        show_signup_form: false
      }
    },
    created() {
    },
    methods: {
      showLoginButtons() {
        this.setVisibilityFlagsToFalse()
        this.show_login_buttons = true
      },
      showSignupButtons() {
        this.setVisibilityFlagsToFalse()
        this.show_sign = true
      },
      showLoginForm() {
        this.setVisibilityFlagsToFalse()
        this.show_login_form = true
      },
      setVisibilityFlagsToFalse() {
        this.show_login_signup_buttons = false
        this.show_login_buttons = false
        this.show_login_form = false
        this.show_signup_form = false
      }
    }
  }
</script>
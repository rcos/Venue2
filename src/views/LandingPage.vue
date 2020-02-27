<template>
  <div>
    <LandingInfo v-if="!show_login_form" />
    <LandingInfoSM v-if="show_login_form" />
    <LoginButton v-if="show_login_button" 
    v-on:show-login-form="showLoginForm"/>
    <LoginForm v-if="show_login_form" v-on:show-login-button="showLoginButton" />

    <!-- For sign up form feature -->
<!--     <LandingInfo v-if="!show_login_form && !show_student_signup_form && !show_instructor_signup_form" />
    <LoginSignupButtons v-if="show_login_signup_buttons" 
    v-on:show-login-buttons="showLoginButtons" v-on:show-signup-buttons="showSignupButtons" />
    <LoginButtons v-if="show_login_buttons" v-on:show-login-form="showLoginForm" 
      v-on:show-signup-buttons="showSignupButtons"/>
    <SignupButtons v-if="show_signup_buttons" v-on:show-student-signup-form="showStudentSignupForm"
      v-on:show-instructor-signup-form="showInstructorSignupForm"
      v-on:show-login-buttons="showLoginButtons" />
    <LandingInfoSM v-if="show_login_form || show_student_signup_form || show_instructor_signup_form" />
    <LoginForm v-if="show_login_form" v-on:show-login-buttons="showLoginButtons" />
    <StudentSignupForm v-if="show_student_signup_form" v-on:show-signup-buttons="showSignupButtons" />
    <InstructorSignupForm v-if="show_instructor_signup_form" v-on:show-signup-buttons="showSignupButtons" /> -->
  </div>
</template>

<script>
  import LandingInfo from '@/components/LandingInfo.vue'
  import LandingInfoSM from '@/components/LandingInfoSM.vue'
  import LoginButton from '@/components/LoginButton.vue'
  import LoginForm from '@/Forms/LoginForm.vue'
  // import LoginButtons from './LoginButtons.vue'
  // import SignupButtons from './SignupButtons.vue'
  // import StudentSignupForm from './Forms/StudentSignupForm.vue'
  // import InstructorSignupForm from './Forms/InstructorSignupForm.vue'

  export default {
    components: {
      LandingInfo,
      LandingInfoSM,
      LoginButton,
      LoginForm
      // LoginButtons,
      // SignupButtons,
      // StudentSignupForm,
      // InstructorSignupForm
    },
    data() {
      return {
        show_login_button: true,
        show_login_form: false
        // show_login_signup_buttons: true,
        // show_login_buttons: false,
        // show_signup_buttons: false,
        // show_login_form: false,
        // show_student_signup_form: false,
        // show_instructor_signup_form: false
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
      // showLoginButtons() {
      //   this.setVisibilityFlagsToFalse()
      //   this.show_login_buttons = true
      // },
      // showSignupButtons() {
      //   this.setVisibilityFlagsToFalse()
      //   this.show_signup_buttons = true
      // },
      // showLoginForm() {
      //   this.setVisibilityFlagsToFalse()
      //   this.show_login_form = true
      // },
      // showStudentSignupForm() {
      //   this.setVisibilityFlagsToFalse()
      //   this.show_student_signup_form = true
      // },
      // showInstructorSignupForm() {
      //   this.setVisibilityFlagsToFalse()
      //   this.show_instructor_signup_form = true
      // },
      // setVisibilityFlagsToFalse() {
      //   this.show_login_signup_buttons = false
      //   this.show_login_buttons = false
      //   this.show_signup_buttons = false
      //   this.show_login_form = false
      //   this.show_student_signup_form = false
      //   this.show_instructor_signup_form = false
      // }
    }
  }
</script>
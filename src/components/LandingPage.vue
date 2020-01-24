<template>
  <div>
    <LandingInfo v-if="!show_login_form && !show_student_signup_form && !show_instructor_signup_form" />
    <LoginSignupButtons v-if="show_login_signup_buttons" 
    v-on:show-login-buttons="showLoginButtons" v-on:show-signup-buttons="showSignupButtons" />
    <LoginButtons v-if="show_login_buttons" v-on:show-login-form="showLoginForm" />
    <SignupButtons v-if="show_signup_buttons" v-on:show-student-signup-form="showStudentSignupForm"
      v-on:show-instructor-signup-form="showInstructorSignupForm" />
    <LandingInfoSM v-if="show_login_form || show_student_signup_form || show_instructor_signup_form" />
    <LoginForm v-if="show_login_form" />
    <StudentSignupForm v-if="show_student_signup_form" />
    <InstructorSignupForm v-if="show_instructor_signup_form" />
  </div>
</template>

<script>
  import LandingInfo from './LandingInfo.vue'
  import LoginSignupButtons from './LoginSignupButtons.vue'
  import LoginButtons from './LoginButtons.vue'
  import SignupButtons from './SignupButtons.vue'
  import LoginForm from './Forms/LoginForm.vue'
  import LandingInfoSM from './LandingInfoSM.vue'
  import StudentSignupForm from './Forms/StudentSignupForm.vue'
  import InstructorSignupForm from './Forms/InstructorSignupForm.vue'

  export default {
    components: {
      LandingInfo,
      LoginSignupButtons,
      LoginButtons,
      SignupButtons,
      LoginForm,
      LandingInfoSM,
      StudentSignupForm,
      InstructorSignupForm
    },
    data() {
      return {
        show_login_signup_buttons: true,
        show_login_buttons: false,
        show_signup_buttons: false,
        show_login_form: false,
        show_student_signup_form: false,
        show_instructor_signup_form: false
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
        this.show_signup_buttons = true
      },
      showLoginForm() {
        this.setVisibilityFlagsToFalse()
        this.show_login_form = true
      },
      showStudentSignupForm() {
        this.setVisibilityFlagsToFalse()
        this.show_student_signup_form = true
      },
      showInstructorSignupForm() {
        this.setVisibilityFlagsToFalse()
        this.show_instructor_signup_form = true
      },
      setVisibilityFlagsToFalse() {
        this.show_login_signup_buttons = false
        this.show_login_buttons = false
        this.show_signup_buttons = false
        this.show_login_form = false
        this.show_student_signup_form = false
        this.show_instructor_signup_form = false
      }
    }
  }
</script>
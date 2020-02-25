<template>
  <div class="page-overlap">
    <!-- <LandingInfo v-if="!show_login_form" />
    <LandingInfoSM v-if="show_login_form" />
    <LoginButton v-if="show_login_button"
    v-on:show-login-form="showLoginForm"/>
    <LoginForm v-if="show_login_form" v-on:show-login-button="showLoginButton" /> -->

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
    <div :style="{maxWidth: '500px', margin: '0 auto'}">
      <Logo :scale="3" :textScale="2" :minimized="false" :style="{marginBottom: '0px', marginTop: '150px'}"/>
      <Button value="Get Started" :onClick="()=>{ alert('Clicked!'); }" :style="{marginTop: '150px'}" />
    </div>

  </div>
</template>

<script>
  // import LandingInfo from './LandingInfo.vue'
  // import LoginButton from './LoginButton.vue'
  // import LoginButtons from './LoginButtons.vue'
  // import SignupButtons from './SignupButtons.vue'
  // import LoginForm from './Forms/LoginForm.vue'
  // import LandingInfoSM from './LandingInfoSM.vue'
  // import StudentSignupForm from './Forms/StudentSignupForm.vue'
  // import InstructorSignupForm from './Forms/InstructorSignupForm.vue'

  import Logo from './UI/Logo.vue'
  import Button from './UI/Button.vue'

  export default {
    components: {
      // LandingInfo,
      // LoginButton,
      // LoginButtons,
      // SignupButtons,
      // LoginForm,
      // LandingInfoSM,
      // StudentSignupForm,
      // InstructorSignupForm
      Logo,
      Button
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
    }
  }
</script>

<template>
  <div>
    <div v-if="!show_login_form">
      <Logo v-bind:show_large_logo="true" />
      <Button ref="GetStartedBtn" v-bind:btn_text="'Get Started'" v-on:button-clicked="showLoginForm" />
    </div>
    <div v-else>
      <Logo v-bind:show_large_logo="false" />
      <LoginForm ref="LoginForm" />
      <div id="login-signup-buttons" class="hidden">
        <a href="https://cas-auth.rpi.edu/cas/login?service=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Flogin">Login with CAS</a>
        <Button ref="LoginBtn" v-bind:btn_text="'Login'" v-on:button-clicked="login" />
        <p style="font-weight:bold;">or</p>
        <Button ref="SignupBtn" v-bind:btn_text="'Sign Up'" v-on:button-clicked="signup" />
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '@/components/Logo.vue'
  import Button from '@/components/Button.vue'
  import LoginForm from '@/Forms/LoginForm.vue'

  export default {
    components: {
      Logo,
      Button,
      LoginForm
    },
    data() {
      return {
        show_login_form: false
      }
    },
    created() {
    },
    methods: {
      showLoginForm() {
        let self = this
        setTimeout(function(){
          self.show_login_form = true
        }, 500)
        this.transitionButtons()
      },
      transitionButtons() {
        let get_started_btn = this.$refs.GetStartedBtn
        get_started_btn.fadeOut()
        setTimeout(function(){
          let login_sign_buttons = document.getElementById("login-signup-buttons")
          login_sign_buttons.classList.remove("hidden")
          login_sign_buttons.classList.add("visible")
        }, 1000)
      },
      login() {
        this.$refs.LoginForm.login()
      },
      signup() {
        this.$refs.LoginForm.signup()
      }
    }
  }
</script>

<style>
  .fade_out {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s linear 8000ms, opacity 8000ms;
  }
  .fade_in {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
  #login-signup-buttons {
    visibility: hidden;
  }
  .hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.2s, opacity 0.2s linear;
  }
  .visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 1s linear;
  }
</style>

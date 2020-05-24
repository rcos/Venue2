<template>
  <div>
    <div v-if="!show_login_form">
      <Logo v-bind:show_large_logo="true" />
      <!-- <Button ref="GetStartedBtn" v-bind:btn_str="'Get Started'" v-on:button-clicked="showLoginForm"/> -->
    </div>
    <div v-else>
      <Logo v-bind:show_large_logo="false" />
      <LoginForm ref="LoginForm" />
      <!-- <Button ref="LoginBtn" v-bind:btn_str="'Login'" v-on:button-clicked="login"/> -->
    </div>
    <Button ref="LandingBtn" v-on:button-clicked="handleBtnClick"/>
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
      handleBtnClick() {
        if(this.show_login_form)
          this.$refs.LoginForm.login()
        else {
          let self = this
          setTimeout(function(){
            self.show_login_form = true
          }, 500)
          let landing_btn = this.$refs.LandingBtn
          landing_btn.fadeOut()
          setTimeout(function(){
            landing_btn.toggleBtnText()
            landing_btn.fadeIn()
          }, 1000)

        }
      },
      showLoginForm() {
        this.show_login_form = true
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
</style>

<template>
  <div>
    <div v-if="!show_login_form">
      <Logo v-bind:show_large_logo="true" />
      <Button v-bind:btn_str="'Get Started'" v-on:button-clicked="showLoginForm"/>
    </div>
    <div v-else>
      <Logo v-bind:show_large_logo="false" />
      <LoginForm ref="LoginForm" />
      <Button v-bind:btn_str="'Login'" v-on:button-clicked="login"/>
    </div>
  </div>
</template>

<script>
  import Logo from '@/components/Logo.vue'
  import LandingInfoSM from '@/components/LandingInfoSM.vue'
  import Button from '@/components/Button.vue'
  import LoginForm from '@/Forms/LoginForm.vue'

  export default {
    components: {
      Logo,
      LandingInfoSM,
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
        this.show_login_form = true
      },
      login() {
        console.log("Login was called")
        this.$refs.LoginForm.login()
      }
    }
  }
</script>
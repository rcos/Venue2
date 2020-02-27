<template>
  <div>
    <div v-if="!show_login_form">
      <Logo v-bind:show_large_logo="true" />
      <Button v-bind:btn_str="'Get Started'" v-on:show-login-form="showLoginForm"/>
    </div>
    <div v-else>
      <Logo v-bind:show_large_logo="false" />
      <LoginForm />
      <Button v-bind:btn_str="'Login'"/>
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
      }
    }
  }
</script>
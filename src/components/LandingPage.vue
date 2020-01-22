<template>
  <div>
    <LandingInfo />
    <LoginSignupButtons />
  </div>
</template>

<script>
  import LandingInfo from './LandingInfo.vue'
  import LoginSignupButtons from './LoginSignupButtons.vue'

  export default {
    components: {
      LandingInfo,
      LoginSignupButtons
    },
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
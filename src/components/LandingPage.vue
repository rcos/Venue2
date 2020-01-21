<template>
  <div>
    <LandingInfo />

  </div>
</template>

<script>
  import LandingInfo from './LandingInfo.vue'

  export default {
    components: {
      LandingInfo
    },
    data() {
      return {
        user: {}
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
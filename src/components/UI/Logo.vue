<template>
  <div class="logo-container">
    <img src="../assets/venue-logo.svg" :width="renderSize(scale)"/>
    <div v-if="!minimized" class="logo-text">venue</div>
    <div v-if="!minimized" class="sub-logo"><span class="logo-secure">secure</span><span class="logo-attendance">attendance</span></div>
  </div>
</template>

<script>
export default {
  name: 'VenueLogo',
  props: {
    minimized: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  methods: {
    renderSize: (x) => {
      switch (x) {
        case 1:
          return "50px"
        case 2:
          return "80px"
        default:
          return "50px"
      }
    }
  }
}
</script>

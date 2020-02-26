<template>
  <div class="logo-container">
    <img src="../../assets/venue-logo.svg" :width="renderSize(scale)"/>
    <div v-if="!minimized" :style="{fontSize: '' + renderLogoFontSize(textScale)}" class="logo-text">venue</div>
    <div v-if="!minimized" :style="{fontSize: '' + renderSublogoFontSize(textScale)}" class="sub-logo">
      <span class="logo-secure">secure </span><span class="logo-attendance"> attendance</span>
    </div>
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
    },
    textScale: {
      type: Number,
      default: 1
    }
  },
  methods: {
    renderSize: (x) => {
      switch (x) {
        case 1:
          return "50rem"
        case 2:
          return "80rem"
        case 3:
          return "120rem"
        case 4:
          return "250rem"
        default:
          return "50px"
      }
    },
    renderLogoFontSize: (x) => {
      switch(x) {
        case 1:
          return '2rem'
        case 2:
          return '3.5rem'
        case 3:
          return '5rem'
        default:
          return '25rem'
      }
    },
    renderSublogoFontSize: (x) => {
        switch(x) {
          case 1:
            return '1rem'
          case 2:
            return '1.3rem'
          case 3:
            return '1.8rem'
          default:
            return '25px'
        }
    }
  }
}
</script>

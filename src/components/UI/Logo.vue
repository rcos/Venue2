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
          return "50px"
        case 2:
          return "80px"
        case 3:
          return "120px"
        default:
          return "50px"
      }
    },
    renderLogoFontSize: (x) => {
      switch(x) {
        case 1:
          return '25px'
        case 2:
          return '32px'
        default:
          return '25px'
      }
    },
    renderSublogoFontSize: (x) => {
        switch(x) {
          case 1:
            return '12px'
          case 2:
            return '15px'
          default:
            return '25px'
        }
    }
  }
}
</script>

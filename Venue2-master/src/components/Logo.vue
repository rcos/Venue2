<template>
  <div class="container">
    <div v-if="show_large_logo">
      <img src="@/assets/venue-logo.svg" class="venue-logo" alt="Venue Logo" aria-label="Venue Logo" style="width:15rem;" />
      <div><h1 class="logo-text" style="font-size:8rem;">venue</h1></div>
      <div class="sub-logo" style="font-size:1.5rem;">
        <span class="logotext1">gauging </span> 
        <span class="logotext2">engagement</span>
      </div>
    </div>
    <div v-else>
      <img src="@/assets/venue-logo.svg" class="venue-logo" alt="Venue Logo" aria-label="Venue Logo" style="width:10rem;" />
      <div><h1 class="logo-text" style="font-size:4rem;">venue</h1></div>
      <div class="sub-logo" style="font-size:1rem;">
        <span class="logotext1">gauging </span> 
        <span class="logotext2">engagement</span>
      </div>
    </div>
  </div>
</template>

<script>
  // Remove after halloween
  import PaletteAPI from '../services/PaletteAPI';

  export default {
    name: 'Logo',
    props: {
      show_large_logo: Boolean
    },
    data() {
      return {
      }
    },
    created() {
      let root = document.documentElement;
      PaletteAPI.setPalette(root, false);
    },
    methods: {
    }
  }
</script>

<style>
  :root {}
  .venue-logo {
    transition: width 0.75s;
  }

  .logotext1 {
    color:#ca3279; 
  }

  .logotext2 {
    color:#0078c2; 
  }
</style>

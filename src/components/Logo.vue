<template>
  <div class="container">
    <div v-if="show_large_logo">
      <img src="@/assets/venue-logo.svg" class="venue-logo" alt="Venue Logo" aria-label="Venue Logo" style="width:15rem;" />
      <div><h1 class="logo-text" style="font-size:8rem;">venue</h1></div>
      <div class="sub-logo" style="font-size:1.5rem;">
        <span class="logotext1">secure </span> 
        <span class="logotext2">attendance</span>
      </div>
    </div>
    <div v-else>
      <img src="@/assets/venue-logo.svg" class="venue-logo" alt="Venue Logo" aria-label="Venue Logo" style="width:10rem;" />
      <div><h1 class="logo-text" style="font-size:4rem;">venue</h1></div>
      <div class="sub-logo" style="font-size:1rem;">
        <span class="logotext1">secure </span> 
        <span class="logotext2">attendance</span>
      </div>
    </div>
  </div>
</template>

<script>
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
    },
    methods: {
    }
  }
</script>

<style>
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

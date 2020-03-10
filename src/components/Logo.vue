<template>
  <div class="container">
    <div v-if="show_large_logo">
      <img src="@/assets/venue-logo.svg" class="venue-logo" style="width:15rem;" />
      <div class="logo-text" style="font-size:8rem;">venue</div>
      <div class="sub-logo" style="font-size:1.5rem;">
        <span style="color:#e83e8c">secure </span> 
        <span style="color:#007bff">attendance</span>
      </div>
    </div>
    <div v-else>
      <img src="@/assets/venue-logo.svg" class="venue-logo" style="width:10rem;" />
      <div class="logo-text" style="font-size:4rem;">venue</div>
      <div class="sub-logo" style="font-size:1rem;">
        <span style="color:#e83e8c">secure </span> 
        <span style="color:#007bff">attendance</span>
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
</style>

<template>
  <div id="app">
    <NavBarNew v-if="this.$route.name != 'landing_page'" />
    <router-view />
    <Footer />
  </div>
</template>
<script>

import NavBarNew from "./components/NavBarNew.vue";
import Footer from "./components/Footer.vue";
import '@/assets/css/venue.css'

export default {
  components: {
    NavBarNew,
    Footer
  }
  //initially displayNav is false because the first page loaded is the homepage
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
}
</style>

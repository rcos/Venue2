<template>
  <div id="app">
    <NavBar v-if="displayNav"></NavBar>
    <!-- Renders correct component for the given path -->
    <router-view />
  </div>
</template>
<script>

import NavBar from "./components/NavBar.vue";
// import Footer from "./components/Footer.vue";

export default {
  components: {
    NavBar,
    // Footer
  },
  //initially displayNav is false because the first page loaded is the homepage
  data: function () {
    return {
      displayNav: false
    }
  },
  //watches for routing changes
  //do not load the navbar for the home page
  watch: {
    '$route': function(){
      if(this.$route.fullPath === '/'){
        console.log("homepage");
        this.displayNav = false
      }
      else {
        console.log("not homepage");
        this.displayNav = true
      }
    }
  }
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

// Import Bulma's core
// @import "~bulma/sass/utilities/_all";
//
// // Set your colors
// $primary: #8c67ef;
// $primary-invert: findColorInvert($primary);
// $twitter: #4099FF;
// $twitter-invert: findColorInvert($twitter);
//
// // Setup $colors to use as bulma classes (e.g. 'is-twitter')
// $colors: (
//     "white": ($white, $black),
//     "black": ($black, $white),
//     "light": ($light, $light-invert),
//     "dark": ($dark, $dark-invert),
//     "primary": ($primary, $primary-invert),
//     "info": ($info, $info-invert),
//     "success": ($success, $success-invert),
//     "warning": ($warning, $warning-invert),
//     "danger": ($danger, $danger-invert),
//     "twitter": ($twitter, $twitter-invert)
// );
//
// // Links
// $link: $primary;
// $link-invert: $primary-invert;
// $link-focus-border: $primary;
//
// // Import Bulma and Buefy styles
// @import "~bulma";
// @import "~buefy/src/scss/buefy";
</style>

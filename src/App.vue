<template>
  <div id="app">

    <div class="fixed-header">
      <div class="logo-padder"><Logo minimized/></div>
      <div class="logged-in-user">Hello, <font color="#620588">Millie Bobbie-Brown</font></div>
    </div>
    <div class="fixed-buffer"></div>

    <div class="container" :style="{marginBottom: '30px'}">
      <div class="row" :style="{textAlign: 'center'}">
        <div class="col-4"><router-link to="/classes"><div :class="getNavClass('classes')">Classes</div></router-link></div>
        <div class="col-4"><router-link to="/events"><div :class="getNavClass('events')">Events</div></router-link></div>
        <div class="col-4"><router-link to="/profiles"><div :class="getNavClass('profiles')">Profile</div></router-link></div>
      </div>
    </div>

    <div class="container-fluid content-container">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>
<script>

// import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import Logo from './components/UI/Logo.vue'
import './css/venue.css'
import './css/bootstrap-4.0.0/bootstrap-grid.scss'
import './css/bootstrap-4.0.0/bootstrap-reboot.scss'

export default {
  components: {
    // NavBar,
    Logo,
    Footer
  },
  methods: {
    getNavClass: (nav_link) => {
      // Determine which button should have the active class value
      let site_dir = window.location.href.split('/')
      if (site_dir.length > 0) {
        let last_path = site_dir[site_dir.length - 1]

        if (last_path == nav_link)
          return 'nav-btn active'
      }

      return 'nav-btn'
    }
  }
  //initially displayNav is false because the first page loaded is the homepage
  // data: function () {
  //   return {
  //     displayNav: false
  //   }
  // },
  //watches for routing changes
  //do not load the navbar for the home page
  // watch: {
  //   '$route': function(){
  //     if(this.$route.fullPath === '/' || this.$route.fullPath === '/Login' || this.$route.fullPath === '/Register'){
  //       console.log("homepage");
  //       this.displayNav = false
  //     }
  //     else {
  //       console.log("not homepage");
  //       this.displayNav = true
  //     }
  //   }
  // }
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

// Abdul 2/25
.logo-padder {
  margin: 30px 0px 20px 0px;
}

.logged-in-user {
  width: 250px;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  opacity: 0.8;
  position: relative;
  top: -15px;
  cursor: pointer;
}

.nav-btn {
  text-align: center;
  min-width: 50px;
  max-width: 300px;
  margin: 0 auto;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  color: #888888;
  opacity: 0.71;
  font-weight: bold;
  position: relative;
}

.nav-btn.active {
  color: black;
  opacity: 0.71;
}

.nav-btn.active::before {
  content: '';
  background-color: #C391D6;
  position: absolute;
  width: 40px;
  height: 4px;
  top: 28px;
  border-left: 5px solid #F4F7F9;
}

.content-container {
  padding: 0px 10%;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.fixed-buffer {
  margin-bottom: 110px;
}
</style>

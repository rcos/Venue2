<template>
  <div id="app">
    <!-- <NavBar v-if="this.$route.name != 'landing_page'"></NavBar> -->
    <div :style="{marginTop: '145px'}">
      <div v-if="!mobileView()"><DesktopNavbar /></div>
      <div v-if="mobileView()"><MobileNavbar /></div>
    </div>
    <div class="body-container">
      <router-view :mobileView="mobileView" />
    </div>
    <Footer />
  </div>
</template>
<script>

import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import '@/assets/css/venue.css'
import '@/assets/css/animate.css'
import MobileNavbar from "./components/MobileNavbar.vue"
import DesktopNavbar from './components/DesktopNavbar.vue'

export default {
  components: {
    NavBar,
    Footer,
    MobileNavbar,
    DesktopNavbar
  },
  created() {
      // attach event listener on onresize
      // window.addEventListener('resize', changeViewRendered.bind(vm))
      console.log("Created")
  },
  data(){
    return {
      screen_width: 0
    }
  },
  mounted() {
    console.log("Mounted")
    window.addEventListener('resize', this.changeViewRendered)
    this.changeViewRendered()
  },
  methods: {
    changeViewRendered () {
      this.screen_width = window.innerWidth
    },
    mobileView () {
      return this.screen_width <= 750
    }
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

.body-container {
  text-align: left;
  padding: 0px 0px;
}
</style>

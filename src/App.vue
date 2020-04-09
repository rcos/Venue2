<template>
  <div id="app">
    <div id="main-content">
      <NavBar v-if="this.$route.name != 'landing_page'"></NavBar>
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>

import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import '@/assets/css/venue.css'

export default {
  components: {
    NavBar,
    Footer
  },
  methods:{

    // check if the user is logged in, if the route is not the landing page
    checkLoggedIn: () => {
      if (this.$route.name != 'landing_page ' && this.$store.getters.loggedIn) {
        // redirect to login page
        this.$router.push({name: 'landing_page'})
      }
    }
  },
  mounted(){
    this.checkLoggedIn()
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
  min-height: 100%;
  position: relative;
}

#main-content {
  padding-bottom: 3rem;
}
</style>

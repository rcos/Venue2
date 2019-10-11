<template>
  <div>
    <NavBar v-if="displayNav"></NavBar>
    <!-- Renders correct component for the given path -->
    <router-view />
  </div>
</template>

<script>

import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar
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

<style lang="css">

html,body{
  margin: 0;
  padding: 0;
}

</style>

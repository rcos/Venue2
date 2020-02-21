<template>
  <div>
    <nav class="navbar navbar-light venue-nav">
      <a class="navbar-brand" :href="'/dashboard'">
        <img src="@/assets/venuelogo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        Venue
      </a>
    </nav>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'NavBar',
    computed: {
    },
    components: {
    },
    data(){
      return {
      }
    },
    created() {
      this.getCurrentUser()
    },
    methods: {
      // Get user from localstorage
      getCurrentUser() {
        const userString = localStorage.getItem('user')
        const userData = JSON.parse(userString)
        console.log("user: " + userData)
      }
    }
  }
</script>

<style scoped>
  .venue-nav {
    border-style: none none solid none;
    border-bottom: #e0e0e0 solid thin;
    padding-left: 1.5rem;
  }
</style>
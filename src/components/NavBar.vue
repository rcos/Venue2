<template>
  <div>
    <nav class="navbar navbar-light venue-nav navbar-expand-lg">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" :href="'/dashboard'">
        <img src="@/assets/venuelogo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        Venue
      </a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Courses</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Events</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Grading</a>
          </li>
        </ul>
      </div>
      <div class="float-right">
        <p class="d-inline-block mr-2">Numfor Tiapo</p>
        <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="">
      </div>
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
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .settings {
    cursor: pointer;
  }

/*  .user-name {
    position: relative;
    float: right;
  }*/
</style>
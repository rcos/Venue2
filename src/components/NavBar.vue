<template>
  <div>
    <nav class="navbar navbar-light venue-nav navbar-expand-lg">
      <hide-at breakpoint="small">
        <a class="navbar-brand navbar-logo" :href="'/dashboard'">
          <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        </a>
      </hide-at>
      <show-at breakpoint="small">
        <a class="navbar-brand navbar-logo" style="border:none;" data-toggle="collapse" data-target="#navbarNav">
          <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        </a>
      </show-at>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a v-if="this.$route.name === 'dashboard'" class="nav-link active" href="#">Dashboard</a>
            <a v-else class="nav-link" href="#">Dashboard</a>
          </li>
          <li class="nav-item">
            <a v-if="this.$route.name === 'events'" class="nav-link active" href="#">Events</a>
            <a v-else class="nav-link" href="#">Events</a>
          </li>
          <li class="nav-item">
            <a v-if="this.$route.name === 'grading'" class="nav-link active" href="#">Grading</a>
            <a v-else class="nav-link" href="#">Grading</a>
          </li>
          <show-at breakpoint="small">
            <li class="nav-item">
              <a v-if="this.$route.name === 'settings'" class="nav-link active" href="#">Settings</a>
              <a v-else class="nav-link" href="#">Settings</a>
            </li>
          </show-at>
        </ul>
      </div>
      <div class="float-right">
        <p class="d-inline-block mr-2">Numfor Tiapo</p>
        <hide-at breakpoint="small">
          <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="">
        </hide-at>
      </div>
    </nav>

  </div>
</template>

<script>
  import {showAt, hideAt} from 'vue-breakpoints'
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'NavBar',
    computed: {
    },
    components: {
      hideAt,
      showAt
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
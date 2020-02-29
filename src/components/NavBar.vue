<template>
  <div>
    <nav class="navbar navbar-light venue-nav navbar-expand-lg">
      <hide-at breakpoint="mediumAndBelow">
        <a class="navbar-brand navbar-logo" :href="'/dashboard'">
          <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        </a>
      </hide-at>
      <show-at breakpoint="mediumAndBelow">
        <a class="navbar-brand navbar-logo" style="border:none;" data-toggle="collapse" data-target="#navbarNav">
          <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        </a>
      </show-at>
      <show-at breakpoint="mediumAndBelow">
        <div class="float-right">
          <p class="d-inline-block mr-2">{{ current_user.first_name }} {{ current_user.last_name }}</p>
        </div>
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
          <show-at breakpoint="mediumAndBelow">
            <li class="nav-item">
              <a v-if="this.$route.name === 'settings'" class="nav-link active" href="#">Settings</a>
              <a v-else class="nav-link" href="#">Settings</a>
            </li>
          </show-at>
        </ul>
      </div>
      <hide-at breakpoint="mediumAndBelow">
        <div class="float-right">
          <p class="d-inline-block mr-2">{{ current_user.first_name }} {{ current_user.last_name }}</p>
          <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="">
        </div>
      </hide-at>

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
        current_user: {}
      }
    },
    created() {
      this.getCurrentUser()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
      },
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
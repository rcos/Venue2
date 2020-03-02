<template>
  <div>
    <div class="logo-area">

        <img src="@/assets/venue-logo.svg" width="35px" height="35px" class="d-inline-block align-top" alt="" />
    </div>
    <div class="navlinks">
    <a href="#" class="nav-link">Courses</a>
      <a href="#" class="nav-link active">Dashboard</a>
      <a href="#" class="nav-link">Settings</a>
    </div>
    <!-- <nav class="navbar navbar-light venue-nav navbar-expand-lg">
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

    </nav> -->


  </div>
</template>

<script>
  // import {showAt, hideAt} from 'vue-breakpoints'
  // import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'NavBar',
    computed: {
    },
    components: {
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
        const user_string = localStorage.getItem('user')
        const user_data = JSON.parse(user_string)
        this.current_user = user_data.current_user
      }
    }
  }
</script>

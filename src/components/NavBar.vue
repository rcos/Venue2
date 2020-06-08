<template>
  <div>
    <nav id="venue-nav">
      <!-- Logo -->
      <router-link id="nav-logo" :to="{name: 'dashboard'}">
        <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      </router-link>
      <!-- Nav Links -->
      <div id="venue-nav-links">
        <!-- Dashboard -->
        <div class="venue-nav-link-container" v-if="this.$route.name === 'dashboard'">
          <router-link class="venue-nav-link active-link" :to="{name: 'dashboard'}">
            Dashboard
          </router-link>
          <div class="active-link-underline"></div>
        </div>
        <div v-else class="venue-nav-link-container">
          <router-link class="venue-nav-link" :to="{name: 'dashboard'}">
            Dashboard
          </router-link>
        </div>
        <!-- Courses -->
        <show-at breakpoint="mediumAndBelow">
          <div v-if="this.$route.name === 'user_courses'" class="venue-nav-link-container">
            <router-link class="venue-nav-link active-link" :to="{name: 'user_courses'}">
              Courses
            </router-link>
            <div class="active-link-underline"></div>
          </div>
          <div v-else class="venue-nav-link-container">
            <router-link class="venue-nav-link" :to="{name: 'user_courses'}">
              Courses
            </router-link>
          </div>
        </show-at>
        <!-- Attendance -->
        <!-- <hide-at breakpoint="small">
          <div v-if="this.$route.name === 'attendance'" class="venue-nav-link-container">
            <a class="venue-nav-link active-link" href="#">Attendance</a>
            <div class="active-link-underline"></div>
          </div>
          <div v-else class="venue-nav-link-container">
            <a class="venue-nav-link" href="#">Attendance</a>
          </div>
        </hide-at> -->
      </div>
      <!-- Name -->
      <hide-at breakpoint="mediumAndBelow">
        <router-link :to="{name: 'settings'}">
          <div class="user-name float-right">
            <p class="d-inline-block mr-2">{{ current_user.first_name }} {{ current_user.last_name }}</p>
            <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="">
          </div>
        </router-link>
      </hide-at>
      <show-at breakpoint="mediumAndBelow">
        <router-link :to="{name: 'settings'}">
          <div class="user-name float-right">
            <p class="d-inline-block mr-2">{{ current_user.first_name }}</p>
          </div>
        </router-link>
      </show-at>
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
  #venue-nav {
    /*border-style: none none solid none;*/
    /*border-bottom: #e0e0e0 solid thin;*/
    padding-left: 2rem;
    padding-right: 2rem;
    /*padding-top: 1rem;*/
    padding-bottom: 0.5rem;
    overflow: hidden;
  }

  @media (min-width: 577px) {
    #venue-nav{
      padding-top: 1rem;
    }
  }

  /*Small devices (landscape phones, 576px and up)*/
  @media (max-width: 575.98px) {
    #venue-nav {
      padding-top: 1.5rem;
    }
  }

  #nav-logo {
    float: left;
  }

  #venue-nav-links {
    margin-top: 5px;
    float: left;
    /*padding: 1px;*/
  }

  .venue-nav-link-container {
    margin-left: 1.5rem;
    display: inline-block;
  }

  .venue-nav-link{
    text-decoration: none;
    color: #858585;
    font-weight: bold;
  }

  .active-link {
    color: #466D85;
  }

  .active-link-underline {
    height: 3px;
    width: 80%;
    background-color: #466D85;
    margin: auto;
  }

  .user-name {
    margin-top: 5px;
    font-weight: bold;
  }

  .settings {
    cursor: pointer;
    margin-top: 2px;
  }
</style>

<template>
  <div>
    <nav id="venue-nav">
      <!-- Logo -->
      <router-link id="nav-logo" :to="{name: 'dashboard'}" role="link" aria-label="Dashboard">
        <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="Venue Logo" aria-label="Venue Logo">
      </router-link>
      <!-- Nav Links -->
      <div id="venue-nav-links">
        <!-- Dashboard Link -->
        <div class="venue-nav-link-container">
          <router-link class="venue-nav-link" :class="{'active-link':is_dashboard}" :to="{name: 'dashboard'}">
            <p>Dashboard</p>
          </router-link>
          <div v-if="is_dashboard" class="active-link-underline"></div>
        </div>
        <!-- Courses Link -->
        <div class="venue-nav-link-container">
          <router-link class="venue-nav-link" :class="{'active-link':is_courses}"  :to="{name: 'user_courses'}">
            Courses
          </router-link>
          <div v-if="is_courses" class="active-link-underline"></div>
        </div>
        <!-- Statistics Link -->
        <div v-if="is_instructor" class="venue-nav-link-container">
          <router-link class="venue-nav-link" :class="{'active-link':is_statistics}" :to="{name: 'statistics'}">
            Statistics
          </router-link>
          <div v-if="is_statistics" class="active-link-underline"></div>
        </div>
      </div>
      <!-- Settings Link -->
      <router-link :to="{name: 'settings'}" role="link" aria-label="User Settings" class="settings_link">
        <div class="user-name float-right">
          <hide-at breakpoint="small">
            <p class="d-inline-block mr-2" aria-label="User Name">{{ current_user.first_name }} {{ current_user.last_name }}</p>
          </hide-at>
          <show-at breakpoint="small">
            <p v-if="!is_instructor" class="d-inline-block mr-2" aria-label="User Name">{{ current_user.first_name }} {{ current_user.last_name }}</p>
          </show-at>
          <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="Settings Icon" aria-label="Settings Icon">
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script>
  import {showAt, hideAt} from 'vue-breakpoints'
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'NavBar',
    computed: {
      is_dashboard: function () {
        return this.$route.name === 'dashboard'
      },
      is_courses: function () {
        return this.$route.name === 'user_courses'
      },
      is_statistics: function () {
        return this.$route.name === 'statistics'
      }
    },
    components: {
      hideAt,
      showAt
    },
    data(){
      return {
        current_user: {},
        is_instructor: Boolean
      }
    },
    created() {
      this.getCurrentUser()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
        this.is_instructor = this.current_user.is_instructor
      },
    }
  }
</script>

<style scoped>
  #venue-nav {
    height: 4rem;
    padding: 1rem 2rem;
    background: white;
    overflow: hidden;
  }

  /* @media (min-width: 577px) {
    #venue-nav{
      padding-top: 1rem;
    }
  } */

  /*Small devices (landscape phones, 576px and up)*/
  /* @media (max-width: 575.98px) {
    #venue-nav {
      padding-top: 1.5rem;
    }
  } */

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
    color: #575757;
    font-weight: 100;
  }

  .active-link {
    color: #466D85;
  }

  .active-link:hover,
  .active-link:focus {
    color: #575757;
  }

  .active-link-underline {
    height: 2px;
    width: 80%;
    background-color: #466D85;
    margin: auto;
  }

  .user-name {
    margin-top: 5px;
    font-weight: 100;
  }

  .settings {
    cursor: pointer;
    margin-top: 2px;
  }

  .venue-nav-link:focus,
  .settings_link:focus {
    outline: none;
  }

  .venue-nav-link:hover,
  .settings_link:hover .mr-2,
  .venue-nav-link:focus,
  .settings_link:focus .mr-2,
  .venue-nav-link:focus p,
  .venue-nav-link:hover p {
    color: #466D85;
  }
</style>

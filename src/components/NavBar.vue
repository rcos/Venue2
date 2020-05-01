<template>
  <div>
    <nav id="venue-nav">
      <!-- Logo -->
      <a id="nav-logo" href="/dashboard">
        <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      </a>
      <!-- Nav Links -->
      <div id="venue-nav-links">
        <!-- Dashboard -->
        <div class="venue-nav-link-container" v-if="this.$route.name === 'dashboard'">
          <a class="venue-nav-link active-link" href="/dashboard">Dashboard</a>
          <div class="active-link-underline"></div>
        </div>
        <div v-else class="venue-nav-link-container">
          <a class="venue-nav-link" href="/dashboard">Dashboard</a>
        </div>
        <!-- Courses -->
        <show-at breakpoint="mediumAndBelow">
          <div v-if="this.$route.name === 'user_courses'" class="venue-nav-link-container">
            <a class="venue-nav-link active-link" href="/user_courses">Courses</a>
            <div class="active-link-underline"></div>
          </div>
          <div v-else class="venue-nav-link-container">
            <a class="venue-nav-link" href="/user_courses">Courses</a>
          </div>
        </show-at>
        <!-- Attendance -->
        <hide-at breakpoint="small">
          <div v-if="this.$route.name === 'attendance'" class="venue-nav-link-container">
            <a class="venue-nav-link active-link" href="#">Attendance</a>
            <div class="active-link-underline"></div>
          </div>
          <div v-else class="venue-nav-link-container">
            <a class="venue-nav-link" href="#">Attendance</a>
          </div>
        </hide-at>
      </div>
    </nav>

    <!-- Name -->
    <hide-at breakpoint="mediumAndBelow">
        <router-link :to="{name: 'settings'}">
          <div class="user-name float-right">
            <div v-on:click="toggleSettings" class="name-box">{{ current_user.first_name }} {{ current_user.last_name }}</div>
          </div>
        </router-link>
      </hide-at>
      <show-at breakpoint="mediumAndBelow">
        <router-link :to="{name: 'settings'}">
          <div class="user-name float-right user-top-right">
            <p class="d-inline-block mr-2">{{ current_user.first_name }}</p>
          </div>
        </router-link>
      </show-at>
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
        current_user: {},
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

  .user-top-right {
    color: rgba(0, 0, 0, 0.8);
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
    position: absolute;
    overflow: visible;
    top: 10px;
    right: 40px;
    cursor: pointer;
  }

  .user-name .name-box {
    margin-top: 5px;
    font-weight: bold;
    padding: 5px 20px;
    position: relative;
    border-radius: 3px;
    transition: background 0.25s, border 0.25s;
    overflow: visible;
    border: 1px solid transparent;
    color: #466D85;
    border: 1px solid transparent;
  }

  .user-name .name-box:hover {
    border: 1px solid #466D85;
  }

  .user-name .user-dropdown {
    position: absolute;
    height: 70px;
    top: 55px;
    width: 150px;
    right: 0;
    text-align: center;
    padding: 0;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #466D85;
  }

  .user-name .user-dropdown ul {
    margin: 0;
    padding: 0;
    margin-left: 15px;
    margin-top: 0px;
  }

  .user-name .user-dropdown .settings-btn, .user-name .user-dropdown .logout-btn {
    list-style: none;
    width: 120px;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    font-size: 0.85rem;
  }

  .user-name .user-dropdown .settings-btn {
    color: #466D85;
    margin-bottom: 3px;
  }

  .user-name .user-dropdown .logout-btn {
    background-color: #FB5C5C;
    color: white;
    border: 1px solid rgba(251, 58, 58, 0.7);
  }

  .settings {
    cursor: pointer;
    margin-top: 2px;
  }
</style>
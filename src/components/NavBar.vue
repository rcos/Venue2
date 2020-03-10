<template>
  <div>
    <nav id="venue-nav">

      <a id="nav-logo" href="#">
        <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="">
      </a>

      <div id="venue-nav-links">
        <a class="venue-nav-link active-link" href="#">Dashboard</a>
        <a class="venue-nav-link" href="#">Attendance</a>
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
    border-style: none none solid none;
    border-bottom: #e0e0e0 solid thin;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.25rem;
    padding-bottom: 0.5rem;
    overflow: hidden;
  }

  #nav-logo {
    float: left;
  }

  #venue-nav-links {
    margin-top: 0.35rem;
    /*border: black solid;*/
    float: left;
    /*padding: 1px;*/
  }

  .venue-nav-link{
    margin-left: 45px;
    text-decoration: none;
    color: #858585;
    font-weight: bold;
  }

  .active-link {
    color: #466D85;
  }

  #user-name {
    position: relative;
    display: inline-block;
    float: right;
  }

  .navbar-links {
    border: black solid;
    position: relative;
    float: left;
  }




  .settings {
    cursor: pointer;
  }

/*  .user-name {
    position: relative;
    float: right;
  }*/
</style>
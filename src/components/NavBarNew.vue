<template>
  <div>

    <!-- Logo Area -->
    <div class="logo-area">
      <div class='logo-container'>
          <img src="@/assets/venue-logo.svg" width="50" height="50" class="d-inline-block align-top" alt="">
      </div>
      <div class='user-info'>Hello, <font color="#65068D">Numford Tiapo</font></div>
    </div>

    <!-- Navigation Button Area -->
    <div class="nav-bar">
      <div class="nav-link"><a href="#" class="active">Dashboard</a></div>
      <div class="nav-link"><a href="#">Events</a></div>
      <div class="nav-link"><a href="#">Grading</a></div>
    </div>

  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'NavBarNew',
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

<style>
.logo-container {
  padding: 30px 0px 10px 0px;
  text-align: center;
}

.logo-area .user-info {
  cursor: pointer;
}

.nav-bar {
  padding-top: 15px;
  max-width: 900px;
  margin: 0 auto;
}

.nav-bar .nav-link {
  display: inline-block;
  box-sizing: border-box;
  width: 33%;
  font-weight: bold;
}

.nav-bar .nav-link a {
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  transition: color 0.25s;
}

.nav-bar .nav-link a:hover {
  color: rgba(0, 0, 0, 0.7);
  text-decoration: none;
}

.nav-bar .nav-link a.active {
  color: rgba(0, 0, 0, 0.8);
  position: relative;
}

.nav-bar .nav-link a.active::before {
  content: "";
  background-color: #C391D6;
  position: absolute;
  width: 40px;
  height: 5px;
  top: 20px;
  left: 7px;
}
</style>

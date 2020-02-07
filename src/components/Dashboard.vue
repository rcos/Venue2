<template>
  <div>
    <h2>Dashboard</h2>
    <button type="submit" class="btn btn-primary" @click="logOut">Logout</button>
    <Users />
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import Users from './User/Users'

  export default {
    name: 'Dashboard',
    components: {
      Users
    },
    data(){
      return {
        user: {}
      }
    },
    created() {
    },
    methods: {
      logOut() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
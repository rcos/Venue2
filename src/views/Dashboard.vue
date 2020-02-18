<template>
  <div>
    <h2>Dashboard</h2>
    <button type="submit" class="btn btn-primary" @click="logOut">Logout</button>
    <Users />
    <h2 v-if="loggedIn">I'm logged in</h2>
    <h2 v-else>Not logged in</h2>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import Users from '@/components/User/Users'
  import { authComputed } from '../vuex/helpers.js'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
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
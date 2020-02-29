<template>
  <div>
    <DashboardSection active_section/>
    <DashboardSection courses_section/>
    <DashboardSection upcoming_section/>
  </div>
</template>


<!-- For testing -->
<!-- <template>
  <div>
    <h2>Dashboard</h2>
    <button type="submit" class="btn btn-primary" @click="logOut">Logout</button>
    <Users />
    <h2 v-if="loggedIn">I'm logged in</h2>
    <h2 v-else>Not logged in</h2>
  </div>
</template> -->

<script>
  import UserAPI from '@/services/UserAPI.js';
  import DashboardSection from '@/components/DashboardSection'
  import { authComputed } from '../vuex/helpers.js'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      DashboardSection
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
      logOut() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
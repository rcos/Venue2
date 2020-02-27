<template>
  <div>
    <InfoSection active_section/>
    <InfoSection courses_section/>
    <InfoSection upcoming_section/>
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
  import InfoSection from '@/components/InfoSection'
  import { authComputed } from '../vuex/helpers.js'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      InfoSection
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
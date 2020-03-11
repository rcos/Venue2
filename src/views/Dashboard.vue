<template>
  <div>
    <DashboardSection active_section/>
    <DashboardSection today_section/>
    <DashboardSection courses_section/>
  </div>
</template>

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
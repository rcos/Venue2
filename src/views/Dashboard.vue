<template>
  <div>
    <DashboardSection active_section/>
    <DashboardSection today_section/>
    <hide-at breakpoint="mediumAndBelow">
      <DashboardSection courses_section/>
    </hide-at>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import DashboardSection from '@/components/DashboardSection'
  import { authComputed } from '../vuex/helpers.js'
  import {showAt, hideAt} from 'vue-breakpoints'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      DashboardSection,
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
      logOut() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
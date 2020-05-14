<template>
  <div>
<!--     <DashboardSection active_section/>
    <DashboardSection today_section/> -->
    <div class="dashboard-section" id="section-1">
      <h4 class="section-title">Live</h4>
      
    </div>

    <div class="dashboard-section" id="section-2">
      <h4 class="section-title">Playback</h4>
      
    </div>

    <hide-at breakpoint="mediumAndBelow">
      <DashboardSection courses_section/>
    </hide-at>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
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
        current_user: {},
        live_lectures: []
      }
    },
    created() {
      this.getCurrentUser()
      this.getLiveLecturesForUser()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
      },
      logOut() {
        this.$store.dispatch('logout')
      },
      async getLiveLecturesForUser() {
        const response = await LectureAPI.getLiveLecturesForUser(this.current_user._id)
        this.live_lectures = response.data
        console.log(this.live_lectures)
      }
    }
  }
</script>

<style scoped>
  .dashboard-section {
    /*border: red solid;*/
    text-align: left;
    margin-top: 4rem;
    display: inline-block;
    vertical-align: top;
    height: 15rem;
  }

  #section-1 {
    float: left;
    margin-left: 8rem;
    width: 30rem;
  }

  #section-2 {
    width: 30rem;
    margin-left: -5rem;
  }

  .section-title {
    font-weight: bold;
  }

</style>
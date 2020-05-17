<template>
  <div>
    <!-- <DashboardSection active_section/> -->
    <!-- <DashboardSection today_section/> -->
    <!--<router-link :to="{name: 'course_info', params: { id: '5e90f007920d965429e5d1a4' }}">Test</router-link>-->

    <show-at breakpoint="large">
      <div class="venue-body-container">
        <LiveCourses />
        <PlaybackCourses />
        <RecentCourses />
        <UpcomingCourses />
      </div>
    </show-at>
    <hide-at breakpoint="large">
      <div class="venue-body-container is-mobile">
        <LiveCourses mobileMode />
        <PlaybackCourses mobileMode />
        <RecentCourses mobileMode />
        <UpcomingCourses mobileMode />
      </div>
    </hide-at>

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

  import LiveCourses from '@/components/LiveCourses.vue'
  import PlaybackCourses from '@/components/PlaybackCourses.vue'
  import RecentCourses from '@/components/RecentCourses.vue'
  import UpcomingCourses from '@/components/UpcomingCourses'

  import '@/assets/css/venue-core.css'
  import '@/assets/css/venue.css'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      DashboardSection,
      hideAt,
      showAt,
      LiveCourses,
      PlaybackCourses,
      RecentCourses,
      UpcomingCourses
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

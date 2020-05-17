<template>
  <div>
<!--     <DashboardSection active_section/>
    <DashboardSection today_section/> -->
    <div class="dashboard-section">
      <h4 class="section-title">All</h4>
      <div class="lecture-box" v-for="lecture in all_lectures">
        <p>{{ lecture.title }}</p>
      </div>
    </div>

    <div class="dashboard-section">
      <h4 class="section-title">Live</h4>
      <div class="lecture-box" v-for="lecture in live_lectures">
        <p>{{ lecture.title }}</p>
      </div>
    </div>

    <div class="dashboard-section">
      <h4 class="section-title">Playback</h4>
      <div class="lecture-box" v-for="lecture in playback_lectures">
        <p>{{ lecture.title }}</p>
      </div>
    </div>

    <div class="dashboard-section">
      <h4 class="section-title">Recent</h4>
      <div class="lecture-box" v-for="lecture in recent_lectures">
        <p>{{ lecture.title }}</p>
      </div>
    </div>

    <div class="dashboard-section">
      <h4 class="section-title">Upcoming</h4>
      <div class="lecture-box" v-for="lecture in upcoming_lectures">
        <p>{{ lecture.title }}</p>
      </div>
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
        all_lectures: [],
        live_lectures: [],
        playback_lectures: [],
        recent_lectures: [],
        upcoming_lectures: []
      }
    },
    created() {
      this.getCurrentUser()
      this.getAllLecturesForUser()
      this.getLiveLecturesForUser()
      this.getPlaybackLectures()
      this.getRecentLecturesForUser()
      this.getUpcomingLecturesForUser()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
      },
      logOut() {
        this.$store.dispatch('logout')
      },
      async getAllLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "all")
        this.all_lectures = response.data
        console.log(this.all_lectures)
      },
      async getLiveLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "live")
        this.live_lectures = response.data
      },
      async getPlaybackLectures() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "active_playback")
        this.playback_lectures = response.data
      },
      async getRecentLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "past")
        let past_lectures = response.data
        this.recent_lectures = past_lectures.slice(0,3)
      },
      async getUpcomingLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "upcoming")
        this.upcoming_lectures = response.data
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
    overflow-y: scroll;
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

  .lecture-box {
    border: blue solid;
    width: 10rem;
    height: 3rem;
    border-radius: 5px;
    margin-left: 3rem;
    margin-top: 2rem;
    cursor: pointer;
  }

  .lecture-box p {
    text-align: center;
    margin-top: 0.5rem;
  }

</style>
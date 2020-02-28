<template>
  <div class='dashboard-view'>
    <!-- <InfoSection active_section/>
    <InfoSection courses_section/>
    <InfoSection upcoming_section/> -->
    <div class="active-courses">
      <div class="section-title">Active</div>
      <div class='course-modal-temp'>
        <div class="title">Intro to AI</div>
        <div class="course-code">CSCI 4200</div>
        <div class='time-left'>Time Remaining: 42m</div>
      </div>
    </div>
    <div class="show-courses-list">
      <div class="section-title">Courses</div>

      <div class='course-modal-temp'>
        <div class="title">Intro to AI</div>
        <div class="course-code">CSCI 4200</div>
      </div>

      <div class='course-modal-temp'>
        <div class="title">RCOS</div>
        <div class="course-code">CSCI 2960</div>
      </div>

      <div class='course-modal-temp'>
        <div class="title">Data Structures</div>
        <div class="course-code">CSCI 1200</div>
      </div>

    </div>
    <div class="upcoming-courses">
      <div class="section-title">Upcoming</div>

      <div class='course-modal-temp'>
        <div class="title">RCOS</div>
        <div class="course-code">CSCI 2960</div>
        <div class='time-left'>Starts 2p</div>
      </div>

      <div class='course-modal-temp'>
        <div class="title">Data Structures</div>
        <div class="course-code">CSCI 1200</div>
        <div class='time-left'>Starts 5p</div>
      </div>

    </div>
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
  // import InfoSection from '@/components/InfoSection'
  import { authComputed } from '../vuex/helpers.js'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      // InfoSection
    },
    data(){
      return {
        user: {},
        user_courses: {
          courses: [{
            name: 'Intro to AI',
            course_code: 'CSCI 4200',
            id: 0
          },{
            name: 'RCOS',
            course_code: 'CSCI 4300',
            id: 1
          },{
            name: 'Data Structures',
            course_code: 'CSCI 1200',
            id: 2
          }],
          active: [1],
          upcoling: [0, 1]
        }
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

<style>
.dashboard-view {
    max-width: 900px;
    margin: 0 auto;
    padding-top: 40px;
    text-align: left;
}

.section-title {
  text-align: left;
  font-size: 25px;
  height: 50px;
  line-height: 50px;
}

.course-modal-temp {
  width: 200px; height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: border 0.25s;
  display: inline-block;
  vertical-align: top;
  margin: 10px;
}

.course-modal-temp:hover {
  border: 1px solid rgba(0, 0, 0, 0.6);
}

.course-modal-temp .time-left {
  font-size: 12px;
  color: #b54545;
  font-weight: bold;
}

.course-modal-temp .title {
  font-size: 20px;
}

.course-modal-temp .course-code {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}
</style>

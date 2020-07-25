<template>
  <div>
    <nav id="venue-nav">
      <!-- Logo -->
      <router-link id="nav-logo" :to="{name: 'dashboard'}" role="link" aria-label="Dashboard">
        <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="Venue Logo" aria-label="Venue Logo">
      </router-link>
      <!-- Nav Links -->
      <div id="venue-nav-links">
        <!-- Dashboard Link -->
        <div class="venue-nav-link-container">
          <router-link class="venue-nav-link" :class="{'active-link':is_dashboard}" :to="{name: 'dashboard'}">
            <p>Dashboard</p>
          </router-link>
          <div v-if="is_dashboard" class="active-link-underline"></div>
        </div>
        <!-- Courses Link -->
        <div class="venue-nav-link-container" id="course-dropdown">
          <p class="venue-nav-link" style="cursor:pointer;">Courses</p>
          <div v-if="is_courses" class="active-link-underline"></div>
          <div class="dropdown-content">
            <!-- <a href="#" v-for="course in user_courses">{{ course.name }}</a> -->
            <div v-if="is_instructor">
              <router-link v-for="course in user_courses" :key="course._id" :to="{name: 'course_info', params: { id: course._id }}">
                <p>{{ course.name }}</p>
              </router-link>
            </div>
            <div v-else>
              <router-link v-for="section in user_sections" :key="section._id" :to="{name: 'course_info', params: { id: section._id }}">
                <p>{{ section.course.name }}</p>
              </router-link>
            </div>
          </div>
        </div>
        <!-- Statistics Link -->
        <div v-if="is_instructor" class="venue-nav-link-container">
          <router-link class="venue-nav-link" :class="{'active-link':is_statistics}" :to="{name: 'statistics'}">
            Statistics
          </router-link>
          <div v-if="is_statistics" class="active-link-underline"></div>
        </div>
      </div>
      <!-- Settings Link -->
      <router-link :to="{name: 'settings'}" role="link" aria-label="User Settings" class="settings_link">
        <div class="user-name float-right">
          <hide-at breakpoint="small">
            <p class="d-inline-block mr-2" aria-label="User Name">{{ current_user.first_name }} {{ current_user.last_name }}</p>
          </hide-at>
          <show-at breakpoint="small">
            <p v-if="!is_instructor" class="d-inline-block mr-2" aria-label="User Name">{{ current_user.first_name }} {{ current_user.last_name }}</p>
          </show-at>
          <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="Settings Icon" aria-label="Settings Icon">
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script>
  import {showAt, hideAt} from 'vue-breakpoints'
  import UserAPI from '@/services/UserAPI.js';
  import CourseAPI from '@/services/CourseAPI.js'
  import SectionAPI from '@/services/SectionAPI.js'

  export default {
    name: 'NavBar',
    computed: {
      is_dashboard: function () {
        return this.$route.name === 'dashboard'
      },
      is_courses: function () {
        return this.$route.name === 'user_courses'
      },
      is_statistics: function () {
        return this.$route.name === 'statistics'
      }
    },
    components: {
      hideAt,
      showAt
    },
    data(){
      return {
        current_user: {},
        is_instructor: Boolean,
        user_courses: [],
        user_sections: []
      }
    },
    created() {
      this.getCurrentUser()
      if(this.is_instructor)
        this.getInstructorCourses()
      else
        this.getSectionsWithCourses()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
        this.is_instructor = this.current_user.is_instructor
      },
      async getInstructorCourses() {
        const response = await CourseAPI.getInstructorCourses(this.current_user._id)
        this.user_courses = response.data
      },
      async getSectionsWithCourses() {
        const response = await SectionAPI.getSectionsWithCoursesForStudent(this.current_user._id)
        let temp_sections = response.data
        let temp_course_ids = []
        temp_sections.forEach(section => {
          if(!temp_course_ids.includes(section.course._id)){
            this.user_sections.push(section)
            temp_course_ids.push(section.course._id)
          }
        })
      }
    }
  }
</script>

<style scoped>
  #venue-nav {
    height: 4rem;
    padding: 1rem 2rem;
    background: white;
  }

  #nav-logo {
    float: left;
  }

  #venue-nav-links {
    margin-top: 5px;
    float: left;
    /*padding: 1px;*/
  }

  .venue-nav-link-container {
    margin-left: 1.5rem;
    display: inline-block;
  }

  #course-dropdown {
    position: relative;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 10;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {background-color: #ddd;}

  #course-dropdown:hover .dropdown-content {display: block;}

  .venue-nav-link{
    text-decoration: none;
    color: #575757;
    font-weight: 100;
  }

  .active-link {
    color: #466D85;
  }

  .active-link:hover,
  .active-link:focus {
    color: #575757;
  }

  .active-link-underline {
    height: 2px;
    width: 80%;
    background-color: #466D85;
    margin: auto;
  }

  .user-name {
    margin-top: 5px;
    font-weight: 100;
  }

  .settings {
    cursor: pointer;
    margin-top: 2px;
  }

  .venue-nav-link:focus,
  .settings_link:focus {
    outline: none;
  }

  .venue-nav-link:hover,
  .settings_link:hover .mr-2,
  .venue-nav-link:focus,
  .settings_link:focus .mr-2,
  .venue-nav-link:focus p,
  .venue-nav-link:hover p {
    color: #466D85;
  }
</style>

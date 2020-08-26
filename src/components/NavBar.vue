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
          <router-link class="venue-nav-link" :class="{'active-link':is_dashboard()}" :to="{name: 'dashboard'}">
            <p>Dashboard</p>
          </router-link>
          <div v-if="is_dashboard()" class="active-link-underline"></div>
        </div>
        <!-- Courses Link -->
        <div class="venue-nav-link-container" id="instructor-course-dropdown" v-if="instructor_courses.length">
          <a data-toggle="collapse" href="#instructor-collapse" class="venue-nav-link" :class="{'active-link':is_instructor_course_info()}" style="cursor:pointer;">Instructor Courses {{"\u23F7"}}</a>
          <hide-at breakpoint="mediumAndBelow">
            <div class="dropdown-content">
              <router-link v-for="course in instructor_courses" :key="course._id" :to="{name: 'course_info', params: { id: course._id }}">
                <p>{{ course.name }}</p>
              </router-link>
            </div>
          </hide-at>
          <div v-if="is_instructor_course_info()" class="active-link-underline"></div>
        </div>
        <div class="venue-nav-link-container" id="ta-section-dropdown" v-if="ta_sections.length">
          <a data-toggle="collapse" href="#ta-collapse" class="venue-nav-link" :class="{'active-link':is_ta_section_info()}" style="cursor:pointer;">TA Sections {{"\u23F7"}}</a>
          <hide-at breakpoint="mediumAndBelow">
            <div class="dropdown-content">
              <router-link v-for="section in ta_sections" :key="section._id" :to="{name: 'course_info', params: { id: section._id }}">
                <p>{{ section.course.name }} {{section.name}}</p>
              </router-link>
            </div>
          </hide-at>
          <div v-if="is_ta_section_info()" class="active-link-underline"></div>
        </div>
        <div class="venue-nav-link-container" id="student-section-dropdown" v-if="student_sections.length">
          <a data-toggle="collapse" href="#student-collapse" class="venue-nav-link" :class="{'active-link':is_student_section_info()}" style="cursor:pointer;">Student Sections {{"\u23F7"}}</a>
          <hide-at breakpoint="mediumAndBelow">
            <div class="dropdown-content">
              <router-link v-for="section in student_sections" :key="section._id" :to="{name: 'course_info', params: { id: section._id }}">
                <p>{{ section.course.name }} {{ section.name }}</p>
              </router-link>
            </div>
          </hide-at>
          <div v-if="is_student_section_info()" class="active-link-underline"></div>
        </div>
        <!-- Statistics Link -->
        <show-at breakpoint="large">
          <div v-if="instructor_courses.length" class="venue-nav-link-container">
            <router-link class="venue-nav-link" :class="{'active-link':is_statistics()}" :to="{name: 'statistics'}">
              Statistics
            </router-link>
            <div v-if="is_statistics()" class="active-link-underline"></div>
          </div>
        </show-at>
      </div>
      <!-- Settings Link -->
      <router-link :to="{name: 'settings'}" role="link" aria-label="User Settings" class="settings_link">
        <div class="user-name float-right">
          <show-at breakpoint="large">
            <p class="d-inline-block mr-2" aria-label="User Name">{{ current_user.first_name }} {{ current_user.last_name }}</p>
          </show-at>
          <show-at breakpoint="medium">
            <p class="d-inline-block mr-2" aria-label="User Name">{{ current_user.first_name }}</p>
          </show-at>
          <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="Settings Icon" aria-label="Settings Icon">
        </div>
      </router-link>
    </nav>
    <!-- Mobile Course Dropdown -->
    <show-at breakpoint="mediumAndBelow">
      <div>
        <div class="collapse" id="instructor-collapse">
          <ul class="mobile-course-list">
            <li class="mobile-course-link" v-for="course in instructor_courses" :key="course._id">
              <router-link :to="{name: 'course_info', params: { id: course._id }}">
                <p class="mobile-course-link-name">{{ course.name }}</p>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="collapse" id="ta-collapse">
          <ul class="mobile-course-list">
            <li class="mobile-course-link" v-for="section in ta_sections" :key="section._id">
              <router-link :to="{name: 'course_info', params: { id: section._id }}">
                <p class="mobile-course-link-name">{{ section.course.name }} {{ section.name }}</p>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="collapse" id="student-collapse">
          <ul class="mobile-course-list">
            <li class="mobile-course-link" v-for="section in student_sections" :key="section._id">
              <router-link :to="{name: 'course_info', params: { id: section._id }}">
                <p class="mobile-course-link-name">{{ section.course.name }} {{ section.name }}</p>ein
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </show-at>
    <!-- Breadcrumbs -->
    <div id="breadcrumb-container" v-if="showBreadcrumb()">
      <router-link :to="{name: 'dashboard'}">
        Venue
      </router-link>
      <div v-if="current_section" class="crumb">
        {{"\u23F5"}}
        <router-link :to="{name: 'course_info', params: { id: current_section._id }}">
          {{current_section.course.name}}
        </router-link>
      </div>
      <div v-else-if="current_course" class="crumb">
        {{"\u23F5"}}
        <router-link :to="{name: 'course_info', params: { id: current_course._id }}">
          {{current_course.name}}
        </router-link>
      </div>
      <div v-if="current_lecture" class="crumb">
        {{"\u23F5"}}
        <router-link :to="{name: 'lecture_info', params: { lecture_id: current_lecture._id }}">
          {{current_lecture.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {showAt, hideAt} from 'vue-breakpoints'

  import UserAPI from '@/services/UserAPI.js'
  import CourseAPI from '@/services/CourseAPI.js'
  import SectionAPI from '@/services/SectionAPI.js'
  import LectureAPI from '@/services/LectureAPI.js'

  export default {
    name: 'NavBar',
    computed: {
    },
    watch: {
      $route (to, from){
        this.current_course = null,
        this.current_section = null,
        this.current_lecture = null,
        this.loadBreadcrumb()
      }
    },
    components: {
      hideAt,
      showAt
    },
    data(){
      return {
        current_user: {},
        instructor_courses: [],
        ta_sections: [],
        student_sections: [],
        user_lectures: [],
        current_course: null,
        current_section: null,
        current_lecture: null
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.loadData()
    },
    methods: {
      showBreadcrumb() {
        return !(this.$route.name === 'dashboard' || this.$route.name === 'settings' || this.$route.name === 'lecture_playback')
      },
      async loadData() {
        const response1 = await CourseAPI.getInstructorCourses()
        this.instructor_courses = response1.data

        const response2 = await SectionAPI.getTASections()
        this.ta_sections = response2.data

        const response3 = await SectionAPI.getStudentSections()
        this.student_sections = response3.data

        const response4 = await LectureAPI.getLecturesForUser(this.current_user._id,'with_sections_and_course')
        this.user_lectures = response4.data
        
        this.loadBreadcrumb()
      },
      loadBreadcrumb() {
        this.current_lecture = this.user_lectures.find(a=>this.$route.params.lecture_id && a && a._id == this.$route.params.lecture_id)
        let sections = this.ta_sections.concat(this.student_sections)

        if(this.current_lecture) {
          this.current_section = this.current_lecture.sections.find(section => sections.map(a => a._id).includes(section._id))
          if(!this.current_section) {
            this.current_course = this.current_lecture.sections[0].course
          }
        } else {
          this.current_section = sections.find(section => section._id == this.$route.params.id)
          if(!this.current_section) {
            this.current_course = this.instructor_courses.find(course => course._id == this.$route.params.id)
          }
        }
        
      },
      is_dashboard() {
        return this.$route.name === 'dashboard'
      },
      is_instructor_course_info() {
        return this.$route.name === 'course_info' && this.instructor_courses.some(a => a._id == this.$route.params.id)
      },
      is_ta_section_info() {
        return this.$route.name === 'course_info' && this.ta_sections.some(a => a._id == this.$route.params.id)
      },
      is_student_section_info() {
        return this.$route.name === 'course_info' && this.student_sections.some(a => a._id == this.$route.params.id)
      },
      is_lecture_info() {
        return this.$route.name === 'lecture_info'
      },
      is_statistics() {
        return this.$route.name === 'statistics'
      },
    }
  }
</script>

<style scoped>
  #venue-nav {
    height: 4rem;
    padding: 1rem 2rem;
    display: block;
  }

  #breadcrumb-container {
    margin: 0;
    width: 100%;
    text-align: left;
    padding-left: 4rem;
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  .crumb {
    display: inline-block;
    margin-right: 0.5rem;
  }

  #nav-logo {
    float: left;
  }

  #venue-nav-links {
    margin-top: 5px;
    float: left;
    display: inline-flex;
    /*padding: 1px;*/
  }

  .venue-nav-link-container {
    margin-left: 1.5rem;
    display: inline-block;
  }

  #instructor-course-dropdown,
  #ta-section-dropdown,
  #student-section-dropdown {
    position: relative;
    border-radius: 5px;
  }

  .dropdown-content {
    /*margin-top: 3px;*/
    display: block;
    position: absolute;
    background-color: #f7f7f7;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 9999;
    overflow: hidden;
    max-height:0;
    transition: max-height 0.2s ease-in; 
  }

  .dropdown-content a {
    color: #2C3E50;
    font-weight: bold;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #466D85;
    color: white;
    -webkit-transition: all 150ms linear;
    -ms-transition: all 150ms linear;
    transition: all 150ms linear;
  }

  #instructor-course-dropdown:hover .dropdown-content,
  #ta-section-dropdown:hover .dropdown-content,
  #student-section-dropdown:hover .dropdown-content {
    max-height: 300px;
    overflow-y: auto;
  }

  .mobile-course-list {
    list-style-type: none;
    padding: 0;
  }

  .mobile-course-link {
    height: 2rem;
    width: 100%;
    display: inline-block;
  }

  .mobile-course-link-name {
    text-decoration: none;

  }

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

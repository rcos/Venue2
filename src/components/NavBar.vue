<template>
  <div>
    <nav id="venue-nav">
      <!-- Logo -->

      <!-- Nav Links -->
      <div id="venue-nav-links">
        <router-link id="nav-logo" :to="{name: 'dashboard'}" role="link" aria-label="Dashboard">
          <img src="@/assets/venue-logo.svg" width="30" height="30" class="d-inline-block align-top" alt="Venue Logo" aria-label="Venue Logo">
        </router-link>
        <!-- Dashboard Link -->
        <div class="venue-nav-link-container">
          <router-link class="venue-nav-link" :class="{'active-link':is_dashboard()}" :to="{name: 'dashboard'}">
            <p>Dashboard</p>
          </router-link>
          <div :class="'active-link-underline ' + (is_dashboard()?'active':'')"></div>
        </div>
        <!-- Courses Link -->
        <div class="venue-nav-link-container" id="instructor-course-dropdown" v-if="instructor_courses.length">
          <DropDown :is_active="is_instructor_course_info()" :navbar_label="'Instructor Courses'" :dd_content="instructor_courses :id="'course'"></DropDown>
        </div>
        <div class="venue-nav-link-container" id="ta-section-dropdown" v-if="ta_sections.length">
          <DropDown :is_active="is_ta_section_info()" :navbar_label="'TA Sections'" :dd_content="ta_sections" :id="'section'"></DropDown>
        </div>

        <div class="venue-nav-link-container" id="student-section-dropdown" v-if="student_sections.length">
          <DropDown :is_active="is_student_section_info()" :navbar_label="'Student Sections'" :dd_content="student_sections" :id="'section'"></DropDown>
        </div>


        <div class="venue-nav-link-container" id="test-dropdown" v-if="testdat.length">
          <DropDown :is_active="is_student_section_info()" :navbar_label="'TESTING'" :dd_content="testdat" :id="'test'"></DropDown>
        </div>


        <!-- Statistics Link -->
        <!-- <show-at breakpoint="large">
          <div v-if="instructor_courses.length" class="venue-nav-link-container">
            <router-link class="venue-nav-link" :class="{'active-link':is_statistics()}" :to="{name: 'statistics'}">
              Statistics
            </router-link>
            <div v-if="is_statistics()" class="active-link-underline"></div>
          </div>
        </show-at> -->
        <div class="venue-nav-link-container">
          <router-link class="venue-nav-link" :class="{'active-link':is_settings()}" :to="{name: 'settings'}">
            <show-at breakpoint="large">
              <p aria-label="User Name">{{ current_user.first_name }} {{ current_user.last_name }} <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="Settings Icon" aria-label="Settings Icon"></p>
            </show-at>
            <show-at breakpoint="medium">
              <p aria-label="User Name">{{ current_user.first_name }} <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="Settings Icon" aria-label="Settings Icon"></p>
            </show-at>
            <show-at breakpoint="small">
              <img src="@/assets/settings.svg" width="20" height="20" class="d-inline-block align-top settings" alt="Settings Icon" aria-label="Settings Icon">
            </show-at>
          </router-link>
          <div :class="'active-link-underline ' + (is_settings()?'active':'')"></div>
        </div>
      </div>
    </nav>

    <!-- Breadcrumbs -->
    <div id="breadcrumb-container" v-if="showBreadcrumb()">
      <router-link :to="{name: 'dashboard'}">
        Venue
      </router-link>
      <div v-if="current_section" class="crumb">
        <img class="rotate-arrow" src="@/assets/icons8-sort-down-26.png" width="10" height="10" alt="Down Icon" aria-label="Down Icon">
        <router-link :to="{name: 'course_info', params: { id: current_section._id }}">
          {{current_section.course.name}}
        </router-link>
      </div>
      <div v-else-if="current_course" class="crumb">
        <img class="rotate-arrow" src="@/assets/icons8-sort-down-26.png" width="10" height="10" alt="Down Icon" aria-label="Down Icon">
        <router-link :to="{name: 'course_info', params: { id: current_course._id }}">
          {{current_course.name}}
        </router-link>
      </div>
      <div v-if="current_lecture" class="crumb">
        <img class="rotate-arrow" src="@/assets/icons8-sort-down-26.png" width="10" height="10" alt="Down Icon" aria-label="Down Icon">
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
  import DropDown from './DropDown.vue'

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
      showAt,
      'DropDown': DropDown,
    },
    data(){

      return {

      testdat: [
        	{
          	name: 'Item 1',
            children: [{name: 'Subitem 1'},{name: 'Subitem 2'},{name: 'Subitem 3'}]
          },
          {
          	name: 'Item 2'
          }
        ],

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

        if(this.$route.name == 'new_lecture') {
          this.current_course = this.instructor_courses.find(a=>this.$route.params.course_id && a._id == this.$route.params.course_id)
        } else if(this.current_lecture) {
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
      is_settings() {
        return this.$route.name === 'settings'
      },
    }
  }
</script>

<style scoped>
  #venue-nav {
    height: 4rem;
    padding: 1rem 0rem;
    position: relative;
    top: 0;
    left: 0;
  }

  #venue-nav-links {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
  }

  #breadcrumb-container {
    position: relative;
    margin: 1rem 0rem;
    width: 100%;
    text-align: left;
    padding-left: 4rem;
    font-size: 0.9rem;
  }

  .crumb {
    display: inline-block;
    margin-right: 0.5rem;
  }

  #nav-logo {
    margin-left: 1.5rem;
    display: inline-block;
  }

  .venue-nav-link-container {
    margin-left: 1.5rem;
    display: inline-block;
    border-radius: 0.3rem;
    /* height: 2rem; */
    margin-top: 0.5rem;
    margin-bottom: 0;
    border-bottom: none;
    transition: border-bottom 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .venue-nav-link-container.active {
    border-bottom: 0.2rem solid #466D85;
    transition: border-bottom 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1);
  }

  #instructor-course-dropdown,
  #ta-section-dropdown,
  #student-section-dropdown {
    border-radius: 5px;
  }

  .dropdown-content {
    margin-left: -1rem;
    margin-top: 0.2rem;
    position: absolute;
    /* background-color: #f7f7f7; */

    z-index: 9999;
    border-radius: 0.5rem;

    /* transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1); */
  }

  .dropdown-content a {
    opacity: 0;
    color: #2C3E50;
    background-color: #f7f7f7;
    font-weight: bold;
    text-decoration: none;
    display: block;
    max-height: 0px;
    width: 15rem;
    margin: 0px;
    padding: 0px;
    box-shadow: 0px 3px 3px 0px rgba(109, 109, 109, 0.644);
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .dropdown-content a:first-of-type {
    border-radius: 0.5rem 0.5rem 0rem 0rem;
  }

  .dropdown-content a:last-of-type {
    border-radius: 0rem 0rem 0.5rem 0.5rem;
  }

  .dropdown-content a:not(:first-of-type) {
    border-top: 0.1rem solid rgba(0, 0, 0, 0.15);
  }

  .dropdown-content a:last-of-type {
    border-radius: 0rem 0rem 0.5rem 0.5rem;
  }

  .dropdown-content a:only-of-type {
    border-radius: 0.5rem;
  }

  #instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(1),
  #ta-section-dropdown:hover > .dropdown-content a:nth-of-type(1),
  #student-section-dropdown:hover > .dropdown-content a:nth-of-type(1),
  #instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(1),
  #ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(1),
  #student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(1) {
    opacity: 1;
    max-height: 3rem;
    width: 15rem;
    padding: 12px 16px;
    transform: rotateY(0deg);
    transition: all 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0s cubic-bezier(0.19, 1, 0.22, 1);
  }

  #instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(2),
  #ta-section-dropdown:hover > .dropdown-content a:nth-of-type(2),
  #student-section-dropdown:hover > .dropdown-content a:nth-of-type(2),
  #instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(2),
  #ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(2),
  #student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(2) {
    opacity: 1;
    max-height: 3rem;
    width: 15rem;
    padding: 12px 16px;
    transform: rotateY(0deg);
    transition: all 0.25s 0.05s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.05s cubic-bezier(0.19, 1, 0.22, 1);
  }

  #instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(3),
  #ta-section-dropdown:hover > .dropdown-content a:nth-of-type(3),
  #student-section-dropdown:hover > .dropdown-content a:nth-of-type(3),
  #instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(3),
  #ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(3),
  #student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(3) {
    opacity: 1;
    max-height: 3rem;
    width: 15rem;
    padding: 12px 16px;
    transform: rotateY(0deg);
    transition: all 0.25s 0.1s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.1s cubic-bezier(0.19, 1, 0.22, 1);
  }

  #instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(4),
  #ta-section-dropdown:hover > .dropdown-content a:nth-of-type(4),
  #student-section-dropdown:hover > .dropdown-content a:nth-of-type(4),
  #instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(4),
  #ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(4),
  #student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(4) {
    opacity: 1;
    max-height: 3rem;
    width: 15rem;
    padding: 12px 16px;
    transform: rotateY(0deg);
    transition: all 0.25s 0.15s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.15s cubic-bezier(0.19, 1, 0.22, 1);
  }

  #instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(5),
  #ta-section-dropdown:hover > .dropdown-content a:nth-of-type(5),
  #student-section-dropdown:hover > .dropdown-content a:nth-of-type(5),
  #instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(5),
  #ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(5),
  #student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(5) {
    opacity: 1;
    max-height: 3rem;
    width: 15rem;
    padding: 12px 16px;
    transform: rotateY(0deg);
    transition: all 0.25s 0.20s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.2s cubic-bezier(0.19, 1, 0.22, 1);
  }

  #instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(6),
  #ta-section-dropdown:hover > .dropdown-content a:nth-of-type(6),
  #student-section-dropdown:hover > .dropdown-content a:nth-of-type(6),
  #instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(6),
  #ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(6),
  #student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(6) {
    opacity: 1;
    max-height: 3rem;
    width: 15rem;
    padding: 12px 16px;
    transform: rotateY(0deg);
    transition: all 0.25s 0.25s cubic-bezier(0.19, 1, 0.22, 1), transform 0.25s 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .dropdown-content a:hover,
  .dropdown-content a:focus {
    background-color: #466D85;
    color: white;
    outline: none;
    box-shadow: 0px 3px 3px 0px rgba(85, 85, 85, 0.644) inset, 0px -3px 3px 0px rgba(179, 179, 179, 0.644) inset;
    -webkit-transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    -ms-transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .mobile-course-list {
    display: block;
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

  .venue-nav-link {
    text-decoration: none;
    color: #575757;
    font-weight: 100;
    margin: 0;
    padding: 0;
    height: 2rem;
  }

  .active-link {
    color: #466D85;
  }

  .active-link:hover,
  .active-link:focus {
    color: #575757;
  }

  .active-link-underline {
    height: 0rem;
    width: 0rem;
    background-color: #466D85;
    margin: auto;
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .active-link-underline.active {
    height: 0.15rem;
    width: 80%;
    transition: all 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .user-name {
    /* margin-top: 5px; */
    /* font-weight: 100; */
  }

  .settings {
    cursor: pointer;
    margin-top: 0.1rem;
    margin-left: 0.25rem;
    margin-right: 1.5rem;
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

  .rotate-arrow {
    transform: rotateX(-90deg);
    margin-bottom: 0.1rem;
  }

  img {
    display: inline-block;
  }
</style>

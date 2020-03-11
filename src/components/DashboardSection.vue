<template>
  <div id="infosection">
    <div v-if="active_section">
      <h1 class="section-title">Active</h1>
      <h3 v-for="event in active_events">{{ event.title }}</h3>
    </div>
    <div v-else-if="courses_section">
      <h1 class="section-title">Courses</h1>
      <div v-if="is_instructor">
        <h3 v-for="course in courses">{{ course.name }}</h3>
      </div>
      <div v-else>
        <InfoContainer v-for="section in sections" v-bind:key="section._id" course_info v-bind:section="section" />
      </div>
    </div>
    <div v-else-if="today_section">
      <h1 class="section-title">Today's Events</h1>
      <h3 v-for="event in todays_events">{{ event.title }}</h3>
    </div>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js'
  import CourseAPI from '@/services/CourseAPI.js'
  import EventAPI from '@/services/EventAPI.js'
  import InfoContainer from '@/components/InfoContainer.vue'

  export default {
    name: 'DashboardSection',
    props: {
      active_section: Boolean,
      courses_section: Boolean,
      today_section: Boolean
    },
    computed: {
    },
    components: {
      InfoContainer
    },
    data(){
      return {
        sections: [],
        courses: [],
        active_events: [],
        todays_events: [],
        is_instructor: Boolean
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.is_instructor = this.current_user.is_instructor
      if(this.courses_section) {
        if(this.is_instructor)
          this.getInstructorCourses()
        else
          this.getSectionsWithCourses()
      } else if(this.active_section) {
        this.getActiveEvents()
      } else if(this.today_section) {
        this.getTodaysEvents()
      }
    },
    methods: {
      async getInstructorCourses() {
        let response = await CourseAPI.getInstructorCourses(this.current_user._id)
        this.courses = response.data
      },
      async getSectionsWithCourses() {
        let response = await SectionAPI.getSectionsWithCoursesForStudent(this.current_user._id)
        this.sections = response.data
      },
      async getActiveEvents() {
        let response = await EventAPI.getActiveOrTodaysEventsForUser(this.current_user._id, true)
        this.active_events = response.data
      },
      async getTodaysEvents() {
        let response = await EventAPI.getActiveOrTodaysEventsForUser(this.current_user._id, false)
        this.todays_events = response.data
      }
    }
  }
</script>

<style scoped>
#infosection {
  border: red solid;
  margin-top: 2rem;
  text-align: left;
  padding: 1rem;
  padding-left: 2rem;
}

.section-title {

}
/*
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
}*/
</style>
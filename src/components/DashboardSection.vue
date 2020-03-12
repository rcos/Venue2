<template>
  <div class="dashboard-section" v-bind:class="{'active-section':active_section, 'today-section':today_section,
    'courses-section':courses_section}">
    <!-- Active Section -->
    <div v-if="active_section">
      <h2 class="section-title">Active</h2>
      <div v-if="active_events.length > 0">
        <h3 v-for="event in active_events">{{ event.title }}</h3>
      </div>
      <div v-else>
        <p class="no-container" id="no-active">No active events</p>
      </div>
    </div>
    <!-- Today Section -->
    <div v-else-if="today_section">
      <h2 class="section-title">Today's Events</h2>
      <div v-if="todays_events.length > 0">
        <h3 v-for="event in todays_events">{{ event.title }}</h3>
      </div>
      <div v-else>
        <p class="no-container" id="no-today">No events today</p>
      </div>
    </div>
    <!-- Courses Section -->
    <div v-else-if="courses_section">
      <h2 class="section-title">Courses</h2>
      <div v-if="is_instructor">
        <div v-if="courses.length > 0">
          <h3 v-for="course in courses">{{ course.name }}</h3>
        </div>
        <div v-else>
          <p class="no-container" id="no-courses">No courses</p>
        </div>
      </div>
      <div v-else>
        <div v-if="sections.length > 0">
          <InfoContainer v-for="section in sections" v-bind:key="section._id" course_info v-bind:section="section" />
        </div>
        <div v-else>
          <p class="no-container" id="no-courses">No courses</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js'
  import CourseAPI from '@/services/CourseAPI.js'
  import EventAPI from '@/services/EventAPI.js'
  import InfoContainer from '@/components/InfoContainer.vue'
  import {showAt, hideAt} from 'vue-breakpoints'

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
      InfoContainer,
      hideAt,
      showAt
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
        this.sections = []
      },
      async getActiveEvents() {
        let response = await EventAPI.getActiveOrTodaysEventsForUser(this.current_user._id, true)
        this.active_events = response.data
        this.active_events = []
      },
      async getTodaysEvents() {
        let response = await EventAPI.getActiveOrTodaysEventsForUser(this.current_user._id, false)
        this.todays_events = response.data
        this.todays_events = []
      }
    }
  }
</script>

<style scoped>
.dashboard-section {
  /*border: red solid;*/
  text-align: left;
  margin-top: 4rem;
  /*padding: 1rem;*/
  display: inline-block;
  vertical-align: top;
  height: 15rem;
}

.active-section {
  float: left;
  margin-left: 8rem;
  width: 30rem;
}

.today-section {
  width: 30rem;
}

.courses-section {
  display: block;
  margin-left: 8rem;
  margin-top: 2rem;
}

.section-title {
/*  border: black solid;
  text-align: left;*/
  font-weight: bold;
}

.no-container {
  /*border: black solid;*/
  margin-top: 2rem;
  text-align: left;
  font-weight: bold;
  color: #add5ff;
}

#no-active {
  margin-left: 3rem;
}

#no-today {
  margin-left: 3rem;
}

#no-courses {
  margin-left: 3rem;
}

/*Small devices (landscape phones, 576px and up)*/
@media (max-width: 575.98px) {
  .dashboard-section {
    text-align: center;
    /*height: auto;*/
  }
  .active-section {
    margin-left: 0;
    width: 100%;
  }
  .dashboard-section {
    width: 100%;
  }
  .no-container {
    text-align: center;
  }
  #no-active {
    margin-left: auto;
  }
  #no-today {
    margin-left: auto;
  }
}

</style>
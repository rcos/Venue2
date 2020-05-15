<template>
  <div>
    <div class="spinner-border event-card-spinner" role="status" v-if="!course_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="course-info-container" v-else>
      <!-- Course and event container -->
      <div class="course-event-container">
        <div class="info-section" id="course-info">
          <h2 class="course-info-header">Course Info</h2>
          <p class="course-name">{{ course.name }}</p>
          <div class="course-title">{{ course.dept }} {{ course.course_number }}</div>
        </div>
        <div class="info-section" id="event-info">
          <router-link v-if="is_instructor" :to="{name: 'new_lecture', params: { course_id: course._id }}">
            <button class="new-event-btn">Create New Lecture for {{course.dept }} {{ course.course_number }}</button>
          </router-link>
          <div class="active-events-container">
            <router-link class="active-event-pill" v-for="active_event in active_events" :key="active_event._id" :to="{name: 'event_info', params: { event_id: active_event._id }}">
              <p class="active-event-card-section" id="active-event-name">{{ active_event.title }}</p>
              <p class="active-event-card-section" id="active-event-location">{{ active_event.location }}</p>
              <div class="active-event-card-section" id="active-event-time-remaining">
                <span v-if="active_event.remaining_days > 0">{{ active_event.remaining_days }}d </span>
                <span v-if="active_event.remaining_hours > 0">{{ active_event.remaining_hours }}h </span>
                <span v-if="active_event.remaining_mins > 0">{{ active_event.remaining_mins }}m</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- Attendance history -->
      <div class="attendance-history-container">
        <div class="attendance-history-header">
          <h4 class="attendance-history-header-text">Live lectures</h4>
        </div>
        <router-link v-for="lecture in live_lectures" :to="{name: 'lecture_info', params: { lecture_id: lecture._id }}">
          <div class="lecture-container">
            <p>{{ lecture.title }}</p>
          </div>
        </router-link>
      </div>
      <div class="attendance-history-container">
        <div class="attendance-history-header">
          <h4 class="attendance-history-header-text">Upcoming lectures</h4>
        </div>
        <router-link v-for="lecture in upcoming_lectures" :to="{name: 'lecture_info', params: { lecture_id: lecture._id }}">
          <div class="lecture-container">
            <p>{{ lecture.title }}</p>
          </div>
        </router-link>
      </div>
      <div class="attendance-history-container">
        <div class="attendance-history-header">
          <h4 class="attendance-history-header-text">Past lectures</h4>
        </div>
        <router-link v-for="lecture in past_lectures" :to="{name: 'lecture_info', params: { lecture_id: lecture._id }}">
          <div class="lecture-container">
            <p>{{ lecture.title }}</p>
          </div>
        </router-link>
      </div>
      <div class="attendance-history-container">
        <div class="attendance-history-header">
          <h4 class="attendance-history-header-text">All lectures</h4>
        </div>
        <router-link v-for="lecture in all_lectures" :to="{name: 'lecture_info', params: { lecture_id: lecture._id }}">
          <div class="lecture-container">
            <p>{{ lecture.title }}</p>
          </div>
        </router-link>
<!--         <EventHistoryList v-if="is_instructor" v-bind:course="course" />
        <EventHistoryList v-else v-bind:section="section"/> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import EventAPI from '@/services/EventAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
  import EventHistoryList from '@/components/EventHistoryList.vue';

export default {
  name: 'CourseInfo',
  props: {
  },
  computed: {
  },
  components: {
    EventHistoryList
  },
  data(){
    return {
      course: Object,
      section: Object,
      active_events: [],
      all_lectures: [],
      upcoming_lectures: [],
      live_lectures: [],
      past_lectures: [],
      course_has_loaded: false
    }
  },
  created() {
    this.is_instructor = this.$store.state.user.current_user.is_instructor
    if(this.is_instructor) {
      this.course_id = this.$route.params.id
      this.getCourse()
      this.getAllLecturesForCourse()
      this.getUpcomingLecturesForCourse()
      this.getLiveLecturesForCourse()
      this.getPastLecturesForCourse()
      // this.getActiveEventsForCourse()
    } else {
      // this.section_id = this.$route.params.id
      // this.getSectionWithCourse()
      // this.getActiveEventsForSection()
    }
  },
  methods: {
    async getCourse() {
      const response = await CourseAPI.getCourse(this.course_id)
      this.course = response.data
      this.course_has_loaded = true
    },
    async getSectionWithCourse() {
      const response = await SectionAPI.getSectionWithCourse(this.section_id)
      this.section = response.data
      this.course = this.section.course
      this.course_has_loaded = true
    },
    async getPastLecturesForCourse() {
      const response = await LectureAPI.getLecturesForCourse(this.course_id, "past")
      this.past_lectures = response.data
    },
    async getLiveLecturesForCourse() {
      const response = await LectureAPI.getLecturesForCourse(this.course_id, "live")
      this.live_lectures = response.data
    },   
    async getUpcomingLecturesForCourse() {
      const response = await LectureAPI.getLecturesForCourse(this.course_id, "upcoming")
      this.upcoming_lectures = response.data
    },    
    async getAllLecturesForCourse() {
      const response = await LectureAPI.getLecturesForCourse(this.course_id, "all")
      this.all_lectures = response.data
    },    
    async getActiveEventsForCourse() {
      const response = await EventAPI.getActiveEventsForCourse(this.course_id)
      this.active_events = response.data
      this.getRemainingTimeForActiveEvents()
    },
    async getActiveEventsForSection() {
      const response = await EventAPI.getActiveEventsForSection(this.section_id)
      this.active_events = response.data
      this.getRemainingTimeForActiveEvents()
    },
    getRemainingTimeForActiveEvents() {
      this.active_events.forEach(active_event => {
        let current_time = new Date()
        let submission_end_time = new Date(active_event.submission_end_time)
        let diff_milliseconds = Math.abs(submission_end_time - current_time);
        let diff_hours = Math.floor((diff_milliseconds % 86400000) / 3600000); // hours
        let diff_mins = Math.round(((diff_milliseconds % 86400000) % 3600000) / 60000); // minutes
        let diff_days = Math.floor(diff_milliseconds / 86400000); // days
        active_event.remaining_days = diff_days
        active_event.remaining_hours = diff_hours
        active_event.remaining_mins = diff_mins
      })
    }
  }
}
</script>

<style scoped>
  .course-info-container {
    /*border: blue solid;*/
  }

  .course-event-container {
    /*border: green solid;*/
    overflow: hidden;
    padding-left: 6rem;
  }

  .info-section {
    display: inline-block;
    margin-top: 2rem;
    float: left;
  }

  #course-info {
    /*border: black solid;*/
  }

  .course-title {
    border: black solid;
    display: inline-block;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.5rem;
  }

  #event-info {
    width: 62%;
  }

  .new-event-btn {
    background-color: white;
    border: #007bff solid;
    color: #black;
    border-radius: 5px;
  }

  .active-events-container {
    margin-top: 3rem;
    overflow: hidden;
  }

  .active-event-pill {
    display: inline-block;
    border: green solid;
    width: 18rem;
    border-radius: 3px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 2rem;
    cursor: pointer;
  }

  .active-event-card-section {
    display: inline-block;
    color: black;
  }

  #active-event-name {
    float: left;
  }

  #active-event-time-remaining {
    float: right;
  }

  .attendance-history-container {
    /*border: blue solid;*/
    /*padding-left: 6rem;*/
    overflow: hidden;
    margin: auto;
    margin-top: 3rem;
    width: 86%;
  }

  .attendance-history-header {
    /*border: red solid;*/
    text-align: left;
  }

  .attendance-history-header-text {
    display: inline-block;
    /*border: purple solid;*/
  }

  .section-selector {
    /*border: orange solid;*/
    display: inline-block;
    margin-left: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .lecture-container {
    border: blue solid;
    width: 10rem;
    height: 3rem;
    border-radius: 5px;
    margin-left: 3rem;
    margin-top: 2rem;
    display: inline-block;
    float: left;
    cursor: pointer;
  }
</style>
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
          <div class="course-info-div">
            <div class="course-name-div">
              <h3 class="course-name">{{ course.name }}</h3>
            </div>
            <div class="dept-and-time-area">
              <div class="course-title">{{ course.dept }} {{ course.course_number }}</div>
              <div class="time-block">2:00pm-3:50pm</div>
            </div>
          </div>
        </div>
        <div class="info-section" id="event-info">
          <router-link v-if="is_instructor" :to="{name: 'new_event', params: { course_id: course._id }}">
            <button class="new-event-btn">Create new event for {{course.dept }} {{ course.course_number }}</button>
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
          <div>
            <h4 class="attendance-history-header-text">Attendance History (85%)</h4>
            <p class="section-selector">all sections</p>
          </div>
          <div class="right-function-buttons function-button">
            <div class="ascending-descending" v-on:click="toggleSortOrder">
              <img src="@/assets/left-arrow.svg" 
                v-bind:class="{'focused-image': sort_ascending, 'unfocused-image': !sort_ascending}" 
                style="position:relative;top:-3px;transform:rotate(90deg);width:0.6rem;" />
              <img src="@/assets/left-arrow.svg" 
                v-bind:class="{'focused-image': !sort_ascending, 'unfocused-image': sort_ascending}"
                style="position:relative;top:3px;transform:rotate(270deg);width:0.6rem;" />
            </div>
          </div>
        </div>
        <EventHistoryList v-if="is_instructor" v-bind:course="course" :sorting="event_sorting_fn" />
        <EventHistoryList v-else v-bind:section="section" :sorting="event_sorting_fn"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import EventAPI from '@/services/EventAPI.js';
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
      course_has_loaded: false,
      sort_ascending: true,
      event_sorting_fn: Function
    }
  },
  created() {
    this.event_sorting_fn = (a, b) => b - a;
    this.is_instructor = this.$store.state.user.current_user.is_instructor
    if(this.is_instructor) {
      this.course_id = this.$route.params.id
      this.getCourse()
      this.getActiveEventsForCourse()
    } else {
      this.section_id = this.$route.params.id
      this.getSectionWithCourse()
      this.getActiveEventsForSection()
    }
  },
  methods: {
    toggleSortOrder () {
      this.sort_ascending = !this.sort_ascending;
      // change the sorting function passed to the EventHistoryList
      if (this.sort_ascending) {
        this.event_sorting_fn = (a, b) => b - a;
      }
      else {
        this.event_sorting_fn = (a, b) => a - b;
      }
    },
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

  .course-info-header {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left;
  }

  .info-section {
    display: inline-block;
    margin-top: 2rem;
    float: left;
    font-family: "Segoe UI";
  }

  .dept-and-time-area {
    display: inline-block;
    text-align: left;
    width: 100%;
    margin-top: -3px;
  }

  #course-info {
    /*border: black solid;*/
    margin-top: 50px;
    min-width: 340px;
  }

  .course-name-div {
    text-align: left;
  }

  .course-info-div {
    margin-top: 30px;
    margin-left: 20px;
  }

  .course-name {
    font-size: 1.8rem;
    opacity: 0.8;
    color: #000;
    font-weight: normal;
  }

  .course-title {
    width: 40%;
    background-color: #393939;
    color: #C1EDFF;
    text-align: center;
    border-radius: 3px;
    height: 28px;
    cursor: pointer;
    line-height: 28px;
    display: inline-block;
  }

  .time-block {
    width: 50%;
    display: inline-block;
    padding-left: 15px;
    box-sizing: border-box;
    opacity: 0.9;
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
    width: 85%;
  }

  .attendance-history-header div {
    display: inline-block;
  }

  .attendance-history-header-text {
    display: inline-block;
    /*border: purple solid;*/
    font-family: "Segoe UI";
    font-size: 1.2rem;
    font-weight: normal;
  }

  .right-function-buttons {
    float: right;
  }

  .right-function-buttons {
    border: 1px solid #a8a8a8;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.05);
    width: 40px;
    height: 35px;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
  }
  
  .function-button {
    display: inline-block;
  }

  .section-selector {
    /*border: orange solid;*/
    display: inline-block;
    margin-left: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .focused-image {
    opacity: 0.8;
  }

  .unfocused-image {
    opacity: 0.4;
  }
</style>
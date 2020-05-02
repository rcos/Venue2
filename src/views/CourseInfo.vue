<template>
  <div>
    <div class="loader-box" role="status" v-if="!course_has_loaded">
      <SquareLoader />
    </div>
    <div v-else class="course-info-container">
      <!-- Course and event container -->
      <div class="page-title"><h2 class="course-info-header">Course Info</h2></div>
      
      <CourseInfoSummary 
        :courseName="course.name"
        :courseDept="course.dept"
        :courseDeptNumber="course.course_number"/>
      <!-- Attendance history -->
      <div class="attendance-history-container">
        <div class="attendance-history-header">
          <div class="attendance-history-toolbar">
            <div><h4 class="attendance-history-header-text inline-middle">Attendance History</h4></div>
            <div class="attendance-percentage inline-middle">
              <div class="attendance-percentage-number inline-middle">
                <span class="attendance-percentage-number-text"><ICountUp 
                  :delay="0"
                  :endVal="80"
                />%</span>
                <div class="attendance-up-arrow">
                  <div class="actual-up-arrow inline-middle"></div>
                  <div class="inline-middle attendance-percentage-change-text">+2%</div>
                </div>
                <div class="attendance-down-arrow">
                  <div class="actual-down-arrow inline-middle"></div>
                  <div class="inline-middle attendance-percentage-change-text"></div>
                </div>
              </div>
            </div>
            <!--<p class="section-selector">all sections</p>-->
          </div>
          <div class="right-function-buttons">
            <div class="inline btn-group-left group-btn list-style-grid active">
              <span class="icon-grid-1"></span>
            </div>
            <div class="inline btn-group-right group-btn list-style-list">
              <span class="icon-list"></span>
            </div>
          </div>
          <!--<div class="right-function-buttons function-button">
            <div class="ascending-descending" v-on:click="toggleSortOrder">
              <img src="@/assets/left-arrow.svg" 
                v-bind:class="{'focused-image': sort_ascending, 'unfocused-image': !sort_ascending}" 
                style="position:relative;top:-3px;transform:rotate(90deg);width:0.6rem;" />
              <img src="@/assets/left-arrow.svg" 
                v-bind:class="{'focused-image': !sort_ascending, 'unfocused-image': sort_ascending}"
                style="position:relative;top:3px;transform:rotate(270deg);width:0.6rem;" />
            </div>
          </div>-->
        </div>
        <EventHistoryList v-if="is_instructor" v-bind:course="course" :sorting="event_sorting_fn" />
        <EventHistoryList v-else v-bind:section="section" :sorting="event_sorting_fn"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  // <div class="info-section" id="event-info">
  //   <router-link v-if="is_instructor" :to="{name: 'new_event', params: { course_id: course._id }}">
  //     <button class="new-event-btn">Create new event for {{course.dept }} {{ course.course_number }}</button>
  //   </router-link>
  //   <div class="active-events-container">
  //     <router-link class="active-event-pill" v-for="active_event in active_events" :key="active_event._id" :to="{name: 'event_info', params: { event_id: active_event._id }}">
  //       <p class="active-event-card-section" id="active-event-name">{{ active_event.title }}</p>
  //       <p class="active-event-card-section" id="active-event-location">{{ active_event.location }}</p>
  //       <div class="active-event-card-section" id="active-event-time-remaining">
  //         <span v-if="active_event.remaining_days > 0">{{ active_event.remaining_days }}d </span>
  //         <span v-if="active_event.remaining_hours > 0">{{ active_event.remaining_hours }}h </span>
  //         <span v-if="active_event.remaining_mins > 0">{{ active_event.remaining_mins }}m</span>
  //       </div>
  //     </router-link>
  //   </div>
  // </div>

  import CourseAPI from '@/services/CourseAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import EventAPI from '@/services/EventAPI.js';
  import EventHistoryList from '@/components/EventHistoryList.vue';
  import SquareLoader from '@/components/Loaders/SquareLoader.vue';
  import CourseInfoSummary from '@/components/CourseInfoSummary.vue';
  import ICountUp from 'vue-countup-v2';

  import '@/assets/icon-font.css'  

export default {
  name: 'CourseInfo',
  components: {
    EventHistoryList,
    SquareLoader,
    CourseInfoSummary,
    ICountUp
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
      // const response = await CourseAPI.getCourse(this.course_id)
      // this.course = response.data
      // this.course_has_loaded = true

      console.log(`GetCourse(): Getting courses for instructors`)
      CourseAPI.getCourse(this.course_id)
      .then(response => {

        console.log(`GetCourse(): Courses recieved`)
        console.log(response)
        this.course = response.data
        this.course_has_loaded = true
      })
    },
    async getSectionWithCourse() {
      // const response = await SectionAPI.getSectionWithCourse(this.section_id)
      // this.section = response.data
      // this.course = this.section.course
      // this.course_has_loaded = true

      SectionAPI.getSectionWithCourse(this.section_id)
      .then(response => {
        this.section = response.data
        this.course = this.section.course
        this.course_has_loaded = true
      })
    },
    async getActiveEventsForCourse() {
      // const response = await EventAPI.getActiveEventsForCourse(this.course_id)
      // this.active_events = response.data
      // this.getRemainingTimeForActiveEvents()

      EventAPI.getActiveEventsForCourse(this.course_id)
      .then(response => {
        this.active_events = response.data
        this.getRemainingTimeForActiveEvents()
      })
    },
    async getActiveEventsForSection() {
      // const response = await EventAPI.getActiveEventsForSection(this.section_id)
      // this.active_events = response.data
      // this.getRemainingTimeForActiveEvents()

      EventAPI.getActiveEventsForSection(this.section_id)
      .then(response => {
        this.active_events = response.data
        this.getRemainingTimeForActiveEvents()
      })
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
    width: 80%;
    margin: 0 auto;
  }

  .page-title {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .course-event-container {
    /*border: green solid;*/
    overflow: hidden;
    text-align: left;
  }

  .course-info-header {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left;
  }

  .info-section {
    display: inline-block;
    font-family: "Segoe UI";
    margin-left: 0;
    vertical-align: top;
  }

  .inline {
    display: inline-block;
    vertical-align: top;
  }

  .inline-middle {
    display: inline-block;
    vertical-align: top;
  }

  .ongoing-icon {
    width: 60px;
    height: 60px;
    background-color: #FC5D60;
    border-radius: 5px;
  }

  .remaining-text {
    font-size: 1.4rem;
    line-height: 18px;
    margin-top: 8px;
    margin-left: 8px;
  }

  .dept-and-time-area {
    display: inline-block;
    text-align: left;
    width: 100%;
    margin-top: -3px;
  }

  .attendance-percentage {
    font-size: 1.2rem;
    margin-left: 2rem;
  }

  .group-btn {
    border: 1px solid rgba(0, 0, 0, 0.4);
    transition: border 0.25s, box-shadow 0.25s;
    text-align: center;
    cursor: pointer;
    width: 35px;
    height: 35px;
    line-height: 35px;
    font-size: 0.9rem;
  }

  .group-btn.active {
    border: 1px solid rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  }

  .group-btn.active:hover {
    border: 1px solid rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  }

  .group-btn:hover {
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
  }

  .btn-group-left {
    border-right: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .btn-group-left:hover {
    border-right: none;
  }

  .btn-group-right {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .attendance-history-toolbar {
    position: relative;
  }

  .loader-box {
    margin-top: 100px;
  }

  #course-info {
    /*border: black solid;*/
    min-width: 340px;
    width: 32%;
  }

  .attendance-percentage-number {
    position: relative;
  }

  .attendance-percentage-number-text {
    border-bottom: 1px dashed #06E24F;
    font-family: "Segoe UI";
    font-style: italic;
  }

  .attendance-up-arrow, .attendance-down-arrow {
    position: absolute;
    right: -60px;
    width: 50px;
    height: 15px;
  }

  .actual-up-arrow {
    margin-right: 5px;
    
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid transparent;
    border-bottom: 6px solid #48E57C;
    position: relative;
    top: -1px;
  }

  .attendance-down-arrow {
    top: 15px;
  }

  .actual-down-arrow {
    margin-right: 5px;
    
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(0, 0, 0, 0.6);
    border-bottom: 6px solid transparent;
    position: relative;
    top: 1px;
  }

  .attendance-percentage-change-text {
    font-size: 12px;
  }

  .course-name-div {
    text-align: left;
  }

  .course-info-div {
    margin-left: 20px;
  }

  .course-name {
    font-size: 1.8rem;
    opacity: 0.8;
    color: #000;
    font-weight: normal;
  }

  .time-block {
    width: 50%;
    display: inline-block;
    padding-left: 15px;
    box-sizing: border-box;
    opacity: 0.9;
  }

  #event-info {
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
    margin-top: 1.5rem;
    text-align: left;
    margin-left:20px;
  }

  .attendance-history-header {
    /*border: red solid;*/
    text-align: left;
    width: 100%;
    position: relative;
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
    position: absolute;
    right: 20px;
    height: 35px;
    width: 30%;
    text-align: right;
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
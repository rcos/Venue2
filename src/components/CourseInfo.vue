<template>
  <div class="course-info-container">
    <!-- Course and event container -->
    <div class="course-event-container">
      <div class="info-section" id="course-info">
        <h2 class="course-info-header">Course Info</h2>
        <p class="course-name">Intro to AI</p>
        <div class="course-title">CSCI 4210</div>
      </div>
      <div class="info-section" id="event-info">
        <button class="new-event-btn">Create new event for CSCI 4210</button>
        <div class="active-events-container">
          <div class="active-event-pill">
            <p class="active-event-card-section" id="active-event-name">Class 3/9</p>
            <p class="active-event-card-section" id="active-event-location">DCC 308</p>
            <p class="active-event-card-section" id="active-event-time-remaining">3m</p>
          </div>
          <div class="active-event-pill">
            <p class="active-event-card-section" id="active-event-name">Art History Tour</p>
            <p class="active-event-card-section" id="active-event-location">VCC 210</p>
            <p class="active-event-card-section" id="active-event-time-remaining">12m</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Attendance history -->
    <div class="attendance-history-container">
      <div class="attendance-history-header">
        <h4 class="attendance-history-header-text">Attendance History (85%)</h4>
        <p class="section-selector">all sections</p>
      </div>
      <div class="attendance-month-container">
        <div class="month">February</div>
        <div class="event-pill">
          <p class="event-card-section" id="event-name">Class 2/2</p>
          <p class="event-card-section" id="event-location">DCC 308</p>
        </div>
        <div class="event-pill">
          <p class="event-card-section" id="event-name">Class 2/2</p>
          <p class="event-card-section" id="event-location">DCC 308</p>
        </div>
        <div class="event-pill">
          <p class="event-card-section" id="event-name">Class 2/2</p>
          <p class="event-card-section" id="event-location">DCC 308</p>
        </div>
        <div class="event-pill">
          <p class="event-card-section" id="event-name">Class 2/2</p>
          <p class="event-card-section" id="event-location">DCC 308</p>
        </div>
        <div class="event-pill">
          <p class="event-card-section" id="event-name">Class 2/2</p>
          <p class="event-card-section" id="event-location">DCC 308</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CourseInfo',
  props: {
  },
  computed: {
  },
  components: {

  },
  data(){
    return {
      course: Object
    }
  },
  created() {
    // this.course = this.$route.params.course
    // console.log(course)
    console.log(this.$route.query.course)
  },
  methods: {
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
  }

  #event-info {
    /*border: red solid;*/
    width: 62%;
  }

  .new-event-btn {
    background-color: white;
    border: #007bff solid;
    color: #black;
    border-radius: 5px;
  }

  .active-events-container {
    /*border: black solid;*/
    margin-top: 2.5rem;
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
    /*border: red solid;*/
    display: inline-block;
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

  .attendance-month-container {
    /*border: green solid;*/
    overflow: hidden;
  }

  .month {
    float: left;
    margin-left: 2rem;
    /*border: red solid;*/
    width: 100%;
    text-align: left;
    padding-left: 1rem;
  }

  .event-pill {
    width: 14rem;
    border: green solid;
    float: left;
    margin-left: 2rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
  }

  .event-card-section {
    /*border: purple solid;*/
    display: inline-block;
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: hidden;
  }

  #event-name {
    float: left;
  }

  #event-location {
    float: right;
  }
</style>
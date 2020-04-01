<template>
  <div class="course-info-container">
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
            <p class="active-event-card-section" id="event-name">Class 3/9</p>
            <p class="active-event-card-section" id="event-location">DCC 308</p>
            <p class="active-event-card-section" id="time-remaining">3m</p>
          </div>
          <div class="active-event-pill">
            <p class="active-event-card-section" id="event-name">Art History Tour</p>
            <p class="active-event-card-section" id="event-location">VCC 210</p>
            <p class="active-event-card-section" id="time-remaining">12m</p>
          </div>
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
    overflow: hidden;
  }

  .info-section {
    display: inline-block;
    margin-top: 2rem;
    float: left;
  }

  #course-info {
    /*border: black solid;*/
    margin-left: 6rem;
  }

  .course-info-header {
    font-size: 2rem;
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
  }

  .active-event-card-section {
    /*border: red solid;*/
    display: inline-block;
  }

  #event-name {
    float: left;
  }

  #time-remaining {
    float: right;
  }
</style>
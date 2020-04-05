<template>
  <!-- ADDING USER -->
  <div>
    <h2>Create An Event For {{ course.name }}</h2>
    <form class="new-event-form" @submit.prevent="addEvent">
      <div class="form-group">
        <div class="input-wrapper">
          <label>Title</label>
          <input type="text" class="form-control new-event-input" placeholder="e.g. Event 1" v-model="event.title">
        </div>
        <div class="input-wrapper">
          <label>Location</label>
          <input type="text" class="form-control new-event-input" placeholder="e.g. DCC 308" v-model="event.location">
        </div>
        <div class="input-wrapper">
          <label>Start Time</label>
          <datetime class="time-picker" type="datetime" use12-hour value-zone="local" title="Event Start" v-model="event.start_time"></datetime>
          <label>End Time</label>
          <datetime class="time-picker" type="datetime" use12-hour value-zone="local" title="Event End" v-model="event.end_time"></datetime>
        </div>
        <div class="input-wrapper" id="submission-time-wrapper">
          <label>Submission Start Time</label>
          <datetime class="time-picker" type="datetime" use12-hour value-zone="local" title="Submission Start" v-model="event.submission_start_time"></datetime>
          <label>Submission End Time</label>
          <datetime class="time-picker" type="datetime" use12-hour value-zone="local" title="Submission End" v-model="event.submission_end_time"></datetime>
        </div>
        <div class="input-wrapper">
          <label>Section</label>
          <input type="text" class="form-control new-event-input" v-model="section.number" readonly>
        </div>

      </div>
<!--       <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>title:</label>
            <input type="text" class="form-control" v-model="event.title">
          </div>
          <div class="form-group">
            <label>location:</label>
            <input type="text" class="form-control" v-model="event.location">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group" v-if="section.course">
              <label>Section:</label>
              <input class="form-control" v-model="section.course.name" readonly>
              <input class="form-control" v-model="section.number" readonly>
            </div>
            <div v-else>
              <label>Section:</label>
              <input class="form-control" readonly>
              <input class="form-control" readonly>
            </div>
          </div>
          <label>Start Time: </label>
          <datetime type="datetime" use12-hour value-zone="local" title="Event Start" v-model="event.start_time"></datetime>
          <label>End Time: </label>
          <datetime type="datetime" use12-hour value-zone="local" title="Event End" v-model="event.end_time"></datetime>
          <label>Submission Start Time: </label>
          <datetime type="datetime" use12-hour value-zone="local" title="Event Start" v-model="event.submission_start_time"></datetime>
          <label>Submission End Time: </label>
          <datetime type="datetime" use12-hour value-zone="local" title="Event End" v-model="event.submission_end_time"></datetime>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div> -->
    </form>

    <!-- <Sections v-on:select-section="selectSection" /> -->

  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';
  // import Sections from '../Section/Sections';
  import { Datetime } from 'vue-datetime';
  import 'vue-datetime/dist/vue-datetime.css'

  export default {
    name: 'AdminNewEvent',
    components: {
      // Sections,
      datetime: Datetime
    },
    data(){
      return {
        course: {},
        event: {},
        section: {}
      }
    },
    created() {
      this.getCourse()
    },
    methods: {
      async getCourse() {
        let course_id = this.$route.params.course_id
        const response = await CourseAPI.getCourse(course_id)
        this.course = response.data
      },
      selectSection(section) {
        this.section = section
      },
      async addEvent(evt){
        evt.preventDefault();
        this.event.section = this.section
        console.log("saving event with start_date " + this.event.start_date)
        const response = await EventAPI.addEvent(this.event);
        this.$router.push({name: 'admin_events'});
      }
    }
  }
</script>

<style>
  .new-event-form {
    /*border: black solid;*/
  }

  .input-wrapper {
    width: 50%;
    margin: auto;
    margin-top: 3rem;
    /*border: blue solid;*/
  }

  #submission-time-wrapper {
    width: 80%;
  }

  .time-picker {
    /*border: black solid;*/
    display: inline-block;
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
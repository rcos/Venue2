<template>
  <!-- ADDING USER -->
  <div>
    <h2>Create An Event</h2>
    <form @submit.prevent="addEvent">
      <div class="row">
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
        </div>
    </form>

    <Sections v-on:select-section="selectSection" />

  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';
  import Sections from '../Section/Sections';
  import { Datetime } from 'vue-datetime';
  import 'vue-datetime/dist/vue-datetime.css'

  export default {
    name: 'NewEvent',
    components: {
      Sections,
      datetime: Datetime
    },
    data(){
      return {
        event: {
        },
        section: {}
      }
    },
    created() {
    },
    methods: {
      selectSection(section) {
        this.section = section
      },
      async addEvent(evt){
        evt.preventDefault();
        this.event.section = this.section
        console.log("saving event with start_date " + this.event.start_date)
        const response = await EventAPI.addEvent(this.event);
        this.$router.push({name: 'events'});
      }
    }
  }
</script>
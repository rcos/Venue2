<template>
  <div>
    <h2>Edit Event</h2>
    <form @submit.prevent="updateEvent">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>title:</label>
            <input type="text" class="form-control" v-model="event.title">
          </div>
        </div>
      </div>
      <div class="spinner-border" role="status" v-if="!section_has_loaded">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="row" v-else>
        <div class="col-md-6">
          <div class="form-group">
            <label>Section:</label>
            <input class="form-control" v-model="event.section.course.name" readonly>
            <input class="form-control" v-model="event.section.number" readonly>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>

  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';

  export default {
    name: 'EditEvent',
    data(){
      return {
        event: {},
        section_has_loaded: false
      }
    },
    created() {
      this.getEvent()
    },
    methods: {
      async getEvent(){
        let event_id = this.$route.params.id
        const response = await EventAPI.getEvent(event_id)
        this.event = response.data
        this.getSectionForEvent()
      },
      async getSectionForEvent(){
        let response = await SectionAPI.getSection(this.event.section)
        this.event.section = response.data
        response = await CourseAPI.getCourse(this.event.section.course)
        this.event.section.course = response.data
        this.section_has_loaded = true
      },
      async updateEvent() {
        let event_id = this.$route.params.id
        const response = await EventAPI.updateEvent(event_id, this.event)
        this.$router.push({name: 'events'})
      }
    }
  }
</script>
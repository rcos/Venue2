<template>
  <div>
    <h2>Events</h2>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>title</th>
          <th>section</th>
          <th>start_time</th>
          <th>end_time</th>
        </tr>
        </thead>
        <div class="spinner-border" role="status" v-if="!sections_have_loaded">
          <span class="sr-only">Loading...</span>
        </div>
        <tbody v-else>
          <tr v-for="event in events" :key="event._id">
            <td>{{ event.title }}</td>
            <td> {{ event.section.course.name }} {{ event.section.number }}</td>
            <td> {{ event.start_time }}</td>
            <td> {{ event.end_time }}</td>
            <div v-if="is_event_view">
              <td><router-link :to="{name: 'edit_event', params: { id: event._id }}" class="btn btn-primary">Edit</router-link></td>
              <td><button class="btn btn-danger" @click.prevent="deleteEvent(event._id)">Delete</button></td>
            </div>
            <td v-else><button class="btn btn-secondary" @click.prevent="$emit('select-event', event)">Select</button></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';


  export default {
    name: 'Events',
    data(){
      return {
        events: [],
        sections_have_loaded: false,
        is_event_view: Boolean
      }
    },
    created() {
      this.loadEvents()
      this.setEventView()
    },
    methods: {
      async loadEvents () {
        const response = await EventAPI.getEvents()
        this.events = response.data
        if(this.events.length === 0)
          this.sections_have_loaded = true
        else
          this.getSectionsForEvents()
      },
      async deleteEvent(id){
        const response = await EventAPI.deleteEvent(id);
        this.events.splice(this.events.findIndex(i => i._id == id), 1)
      },
      async getSectionsForEvents(){
        let counter = 0
        this.events.forEach(async event => {
          let response = await SectionAPI.getSection(event.section)
          event.section = response.data
          response = await CourseAPI.getCourse(event.section.course)
          event.section.course = response.data
          counter++
          if(counter == this.events.length)
            this.sections_have_loaded = true
        })
      },
      setEventView() {
        this.is_event_view = this.$router.currentRoute.name === "events"
      }
    }
  }
</script>
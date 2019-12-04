<template>
  <div>
    <h2>Events</h2>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>title</th>
          <th>section</th>
        </tr>
        </thead>
        <div class="spinner-border" role="status" v-if="!sections_have_loaded">
          <span class="sr-only">Loading...</span>
        </div>
        <tbody v-else>
          <tr v-for="event in events" :key="event._id">
            <td>{{ event.title }}</td>
            <td> {{ event.section.course.name }} {{ event.section.number }}</td>
            <div>
              <td><router-link :to="{name: 'edit_event', params: { id: event._id }}" class="btn btn-primary">Edit</router-link></td>
              <td><button class="btn btn-danger" @click.prevent="deleteEvent(event._id)">Delete</button></td>
            </div>
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
      // this.setIsCourseView()
    },
    methods: {
      async loadEvents () {
        const response = await EventAPI.getEvents()
        this.events = response.data
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
      }
      // setIsCourseView() {
      //   this.is_course_view = this.$router.currentRoute.name === "courses"
      // }
    }
  }
</script>
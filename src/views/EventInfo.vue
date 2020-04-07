<template>
  <div>
    <!-- Event Headers -->
    <div class="spinner-border" role="status" v-if="!event_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <!-- Times -->
    <div v-else>
      <h1 class="event-title">{{ event.title }}</h1>
      <h6>{{ event.location }}</h6>
      <h3 class="course-name">{{ event.section.course.name }}</h3>
      <h5 class="section-numbers">Section {{ event.section.number }}</h5>
      <div class="time-info-container">
        <h4 class="time-info">Start time: {{ new Date(event.start_time) }}</h4>
        <h4 class="time-info">End time: {{ new Date(event.end_time) }}</h4>
        <h4 class="time-info">Submission Start time: {{ new Date(event.submission_start_time) }}</h4>
        <h4 class="time-info">Submission End time: {{ new Date(event.submission_end_time) }}</h4>
      </div>
      <!-- Submission Info -->
      <div class="submission-status">
        <div v-if="this.is_instructor">
          <div v-if="is_pending">
            Event not started yet
          </div>
          <div v-else-if="is_active">
            <button>Show QR Code</button>
          </div>
          <div v-else>
            Event is over - show submission statistics
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';

export default {
  name: 'EventInfo',
  props: {
  },
  computed: {
  },
  components: {
  },
  data(){
    return {
      event: {},
      is_instructor: Boolean,
      event_has_loaded: false,
      is_pending: false,
      is_active: false,
      is_over: false
    }
  },
  created() {
    this.getEvent()
    this.is_instructor = this.$store.state.user.current_user
  },
  methods: {
    async getEvent() {
      let event_id = this.$route.params.event_id
      const response = await EventAPI.getEventWithSectionAndCourse(event_id)
      this.event = response.data
      this.event_has_loaded = true
      this.setEventStatus()
    },
    setEventStatus() {
      let current_time = new Date()
      let event_start_time = new Date(this.event.start_time)
      let event_end_time = new Date(this.event.end_time)
      if(current_time <= event_start_time) 
        this.is_pending = true
      else if(current_time >= event_start_time && current_time <= event_end_time)
        this.is_active = true
      else
        this.is_over = true
    }
  }
}
</script>

<style scoped>
  .event-title {
    margin-top: 1rem;
  }

  .course-name {
    margin-top: 2rem;
  }

  .time-info-container {
    margin-top: 2rem;
  }

  .time-info {
/*    display: inline-block;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 2rem;*/
  }

  .submission-status {
    margin-top: 3rem;
  }
</style>
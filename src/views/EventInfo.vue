<template>
  <div>
    <h1 class="event-title">{{ event.title }}</h1>
    <h6>{{ event.location }}</h6>
    <h3 class="course-name">{{ event.section.course.name }}</h3>
    <h5 class="section-numbers">Section {{ event.section.number }}</h5>
    <div>
      <h4 class="time-info">Start time: </h4>
      <h4 class="time-info">End time: </h4>
      <h4 class="time-info">Submission Start time: </h4>
      <h4 class="time-info">Submission End time: </h4>
    </div>
    <div class="submission-status">Submission window status</div>
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
      event: {}
    }
  },
  created() {
    this.getEvent()
  },
  methods: {
    async getEvent() {
      let event_id = this.$route.params.event_id
      const response = await EventAPI.getEventWithSectionAndCourse(event_id)
      this.event = response.data
      console.log(this.event)
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

  .time-info {
    display: inline-block;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 2rem;
  }

  .submission-status {
    margin-top: 3rem;
  }
</style>
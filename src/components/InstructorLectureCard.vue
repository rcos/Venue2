<template>
  <div class="lecture-card">
    <div class="lecture-card-section" id="left-section">
      <p class="course-name">{{ lecture.sections[0].course.name }}</p>
      <p class="course-title">{{ lecture.sections[0].course.dept }} {{ lecture.sections[0].course.course_number }}</p>
    </div>
    <div class="lecture-card-section" id="middle-section">
      <p class="lecture-name">{{ lecture.title }}</p>
    </div>
    <div class="lecture-card-section" id="right-section">
      <div v-if="lecture_type === 'Live'" class="right-container">
        <img src="@/assets/clock.svg" class="clock" aria-label="Time Icon">
        <p class="lecture-time-text">5m</p>
      </div>
      <div v-else-if="lecture_type === 'Playback'" class="right-container">
        <p class="playback-percentage-text">87% submission</p>
      </div>
      <div v-else-if="lecture_type === 'Recent'" class="right-container">
        <p class="recent-percentage-text">91% submission</p>
      </div>
      <div v-else-if="lecture_type === 'Upcoming'" class="right-container">
        <img src="@/assets/clock.svg" class="clock" aria-label="Time Icon">
        <p class="lecture-time-text upcoming-text">{{ getUpcomingTimeString(lecture.start_time) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LectureCard',
    props: {
      lecture_type: String,
      lecture: Object
    },
    computed: {
    },
    components: {

    },
    data(){
      return {
      }
    },
    created() {
    },
    methods: {
      getUpcomingTimeString(time) {
        let upcoming_time = new Date(time)
        let month = upcoming_time.getMonth()
        let day = upcoming_time.getDay()
        let year = upcoming_time.getFullYear()
        return month + '/' + day + '/' + year
      }
    }
  }
</script>

<style scoped>

</style>

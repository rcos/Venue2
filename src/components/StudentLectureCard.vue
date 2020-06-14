<template>
  <div class="lecture-card">
    <div class="lecture-card-section" id="left-section">
      <p class="course-name">Open Source Software</p>
      <p class="course-title">CSCI 2960-01</p>
    </div>
    <div class="lecture-card-section" id="middle-section">
      <p class="lecture-name">Class 5/20</p>
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
        <p class="lecture-time-text upcoming-text">3/3/20</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LectureCard',
    props: {
      lecture_type: String
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

    }
  }
</script>

<style scoped>

</style>

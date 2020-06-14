<template>
  <div class="lecture-card">
    <div class="lecture-card-section" id="left-section">
      <p class="course-name">Open Source Software</p>
      <p class="course-title">CSCI 2960-01</p>
    </div>
    <div class="lecture-card-section" id="middle-section">
      <p class="lecture-name">Class 5/20</p>
    </div>
    <div class="lecture-card-section" id="right-section"></div>

<!--     <div v-if="lecture_type === 'Live'">
      I'm live
    </div>
    <div v-else-if="lecture_type === 'Playback'">
      Playback
    </div>
    <div v-else-if="lecture_type === 'Recent'">
      Recent
    </div>
    <div v-else-if="lecture_type === 'Upcoming'">
      Upcoming
    </div> -->
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

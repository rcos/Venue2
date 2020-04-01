<template>
  <div class="course-info-container">
    <div class="course-event-container">
      <div class="info-section" id="course-info">
        <h2 class="course-info-header">Course Info</h2>
        <p class="course-name">Intro to AI</p>
        <div class="course-title">CSCI 4210</div>
      </div>
      <div class="info-section" id="event-info">
        <button>Create new event for CSCI 4210</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CourseInfo',
  props: {
  },
  computed: {
  },
  components: {

  },
  data(){
    return {
      course: Object
    }
  },
  created() {
    // this.course = this.$route.params.course
    // console.log(course)
    console.log(this.$route.query.course)
  },
  methods: {
  }
}
</script>

<style scoped>
  .course-info-container {
    border: blue solid;
    overflow: hidden;
  }

  .info-section {
    display: inline-block;
    margin-top: 2rem;
    float: left;
  }

  #course-info {
    border: black solid;
    margin-left: 6rem;
  }

  .course-info-header {
    font-size: 2rem;
  }

  .course-title {
    border: black solid;
    display: inline-block;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  #event-info {
    border: red solid;
    width: 70%;
  }

</style>
<template>
  <div id="lecture-info-section">
    <h1>{{lecture.title}} Info</h1>
    <show-at breakpoint="small">
      <!-- Mobile Start -->
      <div id="lecture-data">
        <div class="row main-info">
          <h3>{{lecture.sections[0].course.name}}</h3>
          <h5 class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</h5>
          <h5>Sections: <a class="section-numbers" v-for="(section,i) in lecture.sections" :key="i">{{ section.number }}</a></h5>
        </div>
        <div class="row">
          <h5>Start Time:<h6>{{new Date(lecture.start_time)}}</h6></h5>
        </div>
        <div class="row">
          <h5>End Time: <h6>{{new Date(lecture.end_time)}}</h6></h5>
        </div>
        <div class="row">
          <h5>Submission Start Time: <h6>{{new Date(lecture.submission_start_time)}}</h6></h5>
        </div>
        <div class="row">
          <h5>Submission End Time: <h6>{{new Date(lecture.submission_end_time)}}</h6></h5>
        </div>
      </div>
      <!-- Mobile End -->
    </show-at>
    <show-at breakpoint="mediumAndAbove">
      <!-- Not-mobile Start -->
      <div class="row" id="lecture-data">
        <div class="col main-info">
          <h3>{{lecture.sections[0].course.name}}</h3>
          <h5 class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</h5>
          <h5>Sections: <a class="section-numbers" v-for="(section,i) in lecture.sections" :key="i">{{ section.number }}</a></h5>
        </div>
        <div class="col">
          <h5>Start Time</h5>
          <h6>{{new Date(lecture.start_time)}}</h6>
        </div>
        <div class="col">
          <h5>End Time</h5>
          <h6>{{new Date(lecture.end_time)}}</h6>
        </div>
        <div class="col">
          <h5>Submission Start Time</h5>
          <h6>{{new Date(lecture.submission_start_time)}}</h6>
        </div>
        <div class="col">
          <h5>Submission End Time</h5>
          <h6>{{new Date(lecture.submission_end_time)}}</h6>
        </div>
      </div>
      <!-- Not-mobile End -->
    </show-at>
  </div>
</template>

<script>
  import {showAt, hideAt} from 'vue-breakpoints';

  export default {
    name: 'LectureInfoHeader',
    components: {
      showAt,
      hideAt
    },
    props: {
      lecture: Object
    },
    data(){
      return {
      }
    },
    created() {
      console.log("Received this lecture",this.lecture)
    },
    methods: {
    }
  }
</script>

<style scoped>
  #lecture-info-section {
    position: relative;
    border: black solid;
  }

  #lecture-data {
    position: relative;
    text-align: center;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  .row {
    position: relative;
    right: 1rem;
  }

  .col.main-info {
    border-radius: .5rem;
    box-shadow: 0 5px 10px -1px gray;
    padding: 1rem;
  }

  .row.main-info {
    border-radius: .5rem;
    box-shadow: 0 5px 10px -1px gray;
    padding: 1rem;
    margin-right: 1rem;
  }

  .dept-and-number {
    background: black;
    color: white;
    border-radius: 1rem;
  }

</style>
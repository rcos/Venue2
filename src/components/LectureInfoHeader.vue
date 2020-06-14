<template>
  <div id="lecture-info-section">
    <h1>{{lecture.title}} Info</h1>
    <show-at breakpoint="small">
      <!-- Mobile -->
      <div id="lecture-data">
        <div class="row main-info">
          <h3>{{lecture.sections[0].course.name}}</h3>
          <h5 class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</h5>
          <h5>Sections: <a class="section-numbers" v-for="(section,i) in lecture.sections" :key="i">{{ section.number }}</a></h5>
        </div>
        <div class="row">
          <div class="col-half">
            <h5 class="underline">Start Time</h5>
            <h6>{{new Date(lecture.start_time)}}</h6>
          </div>
          <div class="col-half">
            <h5 class="underline">Playback Start Time</h5>
            <h6>{{new Date(lecture.playback_submission_start_time)}}</h6>
          </div>
        </div>
        <div class="row">
          <div class="col-half">
            <h5 class="underline">End Time</h5>
            <h6>{{new Date(lecture.end_time)}}</h6>
          </div>
          <div class="col-half">
            <h5 class="underline">Playback End Time</h5>
            <h6>{{new Date(lecture.playback_submission_end_time)}}</h6>
          </div>
        </div>
        <div class="col" v-if="is_instructor">
          <h5>Checkins</h5>
          <div id="checkins-container">
            <div class="checkin-container">
              <div class="time-container">
                <p class="underline">Start Time</p>
              </div>
              <div class="time-container">
                <p class="underline">End Time</p>
              </div>
            </div>
            <div class="checkin-container" v-for="checkin in lecture.checkins">
              <div class="time-container">
                <p>{{ new Date(checkin.start_time) }}</p>
              </div>
              <div class="time-container">
                <p>{{ new Date(checkin.end_time) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </show-at>
    <!-- Tablet & Up -->
    <show-at breakpoint="mediumAndAbove">
      <div class="row" id="lecture-data">
        <div class="col main-info">
          <h3>{{lecture.sections[0].course.name}}</h3>
          <h5 class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</h5>
          <h5>Sections: <a class="section-numbers" v-for="(section,i) in lecture.sections" :key="i">{{ section.number }}</a></h5>
        </div>
        <div class="col">
          <div class="col-half">
            <h5 class="underline">Start Time</h5>
            <h6>{{new Date(lecture.start_time)}}</h6>
          </div>
          <div class="col-half">
            <h5 class="underline">Playback Start Time</h5>
            <h6>{{new Date(lecture.playback_submission_start_time)}}</h6>
          </div>
        </div>
        <div class="col">
          <div class="col-half">
            <h5 class="underline">End Time</h5>
            <h6>{{new Date(lecture.end_time)}}</h6>
          </div>
          <div class="col-half">
            <h5 class="underline">Playback End Time</h5>
            <h6>{{new Date(lecture.playback_submission_end_time)}}</h6>
          </div>
        </div>
        <div class="col" v-if="is_instructor">
          <h5 class="underline">Checkins</h5>
          <div id="checkins-container">
            <div class="checkin-container">
              <div class="time-container">
                <p class="underline">Start Time</p>
              </div>
              <div class="time-container">
                <p class="underline">End Time</p>
              </div>
            </div>
            <div class="checkin-container" v-for="checkin in lecture.checkins">
              <div class="time-container">
                <p>{{ new Date(checkin.start_time) }}</p>
              </div>
              <div class="time-container">
                <p>{{ new Date(checkin.end_time) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      lecture: Object,
      is_instructor: Boolean
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
  #lecture-info-section {
    position: relative;
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

  #checkins-container {
    overflow-y: scroll;
    height: 9rem;
  }

  .checkin-container {
    border: grey solid;
  }

  .time-container {
    display: inline-block;
    text-align: center;
    width:50%;
    border: grey solid thin;
  }

  .underline {
    text-decoration: underline;
  }

</style>
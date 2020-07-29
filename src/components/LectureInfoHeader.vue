<template>
  <div id="lecture-info-section">
    <show-at breakpoint="small">
      <!-- Mobile -->
      <div id="lecture-data">
        <div class="row" id="main-info">
          <h3>{{lecture.sections[0].course.name}}</h3>
          <p class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</p>
          <p>Sections:
            <a class="section-numbers" role="text" v-for="(section,i) in lecture.sections" :key="i">
              <a v-if="i > 0">,{{ section.number }}</a>
              <a v-else>{{ section.number }}</a>
            </a>
          </p>
        </div>
        <div class="row">
          <h1 id="lecture-title-mobile">{{lecture.title}} - Info</h1>
        </div>
        <div v-if="lecture.start_time" class="row start-end-row">
          <div class="row-half">
            <h5>Lecture Window</h5>
            <p>{{getPrettyDateTime(new Date(lecture.start_time))}}</p>
            <p>-</p>
            <p>{{getPrettyDateTime(new Date(lecture.end_time))}}</p>
          </div>
        </div>
        <div v-if="lecture.playback_submission_start_time" class="row playback-row">
          <div class="row-half">
            <h5>Video Attendance Window</h5>
            <p>{{getPrettyDateTime(new Date(lecture.playback_submission_start_time))}}</p>
            <p>-</p>
            <p>{{getPrettyDateTime(new Date(lecture.playback_submission_end_time))}}</p>
          </div>
        </div>
      </div>
    </show-at>
    <!-- Tablet & Up -->
    <show-at breakpoint="mediumAndAbove">
      <div>
        <div class="row" id="lecture-data">
          <div class="col-3">
            <div id="main-info">
              <h3>{{lecture.sections[0].course.name}}</h3>
              <p class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</p>
              <p class="sections">Sections:
                <a class="section-numbers" role="text" v-for="(section,i) in lecture.sections" :key="i">
                  <a v-if="i > 0">,{{ section.number }}</a>
                  <a v-else>{{ section.number }}</a>
                </a>
              </p>
            </div>
          </div>
          <div class="col">
            <h1 id="lecture-title">{{lecture.title}} - Info</h1>
          </div>
        </div>
        <div class="row">
          <div v-if="lecture.start_time" class="col">
            <h5>Lecture Window</h5>
            <p>{{getPrettyDateTime(new Date(lecture.start_time))}} - {{getPrettyDateTime(new Date(lecture.end_time))}}</p>
          </div>
          <div v-if="lecture.playback_submission_start_time" class="col">
            <h5>Video Attendance Window</h5>
            <p>{{getPrettyDateTime(new Date(lecture.playback_submission_start_time))}} - {{getPrettyDateTime(new Date(lecture.playback_submission_end_time))}}</p>
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
      getPrettyDateTime(datetime) {
        if("Invalid Date" == datetime) {
          return ("Not set")
        }
        let hours = datetime.getHours()
        let minutes = datetime.getMinutes()
        if(minutes < 10) {
          minutes = "0" + minutes
        }
        if(hours < 12) {
          return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==0 ? "12" : hours) + ":" + minutes + " AM")
        } else {
          return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==12 ? hours : hours-12) + ":" + minutes + " PM")
        }
      }
    }
  }
</script>

<style scoped>
  #lecture-title {
    position: absolute;
    bottom: 0;
    text-align: left;
    margin-left: 1rem;
  }

  #lecture-title-mobile {
    width: 100%;
  }

  #lecture-info-section {
    position: relative;
  }

  #lecture-data {
    position: relative;
    margin-top: 2rem;
    text-align: center;
  }

  .col {
    margin: 0;
  }

  .row {
    margin-top: 2rem;
  }

  .row-half {
    width: 50%;
  }

  #main-info {
    border-radius: .5rem;
    box-shadow: 0 5px 10px -1px gray;
    padding: 1rem;
    margin: 0;
  }

  .row-half h5,
  .col h5 {
    font-weight: 900;
  }

  .dept-and-number {
    background: black;
    color: white;
    border-radius: 1rem;
    padding: 0.5rem;
  }

  .sections {
    padding: 0.5rem;
  }

  #checkins-container {
    width: 100%;
    border: grey solid;
  }

  .time-container {
    display: inline-block;
    text-align: center;
    width:50%;
    border: grey solid thin;
  }

</style>
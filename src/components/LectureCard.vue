<template>
  <div class="lecture-card">
    <div v-if="lecture_type === 'Live'" class="lecture-card-background" :class="{'live-lecture-open':lecture.checkin_window_status === 'open', 'live-lecture-closed':lecture.checkin_window_status ==='closed'}">
    </div>
    <div v-else class="lecture-card-background" :class="{'playback-lecture':lecture_type === 'Playback', 'recent-lecture':lecture_type === 'Recent', 'upcoming-lecture':lecture_type === 'Upcoming'}">
    </div>
    <div class="lecture-card-foreground">
      <router-link class="lecture_card_link" :to="{name: 'lecture_info', params: { lecture_id: lecture._id }}" :aria-label="'Lecture Info - '+ lecture_course.name +' - '+lecture.title">
        <div class="lecture-card-section" id="left-section">
          <p class="course-name">{{ lecture_course.name }}</p>
          <p class="course-title">{{ lecture_course.dept }} {{ lecture_course.course_number }}</p>
        </div>
        <div class="lecture-card-section" id="middle-section">
          <p class="lecture-name">{{ lecture.title }}</p>
        </div>
        <div class="lecture-card-section" id="right-section">
          <div v-if="lecture_type === 'Live'" class="right-container">
            <img src="@/assets/clock.svg" class="clock" aria-label="Time Icon">
            <p v-if="lecture.checkin_window_status === 'open'" class="lecture-time-text open-text">{{ getTimeToWindowCloseString() }}</p>
            <p v-else class="lecture-time-text closed-text">closed</p>
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
      </router-link>
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
        is_instructor: Boolean,
        lecture_course: Object
      }
    },
    created() {
      this.is_instructor = this.$store.state.user.current_user.is_instructor
      this.lecture_course = this.lecture.sections[0].course
    },
    methods: {
      getTimeToWindowCloseString() {
        let current_time = new Date()
        let window_close_time = this.getCurrentCheckinWindowCloseTime()
        // get total seconds between the times
        let delta = Math.abs(window_close_time - current_time) / 1000;
        let diff_days = Math.floor(delta / 86400);
        var diff_hours = Math.floor(delta / 3600) % 24;
        var diff_minutes = Math.floor(delta / 60) % 60;
        let time_to_close_str = ""
        if(diff_days > 0)
          time_to_close_str += diff_days + "d "
        if(diff_hours > 0)
          time_to_close_str += diff_hours + "h "
        time_to_close_str += diff_minutes + "m "
        return time_to_close_str
      },
      getCurrentCheckinWindowCloseTime() {
        return new Date(this.lecture.checkins[this.lecture.checkin_index].end_time)
      },
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
  .lecture-card {
    position: relative;
  }

  .lecture-card-background {
    height: 4rem;
    margin-top: 2rem;
    border-radius: 5px;
    /*background-color: #4ECC4B;*/
  }

  .live-lecture-open {
    background-color: #4ECC4B;
  }

  .live-lecture-closed {
    background-color: #F29F33;
  }

  .playback-lecture {
    background-color: #516DED;
  }

  .recent-lecture {
    background-color: #858585;
  }

  .upcoming-lecture {
    background-color: #00B3FF;
  }

  .lecture-card-foreground {
    position: absolute;
    height: 4rem;
    width: 96.5%;
    margin-top: -3.5rem;
    /*margin-left:.5rem;*/
    margin-left: 1.7%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
    z-index: 4;
  }

  .lecture-card-foreground:hover {
    background-color: #c9c9c9;
    -webkit-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
  }

  .lecture-card-section {
    height: 4rem;
    display: inline-block;
    /*border: black solid;*/
    vertical-align: top;
  }

  #left-section {
    width: 30%;
  }

  #middle-section {
    width: 40%;
  }

  #right-section {
    width: 30%;
  }

  .course-name {
    font-size: .75rem;
    margin-top: 1rem;
    color: #466D85;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 90%;
  }

  .course-title {
    font-size: .75rem;
    color: #1591C5;
    font-weight: bold;
    /*margin-top: .5rem;*/
  }

  .lecture-name {
    color: #2C3E50;
    font-size: 1.25rem;
    margin-top: 1rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 95%;
  }

  .clock {
    display: inline-block;
    vertical-align: middle;
    height: 1rem;
    font-weight: bold;
    float: left;
  }

  .right-container {
    margin: auto;
    margin-top: 1.4rem;
    width: 97%;
    font-size: .9rem;
    /*font-weight: bold;*/
  }

  .lecture-time-text {
    display: inline-block;
    font-size: .8rem;
    float: left;
    margin-left: .5rem;
    font-weight: bold;
  }

  .playback-percentage-text {
    color: #516DED;
    font-weight: bold;
  }

  .recent-percentage-text {
    color: #858585;
    font-weight: bold;
  }

  .upcoming-text {
    color: #00B3FF;
  }

  .open-text {
    color: #4ECC4B;
  }

  .closed-text {
    color: #F29F33;
  }

</style>

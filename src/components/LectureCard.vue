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
            <img src="@/assets/clock.svg" class="clock" aria-label="Time Icon" alt="Time Icon">
            <p v-if="lecture.checkin_window_status === 'open'" class="lecture-time-text open-text">{{ getTimeToWindowCloseString(false) }}</p>
            <p v-else class="lecture-time-text closed-text">closed</p>
          </div>
          <div v-else-if="lecture_type === 'Playback'" class="right-container">
            <img src="@/assets/clock.svg" class="clock" aria-label="Time Icon" alt="Time Icon">
            <p class="lecture-time-text playback-percentage-text">{{ getTimeToWindowCloseString(true) }}</p>
            <!-- <p class="playback-percentage-text">87% submission</p> -->
          </div>
          <div v-else-if="lecture_type === 'Recent'" class="right-container">
            <img src="@/assets/clock.svg" class="clock" aria-label="Time Icon" alt="Time Icon">
            <p class="lecture-time-text">closed</p>
            <!-- <p class="recent-percentage-text">91% submission</p> -->
          </div>
          <div v-else-if="lecture_type === 'Upcoming'" class="right-container">
            <img src="@/assets/clock.svg" class="clock" aria-label="Time Icon" alt="Time Icon">
            <p v-if="lecture.allow_live_submissions" class="lecture-time-text upcoming-text">{{ getUpcomingTimeString(lecture.start_time) }}</p>
            <p v-else class="lecture-time-text upcoming-text">{{ getUpcomingTimeString(lecture.playback_submission_start_time) }}</p>
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
      // TODO: Change plabyack and recent sections to show percentages like in figma
      this.is_instructor = this.$store.state.user.current_user.is_instructor
      this.lecture_course = this.lecture.sections[0].course
    },
    methods: {
      getTimeToWindowCloseString(is_playback) {
        let current_time = new Date()
        let window_close_time;
        if(is_playback)
          window_close_time = new Date(this.lecture.playback_submission_end_time)
        else
          window_close_time = this.getCurrentCheckinWindowCloseTime()
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
        let month = upcoming_time.getMonth()+1
        let day = upcoming_time.getDate()
        let year = upcoming_time.getFullYear()
        return month + '/' + day + '/' + year
      }
    }
  }
</script>

<style scoped>
  .lecture-card {
    position: relative;
    margin-bottom: 2rem;
  }

  .lecture-card-background {
    height: 4rem;
    width: 95%;
    margin-left: 0;
    border-radius: 5px;
    -webkit-transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
    -ms-transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .live-lecture-open {
    background-color: #04852F;
  }

  .live-lecture-closed {
    background-color: #f29f33;
  }

  .playback-lecture {
    background-color: #683eca;
  }

  .recent-lecture {
    background-color: #858585;
  }

  .upcoming-lecture {
    background-color: #0076a8;
  }

  .lecture-card-foreground {
    position: absolute;
    height: 4rem;
    width: 91%;
    margin-top: -3.5rem;
    margin-left: 1.7%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
    z-index: 4;
  }

  .lecture-card:hover .lecture-card-background,
  .lecture-card:focus-within .lecture-card-background{
    /* height: 4.5rem; */
    width: 100%;
    /* margin-left: -1.25%; */
    -webkit-transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
    -ms-transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .lecture_card_link:focus {
    outline: none;
  }

  .lecture-card-section {
    height: 4rem;
    display: inline-block;
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
    color: #097bac;
    font-weight: bold;
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
    color: #683eca;
    font-weight: bold;
  }

  .recent-percentage-text {
    color: #858585;
    font-weight: bold;
  }

  .upcoming-text {
    color: #0076a8;
  }

  .open-text {
    color: #04852F;
  }

  .closed-text {
    color: #a7640d;
  }

</style>

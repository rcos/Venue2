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
      getTimeToWindowCloseString() {
        let current_time = new Date()
        let window_close_time = this.getCurrentCheckinWindowCloseTime()
        // get total seconds between the times
        let delta = Math.abs(window_close_time - current_time) / 1000;
        let diff_days = Math.floor(delta / 86400);
        var diff_hours = Math.floor(delta / 3600) % 24;
        var diff_minutes = Math.floor(delta / 60) % 60;
        console.log("diff_days",diff_days)
        console.log("diff_hours",diff_hours)
        console.log("diff_minutes",diff_minutes)
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

</style>

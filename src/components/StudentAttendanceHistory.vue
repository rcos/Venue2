<template>
  <div class="student-attendance">
    <div v-for="year in Object.keys(timeline)" :key="year">
      <div v-for="month in Object.keys(timeline[year])" :key="month">
        <div v-if="mobileMode">
          <div class="month-area mobile">{{ STATIC_MONTHS[month] }} {{year}}</div>
          <div class="mobile-event-pill-area">
            <router-link v-for="i in timeline[year][month]" :key="lectures[i]._id" :to="{name: 'lecture_info', params: { lecture_id: lectures[i]._id }}" :aria-label="'Lecture Info - '+lectures[i].title">
              <div :class="'mobile-pill ' + getClassByAttendance(lectures[i].percentage == undefined ? 0 : lectures[i].percentage)">
                <div class="day-of-week">{{ getDayOfWeek(lectures[i]) }}</div>
                <div class="day-of-month">{{ getDayOfMonth(lectures[i]) }}</div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-else>
          <div class="month-area">{{ STATIC_MONTHS[month] }} {{year}}</div>
          <div class="event-pills-area">
            <router-link v-for="i in timeline[year][month]" :key="lectures[i]._id" :to="{name: 'lecture_info', params: { lecture_id: lectures[i]._id }}" tabindex="-1">
              <div :class="'inline-block instructor-attendance-history-pill ' + getClassByAttendance(lectures[i].percentage == undefined ? 0 : lectures[i].percentage)" tabindex="0" :aria-label="'Lecture Info - '+lectures[i].title">
                <div class="inline-block date-area">
                  <div class="day-of-week">{{ getDayOfWeek(lectures[i]) }}</div>
                  <div class="day-of-month">{{ getDayOfMonth(lectures[i]) }}</div>
                </div>
                <div class="inline-block name-area">
                  <div class="event-name">{{ shortenString(lectures[i].title, 18) }}</div>
                  <div class="event-location">Event Location</div>
                </div>
                <div class="inline-block percentage-area">
                  <div v-if="scores_loaded">{{lectures[i].percentage == undefined ? 0 : lectures[i].percentage}}%</div>
                  <SquareLoader v-else/>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js'

  export default {
    name: 'StudentAttendanceHistory',
    components: { SquareLoader },
    props: {
      mobileMode: Boolean,
      lectures: Array,
      timeline: Object
    },
    data () {
      return {
        current_user: Object,
        STATIC_MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        STATIC_DAY_OF_WEEK: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        scores_loaded: false
      }
    },
    created () {
      this.getCurrentUser ()
      this.calculateGradeForHistoryData()
    },
    methods: {
      shortenString (string, max_length) {
        if (string.length < max_length) {
          return string
        }
        return string.substring(0, max_length - 3) + "..."
      },
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
      },
      getClassByAttendance (percent) {
        // percent b/w 0 and 100
        if (percent <= 60) return 'bad'
        else if (percent <= 75) return 'medium'
        return 'good'
      },
      calculateGradeForHistoryData () {
        /* for each of the lectures in this section, we determine the grade by:
         * (1) if the student submitted during the live lecture, they get a 100%
         * (2) if the student did not attend the live lecture, and has not submitted to the
         *      playback, regardless of whether the playback is available or not, they get a 0%
         * (3) if the student does not attend the live lecture, but attends the playback lecture,
         *      they grade is the percentage of the polls they got correct.
        */

        // First, get all lecture submissions from this student for each individual lecture
        // If there is not a submission, return 0%
        // If there is a submission, and is_live_submission == true, return 100%
        // Otherwise, go through the student's poll answers and grade their poll answers
        let promise_tracker = []

        this.lectures.forEach(lecture_data => {

          promise_tracker.push(
            LectureSubmissionAPI.getLectureSubmissionsForStudent(lecture_data._id, this.current_user._id)
            .catch(err => { console.log(`error retrieving lecture submissions for student ${this.current_user._id}`); console.log(err); })
            .then(response => {
              if (response.data == null || response.data == []) {
                lecture_data.percentage = 0
              } else {
                let live = []
                let playback = null
                response.data.forEach(sub => {
                  if(sub.submitter == this.current_user._id) {
                    if(sub.is_live_submission) {
                      live.push(sub)
                    } else {
                      playback = sub
                    }
                  }
                })
                if(live.length > 0 && playback != null) {
                  lecture_data.percentage = Math.max(
                    live.length / lecture_data.checkins.length * 100,
                    Math.ceil(playback.video_percent * 100)
                  )
                } else if(live.length > 0) {
                  lecture_data.percentage = live.length / lecture_data.checkins.length * 100
                } else if(playback != null) {
                  lecture_data.percentage = Math.ceil(playback.video_percent * 100)
                }
              }
            })
          )
          Promise.all(promise_tracker)
          .then(res => {
            this.scores_loaded = true
            this.$forceUpdate()
          })
        })
      },
      getDayOfWeek (event_info) {
        let date_ = new Date(event_info.start_time == undefined ? event_info.playback_submission_start_time : event_info.start_time)
        return this.STATIC_DAY_OF_WEEK[ date_.getDay() ]
      },
      getDayOfMonth (event_info) {
        let date_ = new Date(event_info.start_time == undefined ? event_info.playback_submission_start_time : event_info.start_time)
        return date_.getDate ()
      }
    }
  }

</script>

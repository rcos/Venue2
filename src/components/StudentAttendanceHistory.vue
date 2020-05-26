<template>
  <div class="student-attendance">

    <!-- <div v-if="!history_loaded || !submissions_loaded">DATA LOADING  history: {{this.history_loaded}} submissions: {{this.submissions_loaded}}</div> -->
    <div v-if="data_loaded && data_to_show">
      <div>
        <div class="history-by-month" v-for="month_index in Object.keys(history_data)">

          <div v-if="mobileMode">
            <div class="month-area mobile">{{ STATIC_MONTHS[month_index] }}</div>
            <div class="mobile-event-pill-area">


              <router-link v-for="event in history_data[month_index]" :key="event._id" :to="{name: 'lecture_info', params: { lecture_id: event._id }}">
                <div :class="'mobile-pill ' + getClassByAttendance(event.percentage == undefined ? 0 : event.percentage)">
                  <div class="day-of-week">{{ getDayOfWeek(event) }}</div>
                  <div class="day-of-month">{{ getDayOfMonth(event) }}</div>
                </div>
              </router-link>

            </div>

          </div>
          <div v-else>

            <div class="month-area">{{ STATIC_MONTHS[month_index] }}</div>
            <div class="attendance-history-container">

              <router-link v-for="event in history_data[month_index]" :key="event._id" :to="{name: 'lecture_info', params: { lecture_id: event._id }}">
                <!-- <div
                  :class="'student-attendance-pill inline-block ' + (wasPresent(event_._id) ? 'present' : 'absent')">

                  <div class="inline-block-center date-area">
                    <div class="day-of-week">{{ getDayOfWeek(event_) }}</div>
                    <div class="day-of-month">{{ getDayOfMonth(event_) }}</div>
                  </div>


                  <div class="inline-block-center event-info-area">
                    <div class="event-name">{{ event_.title }}</div>
                    <div class="event-location">WebEx Meeting</div>
                  </div>
                </div> -->

                <div :class="'inline-block instructor-attendance-history-pill ' + getClassByAttendance(event.percentage == undefined ? 0 : event.percentage)">
                  <div class="inline-block date-area">
                    <div class="day-of-week">{{ getDayOfWeek(event) }}</div>
                    <div class="day-of-month">{{ getDayOfMonth(event) }}</div>
                  </div>
                  <div class="inline-block name-area">
                    <div class="event-name">{{ shortenString(event.title, 18) }}</div>
                    <div class="event-location">Event Location</div>
                  </div>
                  <!-- <div class="inline-block percentage-area">{{ getAttendancePercentage(event, selected_section) }}%</div> -->
                  <div class="inline-block percentage-area">{{ event.percentage == undefined ? 0 : event.percentage }}%</div>
                </div>
              </router-link>

            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else-if="data_loaded && !data_to_show" :style='{height: "200px", lineHeight: "200px", textAlign: "center"}'>
      No event data.
    </div>
    <div v-else>
      <SquareLoader />
    </div>
  </div>
</template>

<script>

  import EventAPI from '@/services/EventAPI.js'
  import SubmissionAPI from '@/services/SubmissionAPI.js'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureAPI from '@/services/LectureAPI.js'
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js'

  export default {
    name: 'StudentAttendanceHistory',
    components: { SquareLoader },
    props: {
      section_id: {
        type: String,
        required: true,
      },
      showData: Function,
      mobileMode: Boolean
    },
    data () {
      return {
        current_user: Object,
        data_loaded: Boolean,
        data_to_show: Boolean,
        history_data: Object,
        submission_data: Object,
        STATIC_MONTHS: [],
        STATIC_DAY_OF_WEEK: [],
        submissions_loaded: Boolean,
        history_loaded: Boolean
      }
    },
    created () {
      this.data_loaded = false
      this.data_to_show = false
      this.submissions_loaded = false
      this.history_loaded = false

      this.STATIC_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      this.STATIC_DAY_OF_WEEK = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

      this.getCurrentUser ()
      // this.populateWithPlaceholderData ()
      this.getLectureHistoryData ()
      // this.getHistoryData ()
      // this.getUserCourseSubmissions ()
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
      getLectureHistoryData () {
        // find the lectures for this section
        LectureAPI.getLecturesForSection(this.section_id, "all")
        .catch(err => { console.log(`Error retrieving lectures for section.`); console.log(err); })
        .then(response => {

          this.history_data = response.data
          this.sortHistoryByMonth ()
          this.data_loaded = true
          this.data_to_show = Object.keys(this.history_data).length > 0
          this.showData(this.data_to_show)

          this.calculateGradeForHistoryData ()
        })
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

        Object.keys(this.history_data).forEach(month_index => {

          this.history_data[month_index].forEach(lecture_data => {

            LectureSubmissionAPI.getLectureSubmissionForStudent(lecture_data._id, this.current_user._id)
            .catch(err => { console.log(`error retrieving lecture submissions for student ${this.current_user._id}`); console.log(err); })
            .then(response => {

              // response data is null if there is no submission for this lecture
              if (response.data == null) {
                lecture_data.percentage = 0
              }
              else {
                // TODO check if the submission is for live lecture or for playback lecture
                lecture_data.percentage = 100
              }

              this.$forceUpdate ()
            })
          })

        })
      },
      populateWithPlaceholderData () {
        // populate history_data with temporary data
        // Each key in history_data will be a month index pointing at the lecture data for that month.

        this.history_data = [{
          start_time: '2020-04-20T17:02:38.427+00:00',
          _id: 1,
          title: 'Sample Lecture 3',
        },{
          start_time: '2020-04-12T17:02:38.427+00:00',
          _id: 2,
          title: 'Sample Lecture 4',
        },{
          start_time: '2020-04-13T17:02:38.427+00:00',
          _id: 3,
          title: 'Sample Lecture 5',
        },{
          start_time: '2020-04-14T17:02:38.427+00:00',
          _id: 4,
          title: 'Sample Lecture 2',
        },{
          start_time: '2020-03-10T17:02:38.427+00:00',
          _id: 5,
          title: 'Sample Lecture 1',
        },{
          start_time: '2020-03-01T17:02:38.427+00:00',
          _id: 6,
          title: 'Sample Lecture 0',
        }]

        // sort the data by months
        this.sortHistoryByMonth ()
        this.data_loaded = true
        this.data_to_show = Object.keys(this.history_data).length > 0
        this.showData(this.data_to_show)
      },
      wasPresent(event_id) {
        // return true if the student was present for the event given event id
        return this.submission_data.hasOwnProperty(event_id)
      },
      getUserCourseSubmissions () {
        SubmissionAPI.getUserSubmissionsForSection(this.current_user._id, this.section_id)
        .then(response => {
          this.submissions_loaded = true
          let submissions = response.data
          this.submission_data = {}

          submissions.map(submission => {
            // add the submission to the submission_data by the event id
            if (!this.submission_data.hasOwnProperty(submission.event)) {
              this.submission_data[submission.event] = submission
            }
          })

          this.data_loaded = true
          this.data_to_show = Object.keys(this.history_data).length > 0
          this.showData(this.data_to_show)
        })
        .catch(err => {
          console.log(`Error occurred getting section submissions`)
          console.log(err)
        })
      },
      getHistoryData () {
        EventAPI.getEventHistoryForSection(this.section_id)
        .then(response => {
          this.history_data = response.data

          this.sortHistoryByMonth ()
        })
        .catch(err => {
          console.log(`Error retrieving history for section`)
        })
      },
      sortHistoryByMonth () {
        let history_by_month = {}
        this.history_data.forEach(_data_ => {

          let _date = new Date(_data_.start_time == undefined ? _data_.playback_submission_start_time : _data_.start_time )
          let month_ = _date.getMonth ()

          if (history_by_month.hasOwnProperty( month_ )) {
            history_by_month[month_].push( _data_ )
          }
          else {
            history_by_month[month_] = [ _data_ ]
          }
        })

        Object.keys(history_by_month).forEach(month_index => {
          history_by_month[month_index].sort (function (a, b) {
            return new Date (a.start_time) > new Date (b.start_time)
          })
        })

        this.history_data = history_by_month
        this.history_loaded = true
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

<template>
  <div>

    <!-- <div v-if="!history_loaded || !submissions_loaded">DATA LOADING  history: {{this.history_loaded}} submissions: {{this.submissions_loaded}}</div> -->
    <div v-if="data_loaded && data_to_show">
      <div>
        <div class="history-by-month" v-for="month_index in Object.keys(history_data)">
          <div class="month-title">{{ STATIC_MONTHS[month_index] }}</div>
          <div class="attendance-history-container">

            <router-link v-for="event_ in history_data[month_index]" :key="event_._id" :to="{name: 'event_info', params: { event_id: event_._id }}">
              <div
                :class="'student-attendance-pill inline-block ' + (wasPresent(event_._id) ? 'present' : 'absent')">
                <!-- Day of Weee + Day of Month -->
                <div class="inline-block-center date-area">
                  <div class="day-of-week">{{ getDayOfWeek(event_) }}</div>
                  <div class="day-of-month">{{ getDayOfMonth(event_) }}</div>
                </div>

                <!-- Event Name + Location -->
                <div class="inline-block-center event-info-area">
                  <div class="event-name">{{ event_.title }}</div>
                  <div class="event-location">WebEx Meeting</div>
                </div>
              </div>
            </router-link>

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

  export default {
    name: 'StudentAttendanceHistory',
    components: { SquareLoader },
    props: {
      section_id: {
        type: String,
        required: true,
      },
      showData: Function
    },
    data () {
      return {
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
      this.getHistoryData ()
      this.getUserCourseSubmissions ()
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
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

          let month_ = new Date(_data_.start_time).getMonth ()
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
        let date_ = new Date(event_info.start_time)
        return this.STATIC_DAY_OF_WEEK[ date_.getDay() ]
      },
      getDayOfMonth (event_info) {
        let date_ = new Date(event_info.start_time)
        return date_.getDate ()
      }
    }
  }

</script>

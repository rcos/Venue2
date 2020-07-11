<template>
  <div class="student-attendance">
    <div v-for="year in Object.keys(timeline)" :key="year">
      <div v-for="month in Object.keys(timeline[year])" :key="month">
        <div v-if="mobileMode">
          <div class="month-area mobile">{{ STATIC_MONTHS[month] }} {{year}}</div>
          <div class="mobile-event-pill-area">
            <router-link v-for="i in timeline[year][month]" :key="lectures[i]._id" :to="{name: 'lecture_info', params: { lecture_id: lectures[i]._id }}" :aria-label="'Lecture Info - '+lectures[i].title">
              <div :class="'mobile-pill ' + getHTMLClassByAttendance(lectures[i].percentage == undefined ? 0 : lectures[i].percentage)">
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
              <div :class="'inline-block instructor-attendance-history-pill ' + getHTMLClassByAttendance(lectures[i].percentage == undefined ? 0 : lectures[i].percentage)" tabindex="0" :title="lectures[i].title" :aria-label="'Lecture Info - '+lectures[i].title">
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

  export default {
    name: 'StudentAttendanceHistory',
    components: { SquareLoader },
    props: {
      mobileMode: Boolean,
      lectures: Array,
      timeline: Object,
      scores_loaded: Boolean
    },
    data () {
      return {
        current_user: Object,
        STATIC_MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        STATIC_DAY_OF_WEEK: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      }
    },
    created () {
    },
    methods: {
      shortenString (string, max_length) {
        if (string.length < max_length) {
          return string
        }
        return string.substring(0, max_length - 3) + "..."
      },
      getHTMLClassByAttendance (percent) {
        // percent b/w 0 and 100
        if (percent <= 60) return 'bad'
        else if (percent <= 75) return 'medium'
        return 'good'
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

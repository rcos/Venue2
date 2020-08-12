<template>
  <div class="instructor-attendance">
    <div v-for="year in getStringsAscending(Object.keys(timeline))" :key="year">
      <div v-for="month in getStringsAscending(Object.keys(timeline[year]))" :key="month">
       
        
          <div class="month-area">{{ STATIC_MONTHS[month] }} {{year}}</div>
          <div class="event-pills-area">
            <router-link v-for="i in timeline[year][month]" :key="lectures[i]._id" :to="{name: 'lecture_info', params: { lecture_id: lectures[i]._id }}" tabindex="-1">
              <div :class="'inline-block instructor-attendance-history-pill ' + lectures[i].color" :title="lectures[i].title" tabindex="0" :aria-label="'Lecture Info - '+lectures[i].title">
                <div class="inline-block date-area my-auto">
                  <div class="day-of-week">{{ getDayOfWeek(lectures[i]) }}</div>
                  <div class="day-of-month">{{ getDayOfMonth(lectures[i]) }}</div>
                </div>
                <div class="inline-block name-area">
                  <div class="event-name">{{ shortenString(lectures[i].title, 18) }}</div>
                  <div class="event-location">Event Location</div>
                </div>
                <div class="inline-block percentage-area">
                  <div v-if="scores_loaded">{{lectures[i].percentage == undefined ? 0 : lectures[i].percentage.toFixedDecimals(0)}}%</div>
                  <SquareLoader v-else/>
                </div>
              </div>
            </router-link>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

  import SquareLoader from '@/components/Loaders/SquareLoader.vue'

  export default {
    name: 'InstructorAttendanceHistory',
    components: {SquareLoader},
    props: {
      mobileMode: Boolean,
      lectures: Array,
      timeline: Object,
      students: Array,
      scores_loaded: Boolean
    },
    data () {
      return {
        STATIC_MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        STATIC_DAY_OF_WEEK: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      }
    },
    methods: {
      shortenString (string, max_length) {
        if (string.length < max_length) {
          return string
        }
        return string.substring(0, max_length - 3) + "..."
      },
      getDayOfWeek (event) {
        let _date = new Date(event.start_time == undefined ? event.playback_submission_start_time : event.start_time)
        return this.STATIC_DAY_OF_WEEK[ _date.getDay() ]
      },
      getDayOfMonth (event) {
        let _date = new Date(event.start_time == undefined ? event.playback_submission_start_time : event.start_time)
        return _date.getDate ()
      },
      getStringsAscending(arr) {
        return arr.concat().sort((a,b) => parseInt(a) > parseInt(b) ? 1 : -1)
      }
    }
  }

</script>

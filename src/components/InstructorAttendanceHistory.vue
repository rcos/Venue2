<template>
  <div class="instructor-attendance">
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
                  <div v-if="scores_loaded">{{lectures[i].percentage == undefined ? 0 : lectures[i].percentage.toFixedDown(0)}}%</div>
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

  Number.prototype.toFixedDown = function(digits) {
      var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
          m = this.toString().match(re);
      return m ? parseFloat(m[1]) : this.valueOf();
  };

  export default {
    name: 'InstructorAttendanceHistory',
    components: {SquareLoader},
    props: {
      mobileMode: Boolean,
      lectures: Array,
      timeline: Object,
      students: Array
    },
    data () {
      return {
        STATIC_MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        STATIC_DAY_OF_WEEK: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        scores_loaded: false
      }
    },
    mounted () {  
      this.calculateAttendancePercentages()
    },
    methods: {
      shortenString (string, max_length) {
        if (string.length < max_length) {
          return string
        }
        return string.substring(0, max_length - 3) + "..."
      },
      getClassByAttendance (percent) {
        // percent b/w 0 and 100
        if (percent <= 60) return 'bad'
        else if (percent <= 75) return 'medium'
        return 'good'
      },
      getAttendancePercentage (event, section_id) {
        return Math.floor((event.submission_count / this.sections_info[section_id].students.length) * 100)
      },
      getDayOfWeek (event) {
        let _date = new Date(event.start_time == undefined ? event.playback_submission_start_time : event.start_time)
        return this.STATIC_DAY_OF_WEEK[ _date.getDay() ]
      },
      getDayOfMonth (event) {
        let _date = new Date(event.start_time == undefined ? event.playback_submission_start_time : event.start_time)
        return _date.getDate ()
      },
      async calculateAttendancePercentages () {
        /*
        * Calculating attendance percentage for instructor:
        *
        * For each attendance event, per section, find the number of students in this section
        * and find the lecture submissions for a lecture. The percentage for that course is the
        * number of submissions divided by the student body count then multiplied by 100.
        */
        let promise_tracker = []

        this.lectures.forEach(lecture_ => {
          // get the submission count for this lecture and then divide by the student count
          
          promise_tracker.push(
            LectureSubmissionAPI.getLectureSubmissionsForLecture(lecture_._id)
            .catch(err => { console.log('error retrieving lecture submissions for lecture ' + lecture_._id); console.log(err); })
            .then(response => {
              let submissions = response.data == undefined ? [] : response.data
              let students = this.students
              let running_total = 0
              students.forEach(stud => {
                let live = []
                let playback = null
                submissions.forEach(sub => {
                  if(sub.submitter._id == stud._id) {
                    if(sub.is_live_submission) {
                      live.push(sub)
                    } else {
                      playback = sub
                    }
                  }
                })
                if(live.length > 0 && playback != null) {
                  running_total += Math.max(
                    live.length / lecture_.checkins.length,
                    Math.ceil(playback.video_percent * 100) / 100
                  )
                } else if(live.length > 0) {
                  running_total += live.length / lecture_.checkins.length
                } else if(playback != null) {
                  running_total += Math.ceil(playback.video_percent * 100) / 100
                }
              })
              
              lecture_.percentage = running_total / students.length * 100
            })
          )
        })

        Promise.all(promise_tracker)
        .then(res => {
          this.scores_loaded = true
          this.$forceUpdate()
        })
      },
      lecturesByDate(lectures) {
        return lectures.concat().sort((a, b) => (a.start_time < b.start_time) ? 1 : -1);
      },
    }
  }

</script>
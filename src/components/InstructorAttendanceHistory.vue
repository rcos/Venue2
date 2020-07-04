<template>
  <div class="instructor-attendance">

    <div v-if="data_loaded && data_to_show">
      <!-- Individual section view -->
      <div v-if="selected_section != null">
        <div
          v-for="month_index in Object.keys( sections_info[ selected_section ] )" :key="month_index">
            <div v-if="mobileMode">
              <div class="month-area mobile">{{ STATIC_MONTHS[month_index] }}</div>
              <div class="mobile-event-pill-area">
                <router-link v-for="event in lecturesByDate(sections_info[selected_section][month_index])" :key="event._id" :to="{name: 'lecture_info', params: { lecture_id: event._id }}" :aria-label="'Lecture Info - '+event.title">
                  <div :class="'mobile-pill ' + getClassByAttendance(event.percentage == undefined ? 0 : event.percentage)">
                    <div class="day-of-week">{{ getDayOfWeek(event) }}</div>
                    <div class="day-of-month">{{ getDayOfMonth(event) }}</div>
                  </div>
                </router-link>

              </div>

            </div>
            <div v-else>
              <div class="month-area">{{ STATIC_MONTHS[month_index] }}</div>
              <div class="event-pills-area">
                <router-link v-for="event in lecturesByDate(sections_info[selected_section][month_index])" :key="event._id" :to="{name: 'lecture_info', params: { lecture_id: event._id }}" tabindex="-1">
                  <!-- <div :class="'inline-block instructor-attendance-history-pill ' + getClassByAttendance(getAttendancePercentage(event, selected_section))"> -->
                  <div :class="'inline-block instructor-attendance-history-pill ' + getClassByAttendance(event.percentage == undefined ? 0 : event.percentage)" tabindex="0" :aria-label="'Lecture Info - '+event.title">
                    <div class="inline-block date-area">
                      <div class="day-of-week">{{ getDayOfWeek(event) }}</div>
                      <div class="day-of-month">{{ getDayOfMonth(event) }}</div>
                    </div>
                    <div class="inline-block name-area">
                      <div class="event-name">{{ shortenString(event.title, 18) }}</div>
                      <div class="event-location">Event Location</div>
                    </div>
                    <!-- <div class="inline-block percentage-area">{{ getAttendancePercentage(event, selected_section) }}%</div> -->
                    <div class="inline-block percentage-area">{{event.percentage == undefined ? 0 : event.percentage}}%</div>
                  </div>
                </router-link>


              </div>

              <div></div>
            </div>
        </div>
        <!-- <div v-for="month_index in Object.keys( sections_info[ selected_section ] )" v-else>
          <div class="month-area mobile">[ {{ month_index }} ]</div>

          <router-link v-for="event in sections_info[selected_section][month_index]" :key="event._id" :to="{name: 'event_info', params: { event_id: event._id }}">
            x
          </router-link>
        </div> -->

      </div>

      <!-- All Section view -->
      <div v-else>
        ~
      </div>
    </div>
    <div v-else-if="data_loaded && !data_to_show" :style='{textAlign: "center", height: "200px", lineHeight: "200px", fontStyle: "italics"}'>
      No event history.
    </div>
    <div v-else :style='{textAlign: "center"}'>
      <SquareLoader />
    </div>

  </div>
</template>

<script>

  // (1) Get all the events for each section for this course,
  // (2)

  import SectionAPI from '@/services/SectionAPI.js'
  import LectureAPI from '@/services/LectureAPI.js'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js'

  export default {
    name: 'InstructorAttendanceHistory',
    components: { SquareLoader },
    props: {
      course_id: String,
      informSections: Function,
      showData: Function,
      mobileMode: Boolean,
      selected_section_info: Object,
      selected_section: {
        type: String,
        default: null // -1 == all sections
      }
    },
    data () {
      return {
        data_loaded: Boolean,
        data_to_show: Boolean,
        sections_info: {},
        STATIC_MONTHS: [],
        STATIC_DAY_OF_WEEK: [],
        section_number_to_id: {}
      }
    },
    created () {
      this.data_loaded = false
      this.data_to_show = false
      this.STATIC_DAY_OF_WEEK = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      this.STATIC_MONTHS = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      this.getLectureHistoryForCourse ()
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
      separateSectionsInfoByMonth () {
        // separate and sort this.sections_info by month

        Object.keys(this.sections_info).forEach(section_id => {

          let lectures_ = this.sections_info[section_id]
          let lectures_by_month = {}

          lectures_.forEach(lecture_ => {
            // get the date for this lecture
            let lecture_date = new Date(lecture_.start_time == undefined ? lecture_.playback_submission_start_time : lecture_.start_time)
            if (+ lecture_date != NaN) {

              if (lectures_by_month.hasOwnProperty( lecture_date.getMonth() )) {
                lectures_by_month[ lecture_date.getMonth() ].push( lecture_ )
              }
              else {
                lectures_by_month[ lecture_date.getMonth() ] = [ lecture_ ]
              }

            }
          })

          // now, lectures_by_month should contain all the lectures separated by
          // the month the lecture occurred in.
          this.sections_info[section_id] = lectures_by_month
        })
        this.$forceUpdate ()
      },
      getLectureHistoryForCourse () {

        // retrieve the lecture info for all sections in this course
        // (1) find all the lectures in this course
        SectionAPI.getSectionsForCourse(this.course_id)
        .catch(err => {
          console.log(`SectionAPI.getSectionsForCourse error:`)
          console.log(err)
        })
        .then(response => {

          let sections = response.data

          this.informSections(sections.map(section_ => [section_.number, section_._id] ))

          // for each section, find the lecture information for that section
          let lectures_for_sections = []
          sections.forEach(section_ => {
            lectures_for_sections.push( new Promise((resolve, reject) => {
              LectureAPI.getLecturesForSection(section_._id)
              .then(response => { resolve(response.data) })
              .catch(err => { resolve(null) })
            }) )
          })

          Promise.all(lectures_for_sections)
          .then(fulfilled_lectures_for_sections => {
            // add the section info to the object this.sections_info
            fulfilled_lectures_for_sections.forEach((lecture_info, i) => {

              // get the section that this lecture belongs to
              let section = sections[i]
              if (section != null && section != undefined) {
                this.sections_info[ section._id ] = lecture_info
              }
            })

            this.separateSectionsInfoByMonth ()
            this.calculateAttendancePercentages ()

            this.data_loaded = true
            this.data_to_show = Object.keys(this.sections_info).length > 0
            this.showData(this.data_to_show)

          })

        })

      },
      calculateAttendancePercentages () {
        /*
        * Calculating attendance percentage for instructor:
        *
        * For each attendance event, per section, find the number of students in this section
        * and find the lecture submissions for a lecture. The percentage for that course is the
        * number of submissions divided by the student body count then multiplied by 100.
        */

        if (this.selected_section == null || this.sections_info[this.selected_section] == null) return;
        Object.keys(this.sections_info[this.selected_section]).forEach(month_index => {
          this.sections_info[this.selected_section][month_index].forEach(lecture_ => {

            // get the submission count for this lecture and then divide by the student count
            let promise_tracker = []
            promise_tracker.push(

              LectureSubmissionAPI.getLectureSubmissionsForLecture(lecture_._id)
              .catch(err => { console.log('error retrieving lecture submissions for lecture ' + lecture_._id); console.log(err); })
              .then(response => {
                let submissions = response.data == undefined ? [] : response.data
                let students = this.selected_section_info.students
                let running_total = 0
                students.forEach(stud => {
                  let live = []
                  let playback = null
                  submissions.forEach(sub => {
                    if(sub.submitter._id == stud) {
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

            Promise.all(promise_tracker)
            .then(_ => {
              this.$forceUpdate ()
            })
          })
        })
      },
      lecturesByDate(lectures) {
        return lectures.concat().sort((a, b) => (a.start_time < b.start_time) ? 1 : -1);
      }
    }
  }

</script>

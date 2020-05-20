<template>
  <div class="instructor-attendance">

    <div v-if="data_loaded && data_to_show">
      <!-- Individual section view -->
      <div v-if="selected_section != null">
        <div
          v-for="month_index in Object.keys(getEventByMonth())">
            <div class="month-area">{{ STATIC_MONTHS[month_index] }}</div>

            <div class="event-pills-area">

              <router-link v-for="event in sections_info[selected_section].events_by_month[month_index]" :key="event._id" :to="{name: 'event_info', params: { event_id: event._id }}">
                <div :class="'inline-block instructor-attendance-history-pill ' + getClassByAttendance(getAttendancePercentage(event, selected_section))">
                  <div class="inline-block date-area">
                    <div class="day-of-week">{{ getDayOfWeek(event) }}</div>
                    <div class="day-of-month">{{ getDayOfMonth(event) }}</div>
                  </div>
                  <div class="inline-block name-area">
                    <div class="event-name">{{ event.title }}</div>
                    <div class="event-location">Event Location</div>
                  </div>
                  <div class="inline-block percentage-area">{{ getAttendancePercentage(event, selected_section) }}%</div>
                </div>
              </router-link>


            </div>

            <div></div>
        </div>

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

  import EventAPI from '@/services/EventAPI.js'
  import SectionAPI from '@/services/SectionAPI.js'
  import SubmissionAPI from '@/services/SubmissionAPI.js'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'

  export default {
    name: 'InstructorAttendanceHistory',
    components: {},
    props: {
      course_id: String,
      informSections: Function,
      showData: Function,
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
      this.getEventHistoryForCourse ()
    },
    methods: {
      getEventByMonth () {
        // sections_info[selected_section].events_by_month

        return this.sections_info[this.selected_section].events_by_month
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
        let _date = new Date(event.start_time)
        return this.STATIC_DAY_OF_WEEK[ _date.getDay() ]
      },
      getDayOfMonth (event) {
        let _date = new Date(event.start_time)
        return _date.getDate ()
      },
      getEventsForEachSection () {
        // For each section and for each event in that section, find the number
        // of submissions for that event and store it in the section_info]
        Object.keys(this.sections_info).forEach(section_id => {

          let event_submissions = []
          this.sections_info[section_id].events.map(event_ => {
            // find the submission count for this event

            event_submissions.push(new Promise((resolve, reject) => {

              SubmissionAPI.getSubmissionsForEvent(event_._id)
              .then(event_response => {
                resolve(event_response.data)
              })
              .catch(err => { resolve(null) })

            }))
          })

          Promise.all(event_submissions).then(true_event_submissions => {

            true_event_submissions.map((event_submissions, i) => {
              if (event_submissions == null) this.sections_info[section_id].events[i].submission_count = 0
              else this.sections_info[section_id].events[i].submission_count = event_submissions.length
            })

          })
          .finally(_ => {
            // Now, categorize the events by month and store them into this.sections_info[section_id].events_by_month
            let events_by_month = {}
            this.sections_info[section_id].events.forEach(event_ => {
              let event_date = new Date(event_.start_time)
              if (events_by_month.hasOwnProperty( event_date.getMonth() )) {
                // add it to the array
                events_by_month[event_date.getMonth()].push( event_ )
              }
              else {
                events_by_month[event_date.getMonth()] = [ event_ ]
              }
            })

            // sort the dates
            Object.keys(events_by_month).forEach(month_index => {
              events_by_month[month_index].sort((a, b) => {
                return new Date(a.start_time) > new Date(b.start_time)
              })
            })

            // now, attach it to the section_info[section_id]
            this.sections_info[section_id].events_by_month = events_by_month
            this.$forceUpdate ()

          })

          // let events_by_month = {}
          // this.sections_info[section_id]

        })
      },
      returnEventsForSection (section_id, event_arr) {
        return event_arr.filter(event_ => event_.section == section_id)
      },
      getEventHistoryForCourse () {
        EventAPI.getEventHistoryForCourse(this.course_id)
        .then(response => {

          let sections = new Set()
          response.data.forEach(event_ => {
            sections.add(event_.section)
            //
          })

          let section_promise_arr = []

          sections.forEach(section_ => {
            // call getSection () on each section in the course
            section_promise_arr.push(new Promise( (resolve, reject) => {
              SectionAPI.getSection(section_)
              .then(section_response => {
                this.sections_info[section_] = section_response.data
                this.section_number_to_id[ this.sections_info[section_].number ] = this.sections_info[section_]._id

                this.sections_info[section_].events = this.returnEventsForSection(section_, response.data)
                resolve(true)
              })
              .catch(err => { console.log(err); resolve(false) })
              .finally(_ => {
                this.getEventsForEachSection ()
              })
            }))
          })

          // Handle the getSection () for all sections
          Promise.all(section_promise_arr)
          .then(results => {

            let section_number_arr = Object.keys(this.sections_info).map(section_id => {
              return [this.sections_info[section_id].number, section_id]
            })

            this.informSections(section_number_arr)
          })
          .finally(_ => {
            this.data_loaded = true
            this.data_to_show = Object.keys(this.sections_info).length > 0
            this.showData(this.data_to_show)
            console.log(this.data_to_show)
          })

        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }

</script>

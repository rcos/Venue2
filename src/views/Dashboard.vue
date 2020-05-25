<template>
  <div>
    <show-at breakpoint="large">
      <div class="venue-body-container">
        <!-- <LiveCourses :colorCallback="getColor" :loaded="live_lectures_loaded" :data="live_lectures" /> -->
        <LiveLectureList :loaded="live_lectures_loaded" :live_lectures="live_lectures" />
        <PlaybackCourses :loaded="playback_lectures_loaded" :playback_lectures="playback_lectures" />
        <RecentCourses :loaded="recent_lectures_loaded" :recent_lectures="recent_lectures" />
        <UpcomingCourses :loaded="upcoming_lectures_loaded" :upcoming_lectures="upcoming_lectures" />
      </div>
    </show-at>
    <hide-at breakpoint="large">
      <div class="venue-body-container is-mobile">
        <LiveLectureList :loaded="live_lectures_loaded" :live_lectures="live_lectures" mobileMode/>
        <PlaybackCourses :loaded="playback_lectures_loaded" :playback_lectures="playback_lectures" mobileMode />
        <RecentCourses :loaded="recent_lectures_loaded" :recent_lectures="recent_lectures" mobileMode />
        <UpcomingCourses :loaded="upcoming_lectures_loaded" :upcoming_lectures="upcoming_lectures" mobileMode />
      </div>
    </hide-at>

    <hide-at breakpoint="mediumAndBelow">
      <div class="venue-body-container">
        <div class="courses-section-title">
          <div><h4  class="section-title">Courses</h4></div>
          <div v-if="courses_loaded != 0" class="load-course-size">{{courses_loaded}} {{courses_loaded == 1 ? 'course' : 'courses'}} loaded</div>
        </div>
        <CourseList :colors="STATIC_COURSE_COLORS" :coursesCallback='setCourses' :sizeCallback="setCourseSize" />
      </div>
    </hide-at>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import DashboardSection from '@/components/DashboardSection'
  import { authComputed } from '../vuex/helpers.js'
  import {showAt, hideAt} from 'vue-breakpoints'

  import LiveLectureList from '@/components/LiveLectureList.vue'
  import PlaybackCourses from '@/components/PlaybackCourses.vue'
  import RecentCourses from '@/components/RecentCourses.vue'
  import UpcomingCourses from '@/components/UpcomingCourses'
  import CourseList from '@/components/CourseList.vue'
  import moment from 'moment'

  import '@/assets/css/venue-core.css'
  import '@/assets/css/venue.css'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      DashboardSection,
      hideAt,
      showAt,
      LiveLectureList,
      PlaybackCourses,
      RecentCourses,
      UpcomingCourses,
      CourseList
    },
    data(){
      return {
        current_user: {},
        all_lectures: [],
        live_lectures: [],
        playback_lectures: [],
        recent_lectures: [],
        upcoming_lectures: [],
        courses_loaded: Number,
        courses: Object,
        STATIC_COURSE_COLORS: Array,
        live_lectures_loaded: Boolean,
        upcoming_lectures_loaded: Boolean,
        recent_lectures_loaded: Boolean,
        playback_lectures_loaded: Boolean
      }
    },
    created() {
      this.STATIC_COURSE_COLORS = ['Aquamarine', 'Tomato', 'LightSalmon', 'Cyan', 'MediumTurquoise', 'PaleGreen', 'pink', 'violet', ]
      this.courses_loaded = 0

      this.live_lectures_loaded = false
      this.upcoming_lectures_loaded = false
      this.recent_lectures_loaded = false
      this.playback_lectures_loaded = false

      this.getCurrentUser()
      this.getAllLecturesForUser()
      this.getLiveLecturesForUser()
      this.getPlaybackLectures()
      this.getRecentLecturesForUser()
      this.getUpcomingLecturesForUser()
    },
    methods: {
      getColor (course_info) {
        console.log(`Getting color for ...`)
        if (course_info == null || course_info._id == null) return 'grey'
        if (this.courses[ course_info._id ] == null || this.courses[ course_info._id ] == undefined) {
          // add the course and
          let next_color_index = 0;
          Object.keys(this.courses).forEach(course_ => {
            if (this.courses[course_].hasOwnProperty('color_index')) next_color_index = Math.max(next_color_index, this.courses[course_].color_index)
          })

          this.courses[course_info._id] = {
            color_index: next_color_index
          }
          return this.STATIC_COURSE_COLORS[next_color_index]

        }
        if (!this.courses[ course_info._id ].hasOwnProperty('color_index')) return 'grey'
        let color_index = this.courses[ course_info._id ].color_index
        if (color_index != null && color_index != undefined && color_index >= 0 && color_index < this.STATIC_COURSE_COLORS.length) {
          return this.STATIC_COURSE_COLORS[color_index]
        }
        return 'grey'
      },
      setCourses (courses_data) {
        console.log(`setCourses`)
        console.log(courses_data)

        let course_dict = {}
        courses_data.forEach((course_, i) => {
          if (course_ != null && course_.hasOwnProperty('_id')) {
            course_dict[course_._id] = course_
            course_dict[course_._id]["color_index"] = i
          }
        })
        this.courses = course_dict

      },
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
      },
      logOut() {
        this.$store.dispatch('logout')
      },
      setCourseSize (_size_) {
        console.log(`Course Size: ${_size_}`)
        this.courses_loaded = _size_
      },
      async fillSectionInfo (data_object) {
        // given an object with a sections field, find the course and store it in the data_object
        // with the key course_info
        return new Promise((resolve, reject) => {

          // resolve, with the data_object if success
          // reject otherwise
          if (data_object == null || data_object == undefined) { reject("no data object provided.") }
          if (!data_object.hasOwnProperty( 'sections' )) { reject ("Object has no sections field.") }

          SectionAPI.getCourse(data_object.sections[0])
          .then(response => {
            data_object["course_info"] = response.data
            this.$forceUpdate ()
            resolve(data_object)
          })
          .catch(err => {
            console.log(`Problem  fetching course data`)
            reject(err)
          })

        })
      },
      async getAllLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "all", "with_sections_and_course")
        this.all_lectures = response.data
      },
      async getLiveLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "live", "with_sections_and_course")
        this.live_lectures = response.data
        this.live_lectures_loaded = true
      },
      async getPlaybackLectures() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "active_playback", "with_sections_and_course")
        this.playback_lectures = response.data
        this.playback_lectures_loaded = true
      },
      async getRecentLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "past", "with_sections_and_course")
        this.recent_lectures = response.data
        console.log("Recent Lectures: ")
        console.log(this.recent_lectures)
        // this.recent_lectures = this.recent_lectures.slice(0,3)
        this.recent_lectures_loaded = true
        console.log("Recent Lectures loaded")
        console.log(this.recent_lectures_loaded)
      },
      async getUpcomingLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "upcoming", "with_sections_and_course")
        this.upcoming_lectures = response.data
        this.upcoming_lectures_loaded = true
      }
    }
  }
</script>

<style scoped>
  .dashboard-section {
    /*border: red solid;*/
    text-align: left;
    margin-top: 4rem;
    display: inline-block;
    vertical-align: top;
    height: 15rem;
    overflow-y: scroll;
  }

  #section-1 {
    float: left;
    margin-left: 8rem;
    width: 30rem;
  }

  #section-2 {
    width: 30rem;
    margin-left: -5rem;
  }

  .section-title {
    font-weight: bold;
  }

  .lecture-box {
    border: blue solid;
    width: 10rem;
    height: 3rem;
    border-radius: 5px;
    margin-left: 3rem;
    margin-top: 2rem;
    cursor: pointer;
  }

  .lecture-box p {
    text-align: center;
    margin-top: 0.5rem;
  }

</style>

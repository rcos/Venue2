<template>
  <div id="dashboard-container">

    <DashboardSection lecture_type="Live" />
    <DashboardSection lecture_type="Playback" />
    <DashboardSection lecture_type="Recent" />
    <DashboardSection lecture_type="Upcoming" />


<!--     <show-at breakpoint="large">
      <div class="venue-body-container">
        <LiveLectureList v-if="section_1 === 'live'" :loaded="live_lectures_loaded" :live_lectures="live_lectures" />
        <PlaybackLectures v-if="section_1 === 'playback'" :loaded="playback_lectures_loaded" :playback_lectures="playback_lectures" />
        <RecentLectures v-if="section_1 === 'recent'" :loaded="recent_lectures_loaded" :recent_lectures="recent_lectures" />
        <UpcomingLectures v-if="section_1 === 'upcoming'" :loaded="upcoming_lectures_loaded" :upcoming_lectures="upcoming_lectures" />
        <LiveLectureList v-if="section_2 === 'live'" :loaded="live_lectures_loaded" :live_lectures="live_lectures" />
        <PlaybackLectures v-if="section_2 === 'playback'" :loaded="playback_lectures_loaded" :playback_lectures="playback_lectures" />
        <RecentLectures v-if="section_2 === 'recent'" :loaded="recent_lectures_loaded" :recent_lectures="recent_lectures" />
        <UpcomingLectures v-if="section_2 === 'upcoming'" :loaded="upcoming_lectures_loaded" :upcoming_lectures="upcoming_lectures" />
      </div>
    </show-at>
    <hide-at breakpoint="large">
      <div class="venue-body-container is-mobile">
        <LiveLectureList v-if="section_1 === 'live'" :loaded="live_lectures_loaded" :live_lectures="live_lectures" mobileMode />
        <PlaybackLectures v-if="section_1 === 'playback'" :loaded="playback_lectures_loaded" :playback_lectures="playback_lectures" mobileMode/>
        <RecentLectures v-if="section_1 === 'recent'" :loaded="recent_lectures_loaded" :recent_lectures="recent_lectures" mobileMode />
        <UpcomingLectures v-if="section_1 === 'upcoming'" :loaded="upcoming_lectures_loaded" :upcoming_lectures="upcoming_lectures" mobileMode />
        <LiveLectureList v-if="section_2 === 'live'" :loaded="live_lectures_loaded" :live_lectures="live_lectures" mobileMode />
        <PlaybackLectures v-if="section_2 === 'playback'" :loaded="playback_lectures_loaded" :playback_lectures="playback_lectures" mobileMode />
        <RecentLectures v-if="section_2 === 'recent'" :loaded="recent_lectures_loaded" :recent_lectures="recent_lectures" mobileMode />
        <UpcomingLectures v-if="section_2 === 'upcoming'" :loaded="upcoming_lectures_loaded" :upcoming_lectures="upcoming_lectures" mobileMode />
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
    </hide-at> -->
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import { authComputed } from '../vuex/helpers.js'
  import {showAt, hideAt} from 'vue-breakpoints'

  import LiveLectureList from '@/components/LiveLectureList.vue'
  import PlaybackLectures from '@/components/PlaybackLectures.vue'
  import RecentLectures from '@/components/RecentLectures.vue'
  import UpcomingLectures from '@/components/UpcomingLectures.vue'
  import CourseList from '@/components/CourseList.vue'
  import moment from 'moment'
  import DashboardSection from '@/components/DashboardSection.vue'

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
      PlaybackLectures,
      RecentLectures,
      UpcomingLectures,
      CourseList
    },
    data(){
      return {
        current_user: {},
        all_lectures: [],
        live_lectures: [],
        live_lectures_exist: Boolean,
        playback_lectures: [],
        playback_lectures_exist: Boolean,
        recent_lectures: [],
        recent_lectures_exist: Boolean,
        upcoming_lectures: [],
        upcoming_lectures_exist: Boolean,
        courses_loaded: Number,
        courses: Object,
        STATIC_COURSE_COLORS: Array,
        live_lectures_loaded: false,
        upcoming_lectures_loaded: Boolean,
        recent_lectures_loaded: Boolean,
        playback_lectures_loaded: Boolean,
        section_1: String,
        section_2: String
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
    },
    methods: {
      getColor (course_info) {
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
        this.courses_loaded = _size_
      },
      async getAllLecturesForUser() {
        await this.getLiveLecturesForUser()
        await this.getPlaybackLectures()
        await this.getRecentLecturesForUser()
        await this.getUpcomingLecturesForUser()
        this.chooseLecturesToDisplay()
      },
      async getLiveLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "live", "with_sections_and_course")
        this.live_lectures = response.data
        this.live_lectures_loaded = true
        this.live_lectures_exist = this.live_lectures.length > 0
      },
      async getPlaybackLectures() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "active_playback", "with_sections_and_course")
        this.playback_lectures = response.data
        this.playback_lectures_loaded = true
        this.playback_lectures_exist = this.playback_lectures.length > 0
      },
      async getRecentLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "recent", "with_sections_and_course")
        this.recent_lectures = response.data
        this.recent_lectures_loaded = true
        this.recent_lectures_exist = this.recent_lectures.length > 0
      },
      async getUpcomingLecturesForUser() {
        const response = await LectureAPI.getLecturesForUser(this.current_user._id, "upcoming", "with_sections_and_course")
        this.upcoming_lectures = response.data
        this.upcoming_lectures_loaded = true
        this.upcoming_lectures_exist = this.upcoming_lectures.length > 0
      },
      chooseLecturesToDisplay() {
        let lecture_existence_pairs = [["live", this.live_lectures_exist], ["playback", this.playback_lectures_exist],
          ["recent", this.recent_lectures_exist], ["upcoming", this.upcoming_lectures_exist]]
        let found_first_type = false
        for(let i = 0; i < lecture_existence_pairs.length; i++) {
          let pair = lecture_existence_pairs[i]
          let lecture_type = pair[0]
          let lecture_existence_status = pair[1]
          if(lecture_existence_status) {
            if(!found_first_type) {
              this.section_1 = lecture_type
              found_first_type = true
            } else if(found_first_type) {
              this.section_2 = lecture_type
              break
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  #dashboard-container {
    /*border: black solid;*/
    width: 85%;
    margin: auto;
    /*margin-top: 2rem;*/
  }

/*  .dashboard-section {
    text-align: left;
    margin-top: 4rem;
    display: inline-block;
    vertical-align: top;
    height: 15rem;
    overflow-y: scroll;
  }*/

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

<template>
  <div>
    <show-at breakpoint="mediumAndAbove">
      <div class="venue-body-container">

        <!-- Title -->
        <div class="title">
          <div class="inline-block">Course Info</div>
          <router-link v-if="this.current_user.is_instructor" :to="{name: 'new_lecture', params: { course_id: course._id }}" tabindex="-1">
            <div class="inline-block big-button" :style="{float: 'right'}" tabindex="0">Create New Lecture for {{ course.dept }} {{ course.course_number }}</div>
          </router-link>
        </div>
        <div>
          <CourseInfoTitle :course="typeof course == typeof {} ? course : {}" class="inline-block" :section_number="this.current_user.is_instructor ? -1 : section.number" />

          <!-- Lecture Pills -->
          <div class="lecture-pills-min-container inline-block">
            <LecturePillList label="Live" :lectures="live_lectures" />
            <LecturePillList label="Playback" :lectures="playback_lectures" />
          </div>

        </div>

        <!-- Attendance History Tab Button / Statistics Tab Button Bar -->
        <div class="course-info-sub-tab">
          <div class="left">
            <div
              v-on:click="subview_section_id = 0" v-on:keyup.enter="subview_section_id = 0"
              :class="'tab ' + (subview_section_id == 0 ? 'active' : '')"
              tabindex="0" role="button" aria-label="Show Attendance History">Attendance History</div>
            <div
              v-on:click="subview_section_id = 2" v-on:keyup.enter="subview_section_id = 2"
              :class="'tab ' + (subview_section_id == 2 ? 'active' : '')"
              tabindex="0" role="button" aria-label="Show Upcoming Lectures">Upcoming</div>
            <div
              v-if="data_to_show" v-on:click="subview_section_id = 1" v-on:keyup.enter="subview_section_id = 1"
              :class="'tab ' + (subview_section_id == 1 ? 'active' : '')"
              tabindex="0" role="button" aria-label="Show Course Statistics">Statistics</div>
          </div>
          <div v-if="this.current_user.is_instructor" class="right">
            <label id="section_select_label">Select Section</label>
            <select v-model="selected_section" aria-labelledby="section_select_label">
              <option v-for="(section_,i) in section_arr" :key="i" :value="section_[1]">Section {{ section_[0] }}</option>
              <option :value="null" selected>All Sections</option>
            </select>
          </div>
        </div>

        <!-- Attendance History -->
        <div v-if="subview_section_id == 0">

          <InstructorAttendanceHistory
            :informSections="this.informSections"
            :course_id="course_id"
            :selected_section="selected_section"
            :showData="showData"
            :selected_section_info="all_sections[ selected_section ] == undefined ? null : all_sections[ selected_section ]"
            v-if="this.current_user.is_instructor" />
          <StudentAttendanceHistory :section_id="section_id" :showData="showData" v-else />

        </div>
        <div v-else-if="subview_section_id == 1" :style="{marginTop: `20px`}">
          <SectionAttendanceGraph v-if="this.current_user.is_instructor && selected_section != null" :section_id="selected_section" />
          <SectionAttendanceGraph v-else-if="this.current_user.is_instructor && selected_section == null" :section_id="null" />

          <StudentAttendanceGraph v-else
            :student_id="this.current_user._id"
            :section_id="section_id"
          />
        </div>
        <div v-else-if="subview_section_id == 2" :style="{marginTop: '20px'}">
          <show-at breakpoint="mediumAndAbove"><UpcomingLecturesList :selected_section="selected_section" :section_id="section_id" /></show-at>
          <hide-at breakpoint="mediumAndAbove"><UpcomingLecturesList :selected_section="selected_section" :section_id="section_id" mobileMode/></hide-at>
        </div>

      </div>
    </show-at>
    <hide-at breakpoint="mediumAndAbove">
      <div>
        <!-- Mobile View -->
        <CourseInfoTitle :course="course" class="inline-block" mobileMode />
        <div class="course-info-sub-tab mobile">
          <div class="left">
            <div class="tab active">Attendance History</div>
          </div>
          <div class="right"  v-if="this.current_user.is_instructor">
            <label id="section_select_label">Select Section</label>
            <select v-model="selected_section" aria-labelledby="section_select_label">
              <option v-for="(section_,i) in section_arr" :key="i" :value="section_[1]">Section {{ section_[0] }}</option>
              <option :value="null" selected>All Sections</option>
            </select>
          </div>
          <div>
            <InstructorAttendanceHistory
              :informSections="this.informSections"
              :course_id="course_id"
              :selected_section="selected_section"
              :showData="showData"
              :selected_section_info="all_sections[ selected_section ] == undefined ? null : all_sections[ selected_section ]"
              v-if="this.current_user.is_instructor"
              mobileMode />
              <StudentAttendanceHistory :section_id="section_id" :showData="showData" mobileMode v-else />
          </div>
        </div>
      </div>
    </hide-at>

  </div>
</template>

<script>

  import CourseAPI from '@/services/CourseAPI.js';
  import UserAPI from '@/services/UserAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import SubmissionAPI from '@/services/SubmissionAPI.js';
  import EventAPI from '@/services/EventAPI.js';
  import {showAt, hideAt} from 'vue-breakpoints';
  import LectureAPI from '@/services/LectureAPI.js';

  import CourseInfoTitle from '@/components/CourseInfoTitle.vue'
  import AverageWeeklyAttendanceBar from '@/components/AverageWeeklyAttendanceBar.vue'
  import EventHistoryList from '@/components/EventHistoryList.vue';
  import InstructorAttendanceHistory from '@/components/InstructorAttendanceHistory.vue'
  import StudentAttendanceHistory from '@/components/StudentAttendanceHistory.vue'
  import SectionAttendanceGraph from '@/components/SectionAttendanceGraph.vue'
  import StudentAttendanceGraph from '@/components/StudentAttendanceGraph.vue'
  import LecturePillList from '@/components/LecturePillList.vue'
  import UpcomingLecturesList from '@/components/UpcomingLecturesList.vue'

  import '@/assets/css/venue-core.css'
  import '@/assets/icon-font.css'

export default {
  name: 'CourseInfo',
  props: {
  },
  computed: {
  },
  components: {
    EventHistoryList,
    showAt,
    hideAt,
    CourseInfoTitle,
    AverageWeeklyAttendanceBar,
    StudentAttendanceHistory,
    InstructorAttendanceHistory,
    SectionAttendanceGraph,
    StudentAttendanceGraph,
    LecturePillList,
    UpcomingLecturesList
  },
  data(){
    return {
      data_to_show: Boolean,
      course: Object,
      section: Object,
      active_events: [],
      all_lectures: [],
      upcoming_lectures: [],
      live_lectures: [],
      past_lectures: [],
      playback_lectures: [],
      section_id: String,
      course_students: [],
      course_has_loaded: false,
      sort_ascending: true,
      event_sorting_fn: Function,
      grid_view: true,
      subview_section_id: 0,
      section_arr: [],
      selected_section: String,
      all_sections: Object
    }
  },
  created() {
    // when the component is created/loaded
    this.data_to_show = false
    this.selected_section = null
    this.section_arr = []
    this.getCurrentUser ()
    this.section_id = null

    if (this.current_user.is_instructor) {
      this.course_id = this.$route.params.id
      this.getCourse()
      this.getStudentsForCourse()
      this.getAllLecturesForCourse()
      this.getUpcomingLecturesForCourse()
      this.getLiveLecturesForCourse()
      this.getPastLecturesForCourse()
      this.getActivePlaybackLecturesForCourse()
      this.getAllSections()
    }
    else {

      this.section_id = this.$route.params.id
      this.getCourse ()
      this.getCourseFromSection ()

      this.getSectionWithCourse()
      this.getAllLecturesForSection()
      this.getUpcomingLecturesForSection()
      this.getLiveLecturesForSection()
      this.getPastLecturesForSection()
      this.getActivePlaybackLecturesForSection()
    }
  },
  methods: {
    getAllSections () {
      SectionAPI.getSectionsForCourse(this.course_id)
      .catch(err => { console.log(`Problem getting sections for course ${this.course_id}`); console.log(err);})
      .then(response => {
        let all_sections_arr = response.data
        let sections_obj = {}
        all_sections_arr.forEach(section_ => {
          sections_obj[section_._id] = section_
        })

        this.all_sections = sections_obj
      })
    },
    showData (new_val) {
      this.data_to_show = new_val
    },
    async getStudentsForCourse() {
      const response = await UserAPI.getStudentsForCourse(this.course_id)
      this.course_students = response.data
    },
    async getSectionWithCourse() {
      const response = await SectionAPI.getSectionWithCourse(this.section_id)
      this.section = response.data
      this.course = this.section.course
      this.course_has_loaded = true
    },
    getCurrentUser() {
      this.current_user = this.$store.state.user.current_user
    },
    async getActivePlaybackLecturesForCourse() {

      LectureAPI.getLecturesForCourse(this.course_id, "active_playback")
      .then(response => { this.playback_lectures = response.data; console.log(`playback lectures`); console.log(response.data); })
    },
    async getPastLecturesForCourse() {

      LectureAPI.getLecturesForCourse(this.course_id, "past")
      .then(response => { this.past_lectures = response.data })
    },
    async getLiveLecturesForCourse() {

      LectureAPI.getLecturesForCourse(this.course_id, "live")
      .then(response => { this.live_lectures = response.data })
    },
    async getUpcomingLecturesForCourse() {

      LectureAPI.getLecturesForCourse(this.course_id, "upcoming")
      .then(response => { this.upcoming_lectures = response.data; })
    },
    async getAllLecturesForCourse() {

      LectureAPI.getLecturesForCourse(this.course_id, "all")
      .then(response => { this.all_lectures = response.data })
    },
    async getActivePlaybackLecturesForSection() {

      LectureAPI.getLecturesForSection(this.section_id, "active_playback")
      .then(response => { this.playback_lectures = response.data })
    },
    async getPastLecturesForSection() {

      LectureAPI.getLecturesForSection(this.section_id, "past")
      .then(response => { this.past_lectures = response.data })
    },
    async getLiveLecturesForSection() {

      LectureAPI.getLecturesForSection(this.section_id, "live")
      .then(response => { this.live_lectures = response.data })
    },
    async getUpcomingLecturesForSection() {

      LectureAPI.getLecturesForSection(this.section_id, "upcoming")
      .then(response => { this.upcoming_lectures = response.data; console.log(`Gettting upcoming sections`); console.log(response.data) })
      .catch(err => { console.log(`Error getting upcoming sections.`); console.log(err); })
    },
    async getAllLecturesForSection() {

      LectureAPI.getLecturesForSection(this.section_id, "all")
      .then(response => { this.all_lectures = response.data })
    },
    async getActiveEventsForCourse() {

      EventAPI.getActiveEventsForCourse(this.course_id)
      .then(response => { this.active_events = response.data; this.getRemainingTimeForActiveEvents(); })
    },
    async getActiveEventsForSection() {

      EventAPI.getActiveEventsForSection(this.section_id)
      .then(response => { this.active_events = response.data; this.getRemainingTimeForActiveEvents(); })
    },
    getCourse () {

      CourseAPI.getCourse(this.course_id)
      .then(response => {
        this.course = response.data
      })
      .catch(err => {
        console.log(`Error getting course from course_id`)
      })
    },
    getCourseFromSection () {

      SectionAPI.getCourse(this.section_id)
      .then(response => {
        this.course = response.data
      })
      .catch(err => {
        console.log(`Error getting course from section_id`)
      })
    },
    informSections (section_number_arr) {
      this.section_arr = section_number_arr
      // try to select the highest section once loaded
      if (this.section_arr.length > 0) {
        this.$set(this, 'selected_section', this.section_arr[0][1])
        // this.selected_section = this.section_arr[0][0]
      }
    }
  }
}
</script>

<style scoped>
  .course-info-container {
    /*border: blue solid;*/
  }

  .course-event-container {
    /*border: green solid;*/
    overflow: hidden;
    padding-left: 6rem;
  }

  .info-section {
    display: inline-block;
    margin-top: 2rem;
    float: left;
  }

  #course-info {
    /*border: black solid;*/
  }

  .course-title {
    border: black solid;
    display: inline-block;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-top: 0.5rem;
  }

  #event-info {
    width: 62%;
  }

  .new-event-btn {
    background-color: white;
    border: #007bff solid;
    color: #black;
    border-radius: 5px;
  }

  .active-events-container {
    margin-top: 3rem;
    overflow: hidden;
  }

  .active-event-pill {
    display: inline-block;
    border: green solid;
    width: 18rem;
    border-radius: 3px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 2rem;
    cursor: pointer;
  }

  .active-event-card-section {
    display: inline-block;
    color: black;
  }

  #active-event-name {
    float: left;
  }

  #active-event-time-remaining {
    float: right;
  }

  .attendance-history-container {
    /*border: blue solid;*/
    /*padding-left: 6rem;*/
    overflow: hidden;
    margin: auto;
    margin-top: 3rem;
    width: 86%;
  }

  .attendance-history-header {
    /*border: red solid;*/
    text-align: left;
  }

  .attendance-history-header-text {
    display: inline-block;
    /*border: purple solid;*/
  }

  .section-selector {
    /*border: orange solid;*/
    display: inline-block;
    margin-left: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }

  .lecture-container {
    border: blue solid;
    width: 10rem;
    height: 3rem;
    border-radius: 5px;
    margin-left: 3rem;
    margin-top: 2rem;
    display: inline-block;
    float: left;
    cursor: pointer;
  }
</style>

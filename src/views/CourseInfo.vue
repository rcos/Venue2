<template>
  <div class="venue-body-container">

    <!-- Title -->
    <div class="title">Course Info</div>
    <div>
      <CourseInfoTitle :course="course" class="inline-block" />
      <AverageWeeklyAttendanceBar class="inline-block" />
    </div>

    <!-- Attendance History Tab Button / Statistics Tab Button Bar -->
    <div class="course-info-sub-tab">
      <div class="left">
        <div v-on:click="subview_section_id = 0" :class="'tab ' + (subview_section_id == 0 ? 'active' : '')">Attendance History</div>
        <div v-on:click="subview_section_id = 1" :class="'tab ' + (subview_section_id == 1 ? 'active' : '')">Statistics</div>
      </div>
      <div v-if="this.current_user.is_instructor" class="right">
        <select v-model="selected_section">
          <option v-for="section_ in section_arr" :value="section_[1]">Section {{ section_[0] }}</option>
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
        v-if="this.current_user.is_instructor" />
      <StudentAttendanceHistory :section_id="section_id" v-else />

    </div>
    <div v-else-if="subview_section_id == 1" :style="{marginTop: `20px`}">
      <SectionAttendanceGraph v-if="this.current_user.is_instructor && selected_section != null" :section_id="selected_section" />
      <SectionAttendanceGraph v-else-if="this.current_user.is_instructor && selected_section == null" :section_id="null" />

      <StudentAttendanceGraph v-else
        :student_id="this.current_user._id"
        :section_id="section_id"
      />
    </div>

  </div>
</template>

<script>

  import CourseAPI from '@/services/CourseAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import SubmissionAPI from '@/services/SubmissionAPI.js';
  import EventAPI from '@/services/EventAPI.js';
  import {showAt, hideAt} from 'vue-breakpoints';

  import CourseInfoTitle from '@/components/CourseInfoTitle.vue'
  import AverageWeeklyAttendanceBar from '@/components/AverageWeeklyAttendanceBar.vue'
  import EventHistoryList from '@/components/EventHistoryList.vue';
  import InstructorAttendanceHistory from '@/components/InstructorAttendanceHistory.vue'
  import StudentAttendanceHistory from '@/components/StudentAttendanceHistory.vue'
  import SectionAttendanceGraph from '@/components/SectionAttendanceGraph.vue'
  import StudentAttendanceGraph from '@/components/StudentAttendanceGraph.vue'

  import '@/assets/css/venue-core.css'
  import '@/assets/icon-font.css'

export default {
  name: 'CourseInfo',
  components: {
    EventHistoryList,
    showAt,
    hideAt,
    CourseInfoTitle,
    AverageWeeklyAttendanceBar,
    StudentAttendanceHistory,
    InstructorAttendanceHistory,
    SectionAttendanceGraph,
    StudentAttendanceGraph
  },
  data(){
    return {
      course: Object,
      section: Object,
      active_events: [],
      course_has_loaded: false,
      sort_ascending: true,
      event_sorting_fn: Function,
      grid_view: true,
      subview_section_id: 0,
      section_arr: [],
      selected_section: String
    }
  },
  created() {
    // when the component is created/loaded
    this.selected_section = null
    this.section_arr = []
    this.getCurrentUser ()

    if (this.current_user.is_instructor) {
      this.course_id = this.$route.params.id
      // get the course from the course id
      this.getCourse ()
    }
    else {
      this.section_id = this.$route.params.id
      // get the course from the section id
      this.getCourseFromSection ()
    }
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.$store.state.user.current_user
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

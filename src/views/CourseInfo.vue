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
              tabindex="0" role="tab" :aria-selected="(subview_section_id == 0 ? 'true' : 'false')" aria-controls="panel-1" aria-label="Show Attendance History">Attendance History</div>
            <div
              v-on:click="subview_section_id = 1" v-on:keyup.enter="subview_section_id = 1"
              :class="'tab ' + (subview_section_id == 1 ? 'active' : '')"
              tabindex="0" role="tab" :aria-selected="(subview_section_id == 1 ? 'true' : 'false')" aria-controls="panel-2" aria-label="Show Upcoming Lectures">Upcoming</div>
          </div>
          <div v-if="this.current_user.is_instructor" class="right">
            <label id="section_select_label">Select Section</label>
            <select v-model="selected_section" class="form-control" aria-labelledby="section_select_label" @change="onSectionChange">
              <option v-for="(section,i) in sorted_sections" :key="i" :value="section._id">Section {{section.number}}</option>
              <option :value="'all'" selected>All Sections</option>
            </select>
          </div>
        </div>

        <!-- Attendance History -->
        <div v-if="subview_section_id == 0" id="panel-1" role="tabpanel" class="panel">

          <InstructorAttendanceHistory
            v-if="this.current_user.is_instructor && lectures_loaded"
            :lectures="selected_section == 'all' ? all_lectures : sorted_lectures[selected_section].lectures" :timeline="sorted_lectures[selected_section].timeline" :students="selected_section == 'all' ? course_students : sections[selected_section].students" :scores_loaded="scores_loaded"/>
          <StudentAttendanceHistory v-else-if="lectures_loaded" :lectures="sorted_lectures[section_id].lectures" :timeline="sorted_lectures[section_id].timeline" :scores_loaded="scores_loaded"/>
          <div v-else :style='{textAlign: "center"}'>
            <SquareLoader />
          </div>

        </div>
        <div v-else-if="subview_section_id == 1" :style="{marginTop: '20px'}" id="panel-2" role="tabpanel">
          <show-at breakpoint="mediumAndAbove"><UpcomingLecturesList :selected_section="selected_section" :section_id="section_id" :lecture_data="upcoming_lectures"/></show-at>
          <hide-at breakpoint="mediumAndAbove"><UpcomingLecturesList :selected_section="selected_section" :section_id="section_id" :lecture_data="upcoming_lectures" mobileMode/></hide-at>
        </div>

      </div>
    </show-at>
    <hide-at breakpoint="mediumAndAbove">
      <div>
        <!-- Mobile View -->
        <CourseInfoTitle :course="typeof course == typeof {} ? course : {}" class="inline-block" mobileMode />
        <div class="course-info-sub-tab mobile">
          <div class="left">
            <div class="tab active">Attendance History</div>
          </div>
          <div class="right"  v-if="this.current_user.is_instructor">
            <label id="section_select_label">Select Section</label>
            <select v-model="selected_section" class="form-control" aria-labelledby="section_select_label" @change="onSectionChange">
              <option v-for="(section,i) in sorted_sections" :key="i" :value="section._id">Section {{section.number}}</option>
              <option :value="'all'" selected>All Sections</option>
            </select>
          </div>
          <div>
            <InstructorAttendanceHistory
            v-if="this.current_user.is_instructor && lectures_loaded && scores_loaded"
            :lectures="selected_section == 'all' ? all_lectures : sorted_lectures[selected_section].lectures" :timeline="sorted_lectures[selected_section].timeline" :students="selected_section == 'all' ? course_students : sections[selected_section].students" :scores_loaded="scores_loaded" mobileMode/>
            <StudentAttendanceHistory v-else-if="lectures_loaded && scores_loaded" :lectures="sorted_lectures[section_id].lectures" :timeline="sorted_lectures[section_id].timeline" :scores_loaded="scores_loaded" mobileMode/>
            <div v-else :style='{textAlign: "center"}'>
              <SquareLoader />
            </div>
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
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js'
  import {getLiveLectures,getRecentLectures,getUpcomingLectures,getActivePlaybackLectures,getPastLectures} from '@/services/GlobalFunctions.js'

  import {showAt, hideAt} from 'vue-breakpoints';
  import CourseInfoTitle from '@/components/CourseInfoTitle.vue'
  import EventHistoryList from '@/components/EventHistoryList.vue';
  import InstructorAttendanceHistory from '@/components/InstructorAttendanceHistory.vue'
  import StudentAttendanceHistory from '@/components/StudentAttendanceHistory.vue'
  import LecturePillList from '@/components/LecturePillList.vue'
  import UpcomingLecturesList from '@/components/UpcomingLecturesList.vue'

  import SquareLoader from '@/components/Loaders/SquareLoader.vue'

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
    StudentAttendanceHistory,
    InstructorAttendanceHistory,
    LecturePillList,
    UpcomingLecturesList,
    SquareLoader
  },
  data(){
    return {
      course: Object,
      section: Object,
      all_lectures: [],
      upcoming_lectures: [],
      live_lectures: [],
      past_lectures: [],
      playback_lectures: [],
      course_students: [],
      subview_section_id: 0,
      sections: Object,
      sorted_sections: [],
      selected_section: "all",
      sorted_lectures: {},
      lectures_loaded: false,
      scores_loaded: false
    }
  },
  created() {
    // when the component is created/loaded
    this.getCurrentUser()
    this.section_id = null

    if (this.current_user.is_instructor) {
      this.course_id = this.$route.params.id
      this.getAllSections()
      this.getStudentsForCourse()
      this.getCourse()
    }
    else {
      this.section_id = this.$route.params.id
      this.getSectionWithCourse()
    }
  },
  methods: {
    async getAllSections () {
      SectionAPI.getSectionsForCourse(this.course_id)
      .catch(err => { console.log(`Problem getting sections for course ${this.course_id}`); console.log(err);})
      .then(response => {
        response.data.forEach(section_ => {
          this.sections[section_._id] = section_
          this.sorted_sections.push(section_)
        })
        this.sorted_sections.sort((a, b) => (a.number > b.number) ? 1 : -1)
        this.getAllLecturesForCourse()
      })
    },
    async getSectionWithCourse() {
      const response = await SectionAPI.getSectionWithCourse(this.section_id)
      this.sections[response.data._id] = response.data
      this.course = this.sections[response.data._id].course
      this.getAllLecturesForSection()
    },
    async getStudentsForCourse() {
      const response = await UserAPI.getStudentsForCourse(this.course_id)
      this.course_students = response.data
    },
    getCurrentUser() {
      this.current_user = this.$store.state.user.current_user
    },
    parseActivePlaybackLectures(all_lectures) {
      this.playback_lectures = getActivePlaybackLectures(all_lectures)
    },
    parsePastLectures(all_lectures) {
      this.past_lectures = getPastLectures(all_lectures)
    },
    parseLiveLectures(all_lectures) {
      this.live_lectures = getLiveLectures(all_lectures)
    },
    parseUpcomingLectures(all_lectures) {
      this.upcoming_lectures = getUpcomingLectures(all_lectures)
    },
    async getAllLecturesForCourse() {
      LectureAPI.getLecturesForCourse(this.course_id)
      .then(response => {
        this.all_lectures = response.data
        this.all_lectures.sort((a, b) => 
          (a.start_time > b.start_time || a.playback_submission_start_time > b.playback_submission_start_time ||
          a.start_time > b.playback_submission_start_time || a.playback_submission_start_time > b.start_time) ? 1 : -1
        )
        this.parseUpcomingLectures(this.all_lectures)
        this.parseLiveLectures(this.all_lectures)
        this.parsePastLectures(this.all_lectures)
        this.parseActivePlaybackLectures(this.all_lectures)
        this.sortLecturesBySectionAndBuildTimeLine({instructor: true})
      })
    },
    async getAllLecturesForSection() {
      LectureAPI.getLecturesForSection(this.section_id)
      .then(response => {
        this.all_lectures = response.data
        this.all_lectures.sort((a, b) =>
          (a.start_time > b.start_time || a.playback_submission_start_time > b.playback_submission_start_time ||
          a.start_time > b.playback_submission_start_time || a.playback_submission_start_time > b.start_time) ? 1 : -1
        )
        this.parseUpcomingLectures(this.all_lectures)
        this.parseLiveLectures(this.all_lectures)
        this.parsePastLectures(this.all_lectures)
        this.parseActivePlaybackLectures(this.all_lectures)
        this.sortLecturesBySectionAndBuildTimeLine({instructor: false})
      })
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
    sortLecturesBySectionAndBuildTimeLine(options) {
      let sorted = {}
      sorted["all"] = {}
      sorted["all"].lectures = []
      this.all_lectures.forEach(lect => {
        sorted["all"].lectures.push(lect)
        lect.sections.forEach(sectID => {
          if(undefined != this.sections[sectID]) {
            if(undefined == lect.students) {
              lect.students = [...this.sections[sectID].students]
            } else {
              for(let i=0;i<this.sections[sectID].students.length;i++) {
                if(!lect.students.includes(this.sections[sectID].students[i])) {
                  lect.students.push(this.sections[sectID].students[i])
                }
              }
            }
          }
          if(undefined == sorted[sectID]) {
            sorted[sectID] = {}
            sorted[sectID].lectures = []
          }
          sorted[sectID].lectures.push(lect)
        })
      })
      Object.keys(sorted).forEach(sectID => {
        sorted[sectID].timeline = {}
        sorted[sectID].lectures.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
        for(let i=0;i<sorted[sectID].lectures.length;i++) {
          let lect = sorted[sectID].lectures[i]
          if(undefined == lect.start_time || "Invalid Date" == lect.start_time || null == lect.start_time) {
            lect.start_time = new Date(lect.playback_submission_start_time)
          } else {
            lect.start_time = new Date(lect.start_time)
          }
          let year = lect.start_time.getFullYear()
          let month = lect.start_time.getMonth()
          if(!sorted[sectID].timeline[year]) {
            sorted[sectID].timeline[year] = {}
          }
          if(!sorted[sectID].timeline[year][month]) {
            sorted[sectID].timeline[year][month] = []
          }
          sorted[sectID].timeline[year][month].push(i)
        }
      })
      this.sorted_lectures = sorted
      this.lectures_loaded = true
      if(options.instructor) {
        this.calculateInstructorAttendances()
      } else {
        this.calculateStudentAttendances()
      }
    },
    calculateInstructorAttendances() {
      let promise_tracker = []
      this.all_lectures.forEach(lecture_ => {
        promise_tracker.push(
          LectureSubmissionAPI.getLectureSubmissionsForLecture(lecture_._id)
          .catch(err => { console.log('error retrieving lecture submissions for lecture ' + lecture_._id); console.log(err); })
          .then(response => {
            let submissions = response.data == undefined ? [] : response.data
            let students = lecture_.students
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
            lecture_.color = this.getHTMLClassByAttendance(lecture_.percentage)
          })
        )
      })
      Promise.all(promise_tracker)
      .then(res => {
        this.scores_loaded = true
      })
    },
    calculateStudentAttendances() {
      let promise_tracker = []

      this.sorted_lectures[this.section_id].lectures.forEach(lecture_data => {
        promise_tracker.push(
          LectureSubmissionAPI.getLectureSubmissionsForStudent(lecture_data._id, this.current_user._id)
          .catch(err => { console.log(`error retrieving lecture submissions for student ${this.current_user._id}`); console.log(err); })
          .then(response => {
            if (response.data == null || response.data == []) {
              lecture_data.percentage = 0
            } else {
              let live = []
              let playback = null
              response.data.forEach(sub => {
                if(sub.submitter == this.current_user._id) {
                  if(sub.is_live_submission) {
                    live.push(sub)
                  } else {
                    playback = sub
                  }
                }
              })
              if(live.length > 0 && playback != null) {
                lecture_data.percentage = Math.max(
                  live.length / lecture_data.checkins.length * 100,
                  Math.ceil(playback.video_percent * 100)
                )
              } else if(live.length > 0) {
                lecture_data.percentage = live.length / lecture_data.checkins.length * 100
              } else if(playback != null) {
                lecture_data.percentage = Math.ceil(playback.video_percent * 100)
              }
              lecture_data.color = this.getHTMLClassByAttendance(lecture_data.percentage)
            }
          })
        )
      })
      Promise.all(promise_tracker)
      .then(res => {
        this.scores_loaded = true
      })
    },
    onSectionChange() {
      this.$forceUpdate()
    },
    getHTMLClassByAttendance (percent) {
      if (undefined == percent || percent <= 60) return 'bad'
      else if (percent <= 75) return 'medium'
      return 'good'
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
    color: black;
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

  .panel {
    height: 100%;
  }
</style>

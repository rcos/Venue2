<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Upcoming</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="upcoming_lectures == null || upcoming_lectures.length == 0">
      No upcoming lectures.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">
      <LectureCard v-for="lecture in upcoming_lectures"
        :lecture="lecture"
        :courseName="lecture.sections[0].course.name"
        :courseDept="lecture.sections[0].course.dept"
        :courseNumber="lecture.sections[0].course.course_number"
        :eventLabel="lecture.title"
        status="static"
        :timeFromNow="lecture.start_time"
       />
    </div>
  </div>
</template>
<script>

  import EventInfoPill from '@/components/EventInfoPill.vue'
  import moment from 'moment'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureCard from '@/components/LectureCard.vue'


  export default {
    name: 'UpcomingLectures',
    components: {
      EventInfoPill,
      SquareLoader,
      LectureCard
    },
    props: {
      mobileMode: Boolean,
      upcoming_lectures: Array,
      colorCallback: Function,
      loaded: Boolean
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      getCalendarDate (time_) {
        return moment(time_).calendar()
      },
      getCourseName (data_) {
        if (data_ == null || data_ == undefined || !data_.hasOwnProperty('course_info')) return '-----'
        return data_.course_info.name
      },
      getCourseTitle (data_) {
        if (data_ == null || data_ == undefined || !data_.hasOwnProperty('course_info')) return '-----'
        return data_.course_info.dept + ' ' + data_.course_info.course_number
      }
    }
  }

</script>

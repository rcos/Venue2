<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Live</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="live_lectures == null || live_lectures.length == 0">
      No live lectures.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')" aria-label="Live Lecture List">
      <LectureCard v-for="(lecture,i) in live_lectures" :key="i"
        :lecture="lecture"
        :courseName="lecture.sections[0].course.name"
        :courseDept="lecture.sections[0].course.dept"
        :courseNumber="lecture.sections[0].course.course_number"
        :eventLabel="lecture.title"
        status="ongoing"
        :timeFromNow="lecture.end_time"
       />
    </div>
  </div>
</template>
<script>
  import EventInfoPill from '@/components/EventInfoPill.vue'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureCard from '@/components/LectureCard.vue'

  import moment from 'moment'

  export default {
    name: 'LiveCourses',
    components: {
      EventInfoPill,
      SquareLoader,
      LectureCard
    },
    props: {
      mobileMode: Boolean,
      live_lectures: Array,
      colorCallback: Function,
      loaded: Boolean
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      getTimeUntil (time_string) {
        return moment(time_string).fromNow()
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

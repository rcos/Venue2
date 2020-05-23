<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Upcoming</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="upcoming_lectures == null || upcoming_lectures.length == 0">
      No data.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">
      <router-link v-for="lecture in upcoming_lectures" :to="{name: 'lecture_info', params: { id: lecture._id }}" >
        <ActiveEventCard
          :courseName="lecture.sections[0].course.name"
          :courseDept="lecture.sections[0].course.dept"
          :eventLabel="lecture.title"
          status="static"
          :timeFromNow="lecture.start_time"
         />
      </router-link>
    </div>

  </div>
</template>
<script>

  import EventInfoPill from '@/components/EventInfoPill.vue'
  import moment from 'moment'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import ActiveEventCard from '@/components/ActiveEventCard.vue'


  export default {
    name: 'UpcomingCourses',
    components: {
      EventInfoPill,
      SquareLoader,
      ActiveEventCard
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

<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Upcoming</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="data == null || data.length == 0">
      No data.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">

      <router-link v-for="data_ in data" :to="{name: 'lecture_info', params: { id: data_._id }}" >
        <EventInfoPill
          :courseName="getCourseName(data_)"
          :courseDept="getCourseTitle(data_)"
          :eventLabel="data_.title"
          :rightText="getCalendarDate(data_.start_time)"
          :colorHex="colorCallback(data_.course_info)"
          :mobileMode="mobileMode"
        />
      </router-link>
    </div>

  </div>
</template>
<script>

  import EventInfoPill from '@/components/EventInfoPill.vue'
  import moment from 'moment'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'

  export default {
    name: 'UpcomingCourses',
    components: {
      EventInfoPill,
      SquareLoader
    },
    props: {
      mobileMode: Boolean,
      data: Array,
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

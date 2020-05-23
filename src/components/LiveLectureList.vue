<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Live</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="live_lectures == null || live_lectures.length == 0">
      No live lectures.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">

      <router-link v-for="lecture in live_lectures" :to="{name: 'lecture_info', params: { id: lecture._id }}" >
        <!-- <EventInfoPill
          :courseName="getCourseName(data_)"
          :courseDept="getCourseTitle(data_)"
          :eventLabel="data_.title"
          :rightText="getTimeUntil(data_.end_time)"
          :colorHex="colorCallback(data_.course_info)"
          :mobileMode="mobileMode"
        /> -->
        <ActiveEventCard
          :courseName="lecture.sections[0].course.name"
          :courseDept="lecture.sections[0].course.dept"
          :eventLabel="lecture.title"
          status="ongoing"
          :timeFromNow="lecture.end_time"
         />
      </router-link>

      <!-- <ActiveEventCard
        courseName="Sample Course"
        courseDept="TEST"
        eventLabel="123Label"
        eventSublabel="Sample Sublabel"
        status="pending"
       />

       <ActiveEventCard
         courseName="Sample Course"
         courseDept="TEST"
         eventLabel="123Label"
         status="ongoing"
         timeFromNow="2020-05-24T00:00:00.000Z"
        />

        <ActiveEventCard
          courseName="Sample Course"
          courseDept="TEST"
          eventLabel="123Label"
          status="ended"
          timeFromNow="2020-05-24T00:00:00.000Z"
         /> -->
    </div>

  </div>
</template>
<script>
  import EventInfoPill from '@/components/EventInfoPill.vue'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import ActiveEventCard from '@/components/ActiveEventCard.vue'

  import moment from 'moment'

  export default {
    name: 'LiveCourses',
    components: {
      EventInfoPill,
      SquareLoader,
      ActiveEventCard
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

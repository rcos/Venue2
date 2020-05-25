<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Recent</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="recent_lectures == null || recent_lectures.length == 0">
      No data.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">
      <router-link v-for="lecture in recent_lectures" :to="{name: 'lecture_info', params: { lecture_id: lecture._id }}" >
        <LectureCard
          :courseName="lecture.sections[0].course.name"
          :courseDept="lecture.sections[0].course.dept"
          :eventLabel="lecture.title"
          status="ended"
          :timeFromNow="lecture.end_time"
         />
      </router-link>
    </div>

  </div>
</template>
<script>
  import EventInfoPill from '@/components/EventInfoPill.vue'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureCard from '@/components/LectureCard.vue'

  export default {
    name: 'RecentCourses',
    components: {
      EventInfoPill,
      SquareLoader,
      LectureCard
    },
    props: {
      mobileMode: Boolean,
      recent_lectures: Array,
      colorCallback: Function,
      loaded: Boolean
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
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

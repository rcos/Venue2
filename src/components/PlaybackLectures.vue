<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Playback</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="playback_lectures == null || playback_lectures.length == 0">
      No playback lectures.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')" aria-label="Playback Lecture List">
      <LectureCard v-for="(lecture,i) in playback_lectures" :key="i"
        :lecture="lecture"
        :courseName="lecture.sections[0].course.name"
        :courseDept="lecture.sections[0].course.dept"
        :courseNumber="lecture.sections[0].course.course_number"
        :eventLabel="lecture.title"
        status="static"
        :timeFromNow="lecture.playback_submission_end_time"
       />
    </div>
  </div>
</template>
<script>
  import EventInfoPill from '@/components/EventInfoPill.vue'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import LectureCard from '@/components/LectureCard.vue'

  export default {
    name: 'PlaybackLectures',
    components: {
      EventInfoPill,
      SquareLoader,
      LectureCard
    },
    props: {
      mobileMode: Boolean,
      playback_lectures: Array,
      colorCallback: Function,
      loaded: Boolean
    },
    data () {
      return {}
    },
    created () {

    },
    methods: {

    }
  }

</script>

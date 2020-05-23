<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Playback</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="playback_lectures == null || playback_lectures.length == 0">
      No data.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">
      <router-link v-for="lecture in playback_lectures" :to="{name: 'lecture_info', params: { id: lecture._id }}" >
      <ActiveEventCard
        :courseName="lecture.sections[0].course.name"
        :courseDept="lecture.sections[0].course.dept"
        :eventLabel="lecture.title"
        status="static"
        :timeFromNow="lecture.end_time"
       />
      </router-link>
    </div>
  </div>
</template>
<script>
  import EventInfoPill from '@/components/EventInfoPill.vue'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'
  import ActiveEventCard from '@/components/ActiveEventCard.vue'

  export default {
    name: 'PlaybackCourses',
    components: {
      EventInfoPill,
      SquareLoader,
      ActiveEventCard
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

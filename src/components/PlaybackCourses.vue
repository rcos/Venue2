<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Playback</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div class="center-fill-section" v-else-if="data == null || data.length == 0">
      No data.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">

      <router-link v-for="data_ in data" :to="{name: 'lecture_info', params: { id: data_._id }}" >
      <EventInfoPill
        :courseName="data_.course_info.name"
        :courseDept="data_.course_info.dept + ' ' + data_.course_info.course_number"
        :eventLabel="data_.title"
        eventSublabel="2d 3h 1m"
        rightText="87% Submission"
        colorHex="green"
        :mobileMode="mobileMode"
      />
      </router-link>
    </div>

  </div>
</template>
<script>
  import EventInfoPill from '@/components/EventInfoPill.vue'
  import SquareLoader from '@/components/Loaders/SquareLoader.vue'

  export default {
    name: 'PlaybackCourses',
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

    }
  }

</script>

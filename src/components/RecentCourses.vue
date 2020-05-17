<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile':'')">
    <div class="title">Recent</div>
    <div :class="'sub-section ' + (mobileMode ? 'is-mobile':'')">
      <EventInfoPill
        courseName="Course Name"
        courseDept="CSCI 2961"
        eventLabel="Class 5/20"
        rightText="5m"
        colorHex="blue"
        :mobileMode="mobileMode"
      />

      <EventInfoPill
        courseName="Course Name"
        courseDept="CSCI 2961"
        eventLabel="Class 5/20"
        eventSublabel="2d 3h 1m"
        rightText="5m"
        colorHex="green"
        :mobileMode="mobileMode"
      />
    </div>

  </div>
</template>
<script>
  import EventInfoPill from '@/components/EventInfoPill.vue'

  export default {
    name: 'RecentCourses',
    components: {
      EventInfoPill
    },
    props: {
      mobileMode: Boolean
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

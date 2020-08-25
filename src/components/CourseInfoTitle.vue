<template>
  <div :class="'course-info-title ' + (this.mobileMode ? 'mobile' : '')">

    <!-- Course Name -->
    <div class="course-name" v-if="course.hasOwnProperty('name')">{{course.name}}</div>

    <div>

      <!-- Course Dept # -->
      <div class="course-dept-number inline-block" v-if="course.hasOwnProperty('prefix') && course.hasOwnProperty('suffix')">{{course.prefix}} {{course.suffix}}</div>

      <!-- Time Block -->
      <div v-if="course.hasOwnProperty('name') && section_name != -1">Section {{ section_name }}</div>

    </div>

  </div>
</template>

<script>

  export default {
    name: 'CourseInfoTitle',
    components: {},
    props: {
      course: Object,
      mobileMode: Boolean,
      section_name: String
    },
    created () {},
    methods: {}
  }

</script>

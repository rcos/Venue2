<template>
  <div :class="'course-info-title ' + (this.mobileMode ? 'mobile' : '')">

    <!-- Course Name -->
    <div class="course-name" v-if="course.hasOwnProperty('name')">{{course.name}}</div>

    <div>

      <!-- Course Dept # -->
      <div class="course-dept-number inline-block" v-if="course.hasOwnProperty('dept') && course.hasOwnProperty('course_number')">{{course.dept}} {{course.course_number}}</div>

      <!-- Time Block -->
      <div v-if="course.hasOwnProperty('name') && section_number != -1">Section {{ section_number }}</div>

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
      section_number: Number
    },
    created () {},
    methods: {}
  }

</script>

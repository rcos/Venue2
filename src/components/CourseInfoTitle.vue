<template>
  <div :class="'course-info-title ' + (this.mobileMode ? 'mobile' : '')">

    <!-- Course Name -->
    <div class="course-name">{{course.name}}</div>

    <div>

      <!-- Course Dept # -->
      <div class="course-dept-number inline-block">{{course.dept}} {{course.course_number}}</div>

      <!-- Time Block -->
      <div class="course-time-block inline-block">3:00pm-4:50pm</div>
      <div v-if="section_number != -1">Section {{ section_number }}</div>

    </div>

  </div>
</template>

<script>

  export default {
    name: 'CourseInfoTitle',
    components: {},
    props: {
      course: {
        type: Object,
        required: true
      },
      mobileMode: Boolean,
      section_number: Number
    },
    created () {},
    methods: {}
  }

</script>

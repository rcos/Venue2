<template>
  <div class="course-info-title">

    <!-- Course Name -->
    <div class="course-name">{{course.name}}</div>

    <div>

      <!-- Course Dept # -->
      <div class="course-dept-number inline-block">{{course.dept}} {{course.course_number}}</div>

      <!-- Time Block -->
      <div class="course-time-block inline-block">3:00pm-4:50pm</div>

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
      }
    },
    created () {},
    methods: {}
  }

</script>

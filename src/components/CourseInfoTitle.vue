<template>
  <div :class="'course-info-title ' + (this.mobileMode ? 'mobile' : '')">

    <!-- Course Name -->
    <div class="course-name" v-if="course.hasOwnProperty('name')">{{course.name}} <button class="btn" title="Edit Course" id="edit-course" @click="handleEditCourse()" v-if="can_edit"><img id="edit-course" src="@/assets/icons8-edit.svg" alt="Edit" width="40" aria-label="Edit"></button></div>

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
      section_name: String,
      can_edit: Boolean
    },
    created () {},
    methods: {
      handleEditCourse() {
        this.$router.push({
          name: "edit_course",
          params: { id: this.course._id }
        })
      }
    }
  }

</script>

<style scoped>
#edit-course {
  float: right;
  padding: 0;
}
#cancel-edit-btn {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 1rem;
}
</style>

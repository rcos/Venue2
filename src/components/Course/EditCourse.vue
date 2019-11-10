<template>
  <div>
    <h1>Edit Course</h1>
    <form @submit.prevent="updateCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>name</label>
            <input type="text" class="form-control" v-model="course.name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>dept</label>
              <input class="form-control" v-model="course.dept" rows="5">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>dept</label>
              <input type="number" class="form-control" v-model="course.course_number" rows="5">
            </div>
          </div>
        </div><br />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>instructor</label>
              <input class="form-control" v-model="course.instructor.first_name" rows="5" readonly>
              <input class="form-control" v-model="course.instructor.last_name" rows="5" readonly>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>
  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';

  export default {
    data() {
      return {
        course: {}
      }
    },
    created() {
      this.getCurrentCourse();
    },
    methods: {
      async getCurrentCourse() {
        let course_id = this.$route.params.id;
        const response = await CourseAPI.getCourse(course_id);
        this.course = response.data;
      },
      async updateCourse() {
        let course_id = this.$route.params.id;
        const response = await CourseAPI.updateCourse(course_id, this.course);
        this.$router.push({name: 'course'});
      }
    }
  }
</script>
<template>
  <div>
    <h2>Create A Course</h2>
    <form @submit.prevent="addCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>name:</label>
            <input type="text" class="form-control" v-model="course.name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>dept:</label>
              <input class="form-control" v-model="course.dept">
            </div>
          </div>
        </div><br />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>course_number:</label>
              <input type="number" class="form-control" v-model="course.course_number">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>instructor:</label>
              <input class="form-control" v-model="instructor.first_name" readonly>
              <input class="form-control" v-model="instructor.last_name" readonly>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>

  <!-- Showing Instructors -->
  <Instructors v-on:select-instructor="selectInstructor" />

  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';
  import Instructors from '../User/Instructors'

  export default {
    name: 'Course',
    components: {
      Instructors
    },
    data(){
      return {
        course: {},
        instructor: {}
      }
    },
    created() {
    },
    methods: {
      async addCourse(evt){
        evt.preventDefault();
        if ('_id' in this.instructor) { // instructor has been selected
          this.course.instructor = this.instructor._id;
          console.log(this.course)
          const response = await CourseAPI.addCourse(this.course);
          console.log(response)
          this.$router.push({name: 'courses'});
        }
      },
      selectInstructor(instructor){
        this.instructor = instructor
      },
    }
  }
</script>courses

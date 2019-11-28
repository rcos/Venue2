<template>
  <!-- ADDING USER -->
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
  import UserAPI from '@/services/UserAPI.js';
  import Instructors from '../User/Instructors'

  export default {
    name: 'NewCourse',
    components: {
      Instructors,
    },
    data(){
      return {
        course:{},
        instructor: {},
        instructors: []
      }
    },
    created() {
      this.loadInstructors()
    },
    methods: {
      async loadInstructors(){
        const response = await UserAPI.getInstructors()
        this.instructors = response.data
      },
      async addCourse(evt){
        evt.preventDefault(); // prevents the form's default action from redirecting the page
        if(typeof this.instructor.first_name !== 'undefined'){
          console.log("I SHOULDN'T BE PRINTING THIS: " + this.instructor)
          this.course.instructor = this.instructor;
        }
        const response = await CourseAPI.addCourse(this.course);
        this.$router.push({name: 'courses'});
      },
      selectInstructor(instructor){
        this.instructor = instructor
      },
    }
  }
</script>
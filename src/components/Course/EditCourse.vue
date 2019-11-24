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
              <input class="form-control" v-model="instructor.first_name" rows="5" readonly>
              <input class="form-control" v-model="instructor.last_name" rows="5" readonly>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>

    <Instructors v-on:select-instructor="selectInstructor" />
  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';
  import UserAPI from '@/services/UserAPI.js';
  import Instructors from '../User/Instructors'

  export default {
    name: 'EditCourse',
    components: {
      Instructors
    },
    data() {
      return {
        course: {},
        instructor: {},
        instructors: []
      }
    },
    created() {
      this.getCurrentCourse()
      this.loadInstructors()
    },
    methods: {
      async getCurrentCourse() {
        let course_id = this.$route.params.id
        const response = await CourseAPI.getCourse(course_id)
        this.course = response.data
        this.getCurrentCourseInstructor()
      },
      async loadInstructors(){
        const response = await UserAPI.getInstructors()
        this.instructors = response.data
      },
      async getCurrentCourseInstructor(){
        const response = await CourseAPI.getInstructor(this.course._id)
        this.instructor = response.data
      },
      async updateCourse() {
        let course_id = this.$route.params.id
        const response = await CourseAPI.updateCourse(course_id, this.course)
        this.$router.push({name: 'course'})
      }, 
      selectInstructor(instructor){
        this.instructor = instructor
        this.course.instructor = instructor
      },
    }
  }
</script>
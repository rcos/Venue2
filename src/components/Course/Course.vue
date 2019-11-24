<template>
  <!-- ADDING USER -->
  <div>
    <h1>Create A Course</h1>
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
  <h1>Select an instructor</h1>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>first_name</th>
          <th>last_name</th>
          <th>is_instructor</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="instructor in instrcutors" :key="instructor._id">
              <td>{{ instructor.first_name }}</td>
              <td>{{ instructor.last_name }}</td>
              <td>{{ instructor.is_instructor }}</td>
              <td><button class="btn btn-secondary" @click.prevent="selectInstructor(instructor._id)">Select</button></td>
            </tr>
        </tbody>
    </table>

  <!-- SHOWING Courses -->
    <h1>Courses</h1>
      <table class="table table-hover">
          <thead>
          <tr>
            <th>name</th>
            <th>dept</th>
            <th>course_number</th>
            <th>instructor</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="course in courses" :key="course._id">
                <td>{{ course.name }}</td>
                <td>{{ course.dept }}</td>
                <td>{{ course.course_number }}</td>
                <td>{{ course.instructor.first_name }} {{ course.instructor.last_name }}</td>
                <td><router-link :to="{name: 'editCourse', params: { id: course._id }}" class="btn btn-primary">Edit</router-link></td>
                <td><button class="btn btn-danger" @click.prevent="deleteCourse(course._id)">Delete</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';
  import UserAPI from '@/services/UserAPI.js';

  export default {
    data(){
      return {
        course:{},
        courses: [],
        users: [],
        instructor: {},
        new_instructor: {},
        all_instructors: []
      }
    },
    created() {
      this.loadCourses()
      this.loadUsers()
    },
    computed: {
      instrcutors: function() {
        return this.users.filter(function(u) {
          return u.is_instructor
        })
      }
    },
    methods: {
      async loadCourses () {
        const response = await CourseAPI.getCourses()
        this.courses = response.data
        // this.loadInstructors()
        this.getInstructorsForCourses()
      },
      async getInstructorsForCourses(){
        this.courses.forEach(async course => {
          const response = await CourseAPI.getInstructor(course._id)
          course.instructor = response.data
        })
      },
      async loadUsers () {
        const response = await UserAPI.getUsers()
        this.users = response.data
      },
      async addCourse(evt){
        evt.preventDefault(); // prevents the form's default action from redirecting the page
        this.course.instructor = this.instructor;
        console.log("About to add course with instructor: " + this.course.instructor.first_name + " " + 
        	this.course.instructor.last_name);
        const response = await CourseAPI.addCourse(this.course);
        this.courses.push(response.data);
        let new_course = this.courses[this.courses.length - 1]
        console.log("new course: " + new_course.instructor.first_name + " " + new_course.instructor.last_name)
        this.course = {}; // clear the input field
        this.instructor = {};
      },
      async deleteCourse(id){
        const response = await CourseAPI.deleteCourse(id);
        this.courses.splice(this.courses.findIndex(i => i._id == id), 1);
      },
      selectInstructor(id){
      	this.instructor = this.users.find(user => user._id == id);
      },
    }
  }
</script>
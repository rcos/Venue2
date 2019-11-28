<template>
  <div>
    <h2 v-if="user.is_instructor">Edit Instructor</h2>
    <h2 v-else>Edit Student</h2>
    <form @submit.prevent="updateUser">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="user.first_name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Last Name</label>
              <input class="form-control" v-model="user.last_name" rows="5">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Email</label>
              <input class="form-control" v-model="user.email" rows="5">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Password</label>
              <input class="form-control" v-model="user.password" rows="5">
            </div>
          </div>
        </div>
        <h3>Instructor courses</h3>
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
                <tr v-for="course in user.courses" :key="course._id">
                  <td>{{ course.name }}</td>
                  <td>{{ course.dept }}</td>
                  <td>{{ course.course_number }}</td>
                  <td v-if="course.instructor">{{ course.instructor.first_name }} {{ course.instructor.last_name }}</td>
                  <div>
                    <td><button class="btn btn-danger" @click.prevent="removeCourse(course)">Remove</button></td>
                  </div>
                </tr>
            </tbody>
        </table>
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>

    <Courses v-on:select-course="addCourse" />
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import Courses from '../Course/Courses';

  export default {
    name: 'EditUser',
    components: {
      Courses
    },
    data() {
      return {
        user: {}
      }
    },
    created() {
      this.getCurrentUser();
    },
    methods: {
      async getCurrentUser() {
        let user_id = this.$route.params.id
        const response = await UserAPI.getUser(user_id)
        this.user = response.data
        // this.getCurrentUserCourses()
      },
      async updateUser() {
        let user_id = this.$route.params.id
        const response = await UserAPI.updateUser(user_id, this.user)
        this.$router.push({name: 'users'})
      },
      // async getCurrentUserCourses(){
      //   const response = await UserAPI.getCourses(this.section._id)
      //   this.user.courses = response.data
      // },
      addCourse(course) {
        if(!this.user.courses.includes(course))
          this.user.courses.push(course)
      },
      removeCourse(course) {
        this.user.courses.splice(this.user.courses.indexOf(course),1)
      }
    }
  }
</script>
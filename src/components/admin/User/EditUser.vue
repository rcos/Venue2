<template>
  <div>
    <h2 v-if="user.is_instructor">Edit Instructor</h2>
    <h2 v-else>Edit Student</h2>
    <form @submit.prevent="updateUser">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="user.first_name" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Last Name</label>
            <input class="form-control" v-model="user.last_name" rows="5" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Email</label>
            <input class="form-control" v-model="user.email" rows="5" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Password</label>
            <input class="form-control" v-model="user.password" rows="5" />
          </div>
        </div>
      </div>
      <div v-if="user.is_instructor">
        <h3>Instructor courses</h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>name</th>
              <th>dept</th>
              <th>course_number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in instructor_courses" :key="course._id">
              <td>{{ course.name }}</td>
              <td>{{ course.dept }}</td>
              <td>{{ course.course_number }}</td>
            </tr>
          </tbody>
        </table>
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
      </div>
      <div v-else>
        <h3>Student Sections</h3>
        <div
          class="spinner-border"
          role="status"
          v-if="!section_instructors_have_loaded && !section_courses_have_loaded"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <table class="table table-hover" v-else>
          <thead>
            <tr>
              <th>course</th>
              <th>instructor</th>
              <th>section number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="section in sections" :key="section._id">
              <td>{{ section.course.name }}</td>
              <td>{{ section.instructor.first_name }} {{ section.instructor.last_name }}</td>
              <td>{{ section.number }}</td>
              <td>
                <router-link
                  :to="{name: 'editSection', params: { id: section._id }}"
                  class="btn btn-primary"
                >Edit</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <h3>TA Sections</h3>
        <h3>Submissions</h3>
      </div>
    </form>
  </div>
</template>

<script>
import UserAPI from "@/services/UserAPI.js";
import SectionAPI from "@/services/SectionAPI.js";
import Courses from "../Course/Courses";

export default {
  name: "EditUser",
  components: {
    Courses
  },
  data() {
    return {
      user: {},
      instructor_courses: [],
      sections: [],
      section_instructors_have_loaded: false,
      section_courses_have_loaded: false
    };
  },
  created() {
    this.getCurrentUser();
    this.getInstructorCourses();
  },
  methods: {
    async getCurrentUser() {
      let user_id = this.$route.params.id;
      const response = await UserAPI.getUser(user_id);
      this.user = response.data;
      if (!this.user.is_instructor) this.getSections();
    },
    async getSections() {
      let user_id = this.$route.params.id;
      const response = await UserAPI.getStudentSections(user_id);
      this.sections = response.data;
      this.getInstructorForSections();
      this.getCourseForSections();
    },
    async getInstructorForSections() {
      let counter = 0;
      this.sections.forEach(async section => {
        const response = await SectionAPI.getInstructor(section._id);
        section.instructor = response.data;
        counter++;
        if (counter == this.sections.length)
          this.section_instructors_have_loaded = true;
      });
    },
    async getCourseForSections() {
      let counter = 0;
      this.sections.forEach(async section => {
        const response = await SectionAPI.getCourse(section._id);
        section.course = response.data;
        counter++;
        if (counter == this.sections.length)
          this.section_courses_have_loaded = true;
      });
    },
    async updateUser() {
      let user_id = this.$route.params.id;
      const response = await UserAPI.updateUser(user_id, this.user);
      this.$router.push({ name: "users" });
    },
    async getInstructorCourses() {
      let user_id = this.$route.params.id;
      const response = await UserAPI.getInstructorCourses(user_id);
      this.instructor_courses = response.data;
    }
  }
};
</script>
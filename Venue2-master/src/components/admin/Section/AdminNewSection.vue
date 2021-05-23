<template>
  <div>
    <h2>Create A Section</h2>
    <form @submit.prevent="addSection">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>course:</label>
            <input
              type="text"
              class="form-control"
              v-model="course.name"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>instructors:</label>
            <input
              v-for="instructor in instructors"
              class="form-control"
              :value="instructor.first_name + ' ' + instructor.last_name"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>section's name:</label>
            <input type="text" class="form-control" v-model="section.name" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </form>

    <Courses v-on:select-course="selectCourse" />
  </div>
</template>

<script>
import SectionAPI from "@/services/SectionAPI.js";
import UserAPI from "@/services/UserAPI.js";
import CourseAPI from "@/services/CourseAPI.js";
import Courses from "@/components/admin/Course/Courses";
import Instructors from "@/components/admin/User/Instructors";
import AdminSections from "@/components/admin/Section/AdminSections";

export default {
  name: "AdminNewSection",
  components: {
    Instructors,
    Courses,
    AdminSections
  },
  data() {
    return {
      section: {},
      course: {},
      instructors: {}
    };
  },
  created() {},
  methods: {
    async addSection(evt) {
      evt.preventDefault(); // prevents the form's default action from redirecting the page
      this.section.course = this.course._id;
      const response = await SectionAPI.addSection(this.section);
      this.$router.push({ name: "admin_sections" });
    },
    selectCourse(course) {
      this.course = course;
      if (
        typeof this.course.instructors !== "undefined" &&
        this.course.instructors !== null
      )
        this.instructors = this.course.instructors;
    }
  }
};
</script>

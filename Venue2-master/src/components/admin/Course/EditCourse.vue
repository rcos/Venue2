<template>
  <div>
    <h2>Edit Course</h2>
    <form @submit.prevent="updateCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>name</label>
            <input type="text" class="form-control" v-model="course.name" />
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>dept</label>
            <input class="form-control" v-model="course.prefix" rows="5" />
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>number</label>
            <input class="form-control" v-model="course.suffix" rows="5" />
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>instructors</label>
            <input
              v-for="(instructor, i) in instructors"
              :key="i"
              class="form-control"
              :value="instructor.first_name + ' ' + instructor.last_name"
              rows="5"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>
    <label>Add instructors by email</label>
    <input type="text" v-model="instructors_to_add" />
    <button @click="addInstructorsToCourse()">Update</button>
  </div>
</template>

<script>
import CourseAPI from "@/services/CourseAPI.js";
import UserAPI from "@/services/UserAPI.js";
import Instructors from "../User/Instructors";

export default {
  name: "EditCourse",
  components: {
    Instructors
  },
  data() {
    return {
      course: {},
      instructors: [],
      instructors_to_add: ""
    };
  },
  created() {
    this.getCurrentCourse();
  },
  methods: {
    async getCurrentCourse() {
      let course_id = this.$route.params.id;
      const response = await CourseAPI.getCourse(course_id);
      this.course = response.data;
      this.getCurrentCourseInstructor();
    },
    async getCurrentCourseInstructor() {
      const response = await UserAPI.getInstructorsForCourse(this.course._id);
      if (response.data) this.instructors = response.data;
    },
    async updateCourse() {
      let course_id = this.$route.params.id;
      this.course.instructors = this.instructors.map(a => a._id);
      const response = await CourseAPI.updateCourse(course_id, this.course);
      this.$router.push({ name: "courses" });
    },
    addInstructorsToCourse() {
      let insts = this.instructors_to_add.split(",");
      if (insts.length) {
        CourseAPI.addInstructors(this.course._id, insts).then(res => {
          location.reload();
        });
      }
    }
  }
};
</script>

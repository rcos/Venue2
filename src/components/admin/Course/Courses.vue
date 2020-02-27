<template>
  <div>
    <h2>Courses</h2>
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
              <td v-if="course.instructor">{{ course.instructor.first_name }} {{ course.instructor.last_name }}</td>
              <div v-if="is_course_view">
                <td><router-link :to="{name: 'editCourse', params: { id: course._id }}" class="btn btn-primary">Edit</router-link></td>
                <td><button class="btn btn-danger" @click.prevent="deleteCourse(course._id)">Delete</button></td>
              </div>
              <td v-else><button class="btn btn-secondary" @click.prevent="$emit('select-course', course)">Select</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';

  export default {
    name: 'Courses',
    data(){
      return {
        courses: [],
        is_course_view: Boolean
      }
    },
    created() {
      this.loadCourses()
      this.setIsCourseView()
    },
    methods: {
      async loadCourses () {
        const response = await CourseAPI.getCourses()
        this.courses = response.data
        this.getInstructorsForCourses()
      },
      async getInstructorsForCourses(){
        this.courses.forEach(async course => {
          const response = await CourseAPI.getInstructor(course._id)
          course.instructor = response.data
        })
      },
      async deleteCourse(id){
        const response = await CourseAPI.deleteCourse(id);
        this.courses.splice(this.courses.findIndex(i => i._id == id), 1)
      },
      setIsCourseView() {
        this.is_course_view = this.$router.currentRoute.name === "courses"
      }
    }
  }
</script>
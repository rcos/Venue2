<template>
  <div>
    <h2>Create A Section</h2>
    <form @submit.prevent="addSection">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>course:</label>
            <input type="text" class="form-control" v-model="course.name" readonly>
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
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>section_number:</label>
            <input type="number" class="form-control" v-model="section.number">
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </form>

    <Courses v-bind:is_course_view="false" v-on:select-course="selectCourse" />

    <Instructors v-on:select-instructor="selectInstructor" />

    <h2>New Students</h2>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>title</th>
          <th>section course</th>
          <th>section number</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="student in new_students" :key="student._id">
              <td>{{  }}</td>
              <td>{{ event.section.course.name }}</td>
              <td>{{ event.section.section_number }}</td>
            </tr>
        </tbody>
    </table>


    <h2>Events</h2>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>title</th>
          <th>section course</th>
          <th>section number</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="event in section.events" :key="event._id">
              <td>{{ event.title }}</td>
              <td>{{ event.section.course.name }}</td>
              <td>{{ event.section.section_number }}</td>
            </tr>
        </tbody>
    </table>

    <div class="form-group">
      <button class="btn btn-primary">Create</button>
    </div>

    <Sections />
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js';
  import UserAPI from '@/services/UserAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';
  import Courses from '../Course/Courses'
  import Instructors from '../User/Instructors';
  import Sections from '../Section/Sections';

  export default {
    name: 'AdminSection',
    components: {
      Instructors,
      Courses,
      Sections
    },
    data(){
      return {
        section: {},
        sections: [],
        courses: [],
        students: [],
        new_students: [],
        course: {},
        instructor: {}
      }
    },
    created() {
      this.loadSections()
      this.loadCourses()
    },
    methods: {
      async loadSections () {
        const response = await SectionAPI.getSections()
        this.sections = response.data
      },
      async loadCourses(){
        const response = await CourseAPI.getCourses(0, 10)
        if (response.success) {
          this.courses = response.data.courses
        }
      },
      async addSection(evt){
        evt.preventDefault() // prevents the form's default action from redirecting the page
        this.section.instructor = this.instructor
        this.section.course = this.course
        const response = await SectionAPI.addSection(this.section)
        this.sections.push(response.data);
        this.section = {} // clear the input field
        this.course = {}
        this.instructor = {}
      },
      selectCourse(course){
        this.course = course
      },
      selectInstructor(instructor){
        this.instructor = instructor
      }
    }
  }
</script>

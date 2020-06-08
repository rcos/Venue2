<template>
  <div>
    <h2>Edit Section</h2>
    <form @submit.prevent="updateSection">
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
            <button class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </form>

    <h4>Section Students</h4>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>is_instructor</th>
          <th>is_ta</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="student in students" :key="student._id">
              <td>{{ student.first_name }}</td>
              <td>{{ student.last_name }}</td>
              <td>{{ student.is_instructor }}</td>
              <td>{{ student.is_ta }}</td>
              <td><button class="btn btn-danger" @click.prevent="removeStudent(student)">Remove</button></td>
              <!-- <td v-if="is_section_view"><button class="btn btn-secondary" @click.prevent="$emit('select-student', student)">Select</button></td> -->
            </tr>
        </tbody>
    </table>

    <Students v-on:select-student="addStudent" v-bind:is_section_view="true" />

  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js';
  import Courses from '../Course/Courses';
  import Instructors from '../User/Instructors';
  import Students from '../User/Students';

  export default {
    name: 'AdminEditSection',
    components: {
      Courses,
      Instructors,
      Students
    },
    data(){
      return {
        section: {},
        course: {},
        instructor: {},
        students: [],
        new_students: []
      }
    },
    created() {
      this.getCurrentSection()
    },
    methods: {
      //TODO: Change to getSection
      async getCurrentSection(){
        let section_id = this.$route.params.id
        const response = await SectionAPI.getSection(section_id)
        this.section = response.data
        this.getCurrentSectionInstructor()
        this.getCurrentSectionCourse()
        this.getCurrentSectionStudents()
      },
      async getCurrentSectionInstructor(){
        const response = await SectionAPI.getInstructor(this.section._id)
        this.instructor = response.data
      },
      async getCurrentSectionCourse(){
        const response = await SectionAPI.getCourse(this.section._id)
        this.course = response.data
      },
      async getCurrentSectionStudents(){
        const response = await SectionAPI.getStudents(this.section._id)
        this.students = response.data
      },
      addStudent(student){
        if(!this.students.includes(student))
          this.students.push(student)
      },
      removeStudent(student){
        this.students.splice(this.students.indexOf(student),1)
      },
      async updateSection() {
        let section_id = this.$route.params.id
        this.section.course = this.course
        this.section.students = this.students
        const response = await SectionAPI.updateSection(section_id, this.section)
        this.$router.push({name: 'admin_sections'})
      }
    }
  }
</script>
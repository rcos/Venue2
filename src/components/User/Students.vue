<template>
  <div>
    <h2>Students</h2>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="student in students" :key="student._id">
              <td>{{ student.first_name }}</td>
              <td>{{ student.last_name }}</td>
              <td><button class="btn btn-secondary" @click.prevent="$emit('select-student', student)">Select</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'Students',
    data(){
      return {
        students: []
        // is_student_view: false
      }
    },
    created() {
      this.loadStudents()
      // this.setStudentView()
    },
    methods: {
      async loadStudents(){
        const response = await UserAPI.getStudents()
        this.students = response.data
      }
      // setStudentView() {
      //   this.is_student_view = this.$router.currentRoute.name === "students"
      // }
    }
  }
</script>
<template>
  <div>
    <h2>Students</h2>
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
              <td v-if="is_section_view"><button class="btn btn-secondary" @click.prevent="$emit('select-student', student)">Select</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'Students',
    props: ["is_section_view"],
    data(){
      return {
        students: []
      }
    },
    created() {
      this.loadStudents()
    },
    methods: {
      async loadStudents(){
        const response = await UserAPI.getStudents()
        this.students = response.data
      }
    }
  }
</script>
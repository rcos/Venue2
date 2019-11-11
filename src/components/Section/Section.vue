<template>
  <div>
<!--     <h1>Create A Section</h1>
    <form @submit.prevent="addSection">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>course:</label>
            <input type="text" class="form-control" v-model="section.course.name" readonly>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>instructor:</label>
            <input class="form-control" v-model="section.instructor.first_name" readonly>
            <input class="form-control" v-model="section.instructor.last_name" readonly>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>section_number:</label>
            <input type="number" class="form-control" v-model="section.section_number">
          </div>
        </div>
      </div>
      <h1>Students</h1>
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
              <tr v-for="student in section.students" :key="student._id">
                <td>{{ student.first_name }}</td>
                <td>{{ student.last_name }}</td>
                <td>{{ student.is_instructor }}</td>
                <td>{{ student.is_ta }}</td>
              </tr>
          </tbody>
      </table>
      <h1>Teaching Assistants</h1>
      <table class="table table-hover">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="ta in section.teaching_assistants" :key="ta._id">
                <td>{{ ta.first_name }}</td>
                <td>{{ ta.last_name }}</td>
              </tr>
          </tbody>
      </table>
      <h1>Events</h1>
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
    </form> -->

    <!-- SHOWING SECTIONS -->
    <h1>Sections</h1>
    <div v-for="section in sections" :key="section._id">
      <h2>Section {{  section.number }}, {{ section.course.dept }} {{ section.course.name }}</h2>
    
<!--       <table class="table table-hover">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>is_instructor</th>
            <th>is_ta</th>
          </tr>
          </thead>
          <tbody>
              <tr v-for="section in sections" :key="section._id">
                <td>{{ section.first_name }}</td>
                <td>{{ section.last_name }}</td>
                <td>{{ section.is_instructor }}</td>
                <td>{{ section.is_ta }}</td>
                <td><router-link :to="{name: 'editSection', params: { id: section._id }}" class="btn btn-primary">Edit</router-link></td>
                <td><button class="btn btn-danger" @click.prevent="deleteSection(section._id)">Delete</button></td>
              </tr>
          </tbody>
      </table> -->
    </div>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js';
  import UserAPI from '@/services/UserAPI.js';


  export default {
    data(){
      return {
        section:{},
        sections: []
      }
    },
    created() {
      this.loadSections();
    },
    methods: {
      async loadSections () {
        const response = await SectionAPI.getSections();
        this.sections = response.data;
      },
      async addSection(evt){
        evt.preventDefault(); // prevents the form's default action from redirecting the page
        const response = await SectionAPI.addSection(this.section);
        this.sections.push(response.data);
        this.section = {}; // clear the input field
      },
      async deleteSection(id){
        const response = await SectionAPI.deleteSection(id);
        this.sections.splice(this.sections.findIndex(i => i._id == id), 1);
      }
    }
  }
</script>
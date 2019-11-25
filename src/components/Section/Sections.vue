<template>
  <div>
    <!-- SHOWING SECTIONS -->
    <h2>Sections</h2>
    <table class="table table-hover">
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
              <td><router-link :to="{name: 'editSection', params: { id: section._id }}" class="btn btn-primary">Edit</router-link></td>
              <td><button class="btn btn-danger" @click.prevent="deleteSection(section._id)">Delete</button></td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js';

  export default {
    name: 'Sections',
    data(){
      return {
        sections: []
      }
    },
    created() {
      this.loadSections()
    },
    methods: {
      async loadSections () {
        const response = await SectionAPI.getSections()
        this.sections = response.data
        this.getInstructorsForSections()
        this.getCourseForSections()
      },
      async getInstructorsForSections(){
        this.sections.forEach(async section => {
            const response = await SectionAPI.getInstructor(section._id)
            section.instructor = response.data
        })
      },
      async getCourseForSections(){
        this.sections.forEach(async section => {
            const response = await SectionAPI.getCourse(section._id)
            section.course = response.data
        })
      },
      async deleteSection(id){
        const response = await SectionAPI.deleteSection(id);
        this.sections.splice(this.sections.findIndex(i => i._id == id), 1);
      },      
    }
  }
</script>
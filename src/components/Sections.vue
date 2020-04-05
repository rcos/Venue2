<template>
  <div>
    <h2>Select a Section</h2>
    <table class="table table-hover">
        <thead>
        <tr>
          <th>section number</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="section in sections" :key="section._id">
            <td>Section {{ section.number }}</td>
            <div v-if="is_section_view">
              <td><router-link :to="{name: 'editSection', params: { id: section._id }}" class="btn btn-primary">Edit</router-link></td>
              <td><button class="btn btn-danger" @click.prevent="deleteSection(section._id)">Delete</button></td>
            </div>
            <td v-else><button class="btn btn-secondary" @click.prevent="$emit('select-section', section)">Select</button></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js';

  export default {
    name: 'Sections',
    props: {
      sections: []
    },
    data(){
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
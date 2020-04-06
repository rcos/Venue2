<template>
  <div>
    <h2>Select a Section</h2>
    <div class="section-container" v-for="section in sections">
      Section {{ section.number }}
      <button @click.prevent="$emit('select-section', section)">Select</button>
    </div>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js';

  export default {
    name: 'Sections',
    props: {
      sections: Array
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

<style type="text/css">
  .section-container {
    border: black solid;
    width: 30%;
    margin: auto;
    border: thin solid;
    border-radius: 3px;
    border-color: #bfbfbf;
  }
</style>
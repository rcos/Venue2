<template>
  <div class="">
    <ClassList :classInfo='classes' />
  </div>
</template>

<script>
  import ClassList from './ClassList.vue'

  export default {
    name: 'StudentClasses',
    components: {
      ClassList
    },
    data() {
      return {
        classes: [
          {
            name: "Data Structures 3",
            courseCode: "CSCI 5000",
            time: 600,
            duration: 120
          },{
            name: "Intro to AI",
            courseCode: "CSCI 4020",
            time: 780,
            duration: 120
          },{
            name: "Gender Studies",
            courseCode: "HASS 3050",
            time: 960,
            duration: 120
          },{
            name: "Technological Sentience",
            courseCode: "STSS 4100",
            time: 1200,
            duration: 120
          }
        ]
      }
    }
  }
</script>

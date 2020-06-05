<template>
  <div id="lecture-info-section">
    <h1>{{lecture.title}} Info</h1>

  </div>
</template>

<script>

  export default {
    name: 'LectureInfoHeader',
    props: {
      lecture: Object
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

<style scoped>

</style>
<template>
  <div>
    <h1>I'm the lecture list</h1>
    <LectureCard />
  </div>
</template>

<script>
  import LectureCard from '@/components/LectureCard.vue'

  export default {
    name: 'LectureList',
    props: {
      lecture_type: String
    },
    computed: {
    },
    components: {
      LectureCard
    },
    data(){
      return {
      }
    },
    methods: {

    }
  }
</script>

<style scoped>


</style>

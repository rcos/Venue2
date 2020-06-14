<template>
  <div class="lecture-list">
    <LectureCard :lecture_type="lecture_type" />
    <LectureCard :lecture_type="lecture_type" />
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
  .lecture-list {
    /*border: green solid;*/
    height: 100%;
    width: 85%;
    margin: auto;
  }

  /*Ipad & below*/
  @media only screen and (max-width: 800px) {
    .lecture-list {
      width: 100%;
    }
  }
</style>

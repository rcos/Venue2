<template>
  <div class="lecture-list">
    <LectureCard v-for="lecture in lecture_list" :lecture_type="lecture_type" :key="lecture._id" />
  </div>
</template>

<script>
  import LectureCard from '@/components/LectureCard.vue'

  export default {
    name: 'LectureList',
    props: {
      lecture_type: String,
      lecture_list: Array
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
    created() {
      console.log("Lecture List", this.lecture_list)
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
    overflow-y: auto;
  }

  /*Ipad & below*/
  @media only screen and (max-width: 800px) {
    .lecture-list {
      width: 100%;
    }
  }
</style>

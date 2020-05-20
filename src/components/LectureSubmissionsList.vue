<template>
  <div>
    <h3>Submissions {{ lecture_submissions.length }}</h3>
  </div>
</template>

<script>
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';

  export default {
    name: 'LectureInfo',
    props: {
      lecture_id: String
    },
    computed: {
    },
    components: {
    },
    data(){
      return {
        lecture_submissions: []
      }
    },
    created() {
      this.getLectureSubmissionsForLecture()
    },
    methods: {
      async getLectureSubmissionsForLecture() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForLecture(this.lecture_id)
        this.lecture_submissions = response.data
      },
    }
  }
</script>

<style scoped>
</style>
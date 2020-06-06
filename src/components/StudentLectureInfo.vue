<template>
  <div>
    <LectureInfoHeader v-bind:lecture="lecture" v-bind:is_instructor="false" />
  </div>
</template>

<script>
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import LectureInfoHeader from '@/components/LectureInfoHeader.vue';

  export default {
    name: 'StudentLectureInfo',
    props: {
      lecture: Object,
      is_instructor: Boolean
    },
    components: {
      LectureInfoHeader
    },
    data(){
      return {
        live_submissions: [],
        playback_submissions: [],
        absent: [],
        lecture_is_upcoming: Boolean,
        lecture_is_live: Boolean,
        lecture_is_over: Boolean,
        show_checkin_qr: -1,
        self_submission_count: 0,
        student_lecture_submissions: []
      }
    },
    created() {
      this.lecture_id = this.lecture._id
      this.getStudentLectureSubmissions()
    },
    methods: {
      async getStudentLectureSubmissions() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForStudent(this.lecture_id,this.user_id)
        this.student_lecture_submissions = response.data 
      },
    }
  }
</script>

<style scoped>

</style>
<template>
  <div class="student-lecture-submission-card">
    <div class="spinner-border" role="status" v-if="!lecture_submission_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <div v-if="lecture_submission">
        <h3>Submission</h3>
        <p>video progress: {{ lecture_submission.video_progress }}</p>
        <p>poll answers: {{ lecture_submission.student_poll_answers }}</p>
        <p>live submission: {{ lecture_submission.is_live_submission }}</p>
      </div>
      <h3 v-else>No current submission</h3>
    </div>
  </div>
</template>

<script>
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';

  export default {
    name: 'StudentLectureSubmissionCard',
    props: {
      lecture_id: String
    },
    data(){
      return {
        lecture_submission: Object,
        lecture_submission_has_loaded: false
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.getLectureSubmissionForStudent()
    },
    methods: {
      async getLectureSubmissionForStudent() {
        const response = await LectureSubmissionAPI.getLectureSubmissionForStudent(this.lecture_id, this.current_user._id)
        this.lecture_submission = response.data
        this.lecture_submission_has_loaded = true
      },
    }
  }
</script>

<style scoped>
  .student-lecture-submission-card {
    margin-top: 1rem;
  }
</style>
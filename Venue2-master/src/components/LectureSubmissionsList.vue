<template>
  <div class="lecture-submission-list">
    <h3>Submissions ({{ lecture_submissions.length }})</h3>
    <p v-for="submission in lecture_submissions">
      {{ submission.submitter.first_name }} {{ submission.submitter.last_name }}
    </p>
  </div>
</template>

<script>
import LectureSubmissionAPI from "@/services/LectureSubmissionAPI.js";

export default {
  name: "LectureSubmissionList",
  props: {
    lecture_id: String
  },
  computed: {},
  components: {},
  data() {
    return {
      lecture_submissions: []
    };
  },
  created() {
    this.getLectureSubmissionsForLecture();
  },
  methods: {
    async getLectureSubmissionsForLecture() {
      const response = await LectureSubmissionAPI.getLectureSubmissionsForLecture(
        this.lecture_id
      );
      this.lecture_submissions = response.data;
    }
  }
};
</script>

<style scoped>
.lecture-submission-list {
  margin-top: 1rem;
}
</style>

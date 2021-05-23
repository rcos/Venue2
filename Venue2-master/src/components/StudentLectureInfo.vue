<template>
  <div>
    <LectureInfoHeader v-bind:lecture="lecture" v-bind:is_instructor="false" />
    <SquareLoader role="status" v-if="!submission_loaded" />
    <StudentLectureAttendanceContainer
      v-else
      :lecture="lecture"
      :submission="submission"
      :polls="polls"
    />
  </div>
</template>

<script>
import LectureSubmissionAPI from "@/services/LectureSubmissionAPI.js";

import LectureInfoHeader from "@/components/LectureInfoHeader.vue";
import StudentLectureAttendanceContainer from "@/components/StudentLectureAttendanceContainer.vue";
import SquareLoader from "@/components/Loaders/SquareLoader.vue";

export default {
  name: "StudentLectureInfo",
  props: {
    lecture: Object,
    is_instructor: Boolean,
    polls: Array
  },
  components: {
    LectureInfoHeader,
    StudentLectureAttendanceContainer,
    SquareLoader
  },
  data() {
    return {
      submission: Object,
      submission_loaded: false
    };
  },
  async created() {
    this.lecture_id = this.lecture._id;
    this.user_id = this.$store.state.user.current_user._id;
    await this.getStudentLectureSubmission();
  },
  methods: {
    async getStudentLectureSubmission() {
      const response = await LectureSubmissionAPI.getOrMake(
        this.lecture_id,
        this.user_id
      );
      this.submission = response.data;
      this.submission_loaded = true;
    }
  }
};
</script>

<style scoped></style>

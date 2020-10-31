<template>
  <div>
    <LectureInfoHeader :lecture="lecture" :is_instructor="true" />
    <SquareLoader role="status" v-if="!submissions_loaded"/>
    <InstructorLectureAttendanceContainer v-else :lecture="lecture" :submissions="submissions" v-bind:all_students="all_students" />
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureInfoHeader from '@/components/LectureInfoHeader.vue';
  import InstructorLectureAttendanceContainer from '@/components/InstructorLectureAttendanceContainer.vue';

  import SquareLoader from "@/components/Loaders/SquareLoader.vue";

  export default {
    name: 'InstructorLectureInfo',
    props: {
      lecture: Object,
      is_instructor: Boolean,
    },
    components: {
      LectureInfoHeader,
      InstructorLectureAttendanceContainer,
      SquareLoader
    },
    data(){
      return {
        all_students: [],
        submissions: [],
        submissions_loaded: false
      }
    },
    async created() {
      this.lecture_id = this.lecture._id
      await this.getStudentsForLecture()
      this.getAttendanceForLecture()
    },
    methods: {
      async getStudentsForLecture() {
        const response = await UserAPI.getStudentsForLecture(this.lecture_id)
        this.all_students = response.data
      },
      async getAttendanceForLecture() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForLecture(this.lecture_id)
        this.submissions = response.data
        this.submissions_loaded = true
      }
    }
  }
</script>
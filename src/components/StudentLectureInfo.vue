<template>
  <div>
    <LectureInfoHeader v-bind:lecture="lecture" v-bind:is_instructor="false" />
    <div class="spinner-border" role="status" v-if="!attendance_calculated">
      <span class="sr-only">Loading...</span>
    </div>
    <StudentLectureAttendanceContainer v-else :lecture="lecture" :live_submissions="live_submissions" :playback_submissions="playback_submissions" :absent="absent" />
  </div>
</template>

<script>
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import LectureInfoHeader from '@/components/LectureInfoHeader.vue';
  import StudentLectureAttendanceContainer from '@/components/StudentLectureAttendanceContainer.vue';

  export default {
    name: 'StudentLectureInfo',
    props: {
      lecture: Object,
      is_instructor: Boolean
    },
    components: {
      LectureInfoHeader,
      StudentLectureAttendanceContainer
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
        student_lecture_submissions: [],
        attendance_calculated: false
      }
    },
    async created() {
      this.lecture_id = this.lecture._id
      this.user_id = this.$store.state.user.current_user._id
      await this.getStudentLectureSubmissions()
      this.getAttendanceForLecture()
    },
    methods: {
      async getStudentLectureSubmissions() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForStudent(this.lecture_id,this.user_id)
        this.student_lecture_submissions = response.data
      },
      async getAttendanceForLecture() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForLecture(this.lecture_id)
        let lecture_submissions = response.data
        this.student_lecture_submissions.forEach(submission => {
          if(submission.is_live_submission)
            this.live_submissions.push(submission)
          else
            this.playback_submissions.push(submission)
        })
        this.attendance_calculated = true
      }
    }
  }
</script>

<style scoped>

</style>
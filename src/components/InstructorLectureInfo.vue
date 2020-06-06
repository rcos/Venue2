<template>
  <div>
    <LectureInfoHeader :lecture="lecture" :is_instructor="true" />
    <InstructorLectureAttendanceTable :lecture="lecture" />
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureInfoHeader from '@/components/LectureInfoHeader.vue';
  import InstructorLectureAttendanceTable from '@/components/InstructorLectureAttendanceTable.vue';

  export default {
    name: 'InstructorLectureInfo',
    props: {
      lecture: Object,
      is_instructor: Boolean
    },
    components: {
      LectureInfoHeader,
      InstructorLectureAttendanceTable
    },
    data(){
      return {
        all_students: [],
        live_submissions: [],
        playback_submissions: [],
        absent: [],
        show_checkin_qr: -1
      }
    },
    created() {
      console.log("In InstructorLectureInfo. Received Lecture",this.lecture)
      this.lecture_id = this.lecture._id
      this.getStudentsForLecture()
      this.getAttendanceForLecture()
    },
    methods: {
      async getStudentsForLecture() {
        const response = await UserAPI.getStudentsForLecture(this.lecture_id)
        this.all_students = response.data
      },
      async getAttendanceForLecture() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForLecture(this.lecture_id)
        let lecture_submissions = response.data
        for(let i=0;i<this.all_students.length;i++) {
          let did_attend = false;
          for(let j=0;j<lecture_submissions.length;j++) {
            let subID = lecture_submissions[j].submitter._id
            if(this.all_students[i]._id == subID) {
              if(lecture_submissions[j].is_live_submission) {
                this.live_submissions[subID] = this.live_submissions[subID] || [];
                this.live_submissions[subID].push(lecture_submissions[j]);
              } else {
                this.playback_submissions.push(lecture_submissions[j])
              }
              did_attend = true;
            }
          }
          if(!did_attend) {
            this.absent.push(this.all_students[i])
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>
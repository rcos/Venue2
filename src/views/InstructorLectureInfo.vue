<template>
  <div>
    <div class="spinner-border" role="status" v-if="!lecture_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <LectureInfoHeader v-bind:lecture="lecture" v-bind:is_instructor="true" />
    </div>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureInfoHeader from '@/components/LectureInfoHeader.vue';

  export default {
    name: 'InstructorLectureInfo',
    components: {
      LectureInfoHeader
    },
    data(){
      return {
        lecture: {},
        all_students: [],
        live_submissions: [],
        playback_submissions: [],
        absent: [],
        lecture_has_loaded: false,
        lecture_is_upcoming: Boolean,
        lecture_is_live: Boolean,
        lecture_is_over: Boolean,
        show_checkin_qr: -1
      }
    },
    created() {
      this.lecture_id = this.$route.params.lecture_id
      this.getLecture()
      this.setLectureStatus()
      this.getStudentsForLecture()
      this.getAttendanceForLecture()
      this.setLectureStatus()
    },
    methods: {
      async getLecture() {
        const response = await LectureAPI.getLectureWithSectionsAndCourse(this.lecture_id)
        this.lecture = response.data
        this.lecture_has_loaded = true
      },
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
      setLectureStatus() {
        let current_time = Date.now()
        let lecture_start_time = new Date(this.lecture.start_time)
        let lecture_end_time = new Date(this.lecture.end_time)
        let lecture_playback_submission_start_time = new Date(this.lecture.playback_submission_start_time)
        let lecture_playback_submission_end_time = new Date(this.lecture.playback_submission_end_time)
        if(undefined == this.lecture.start_time || undefined == this.lecture.end_time) {
          this.lecture_is_over = true
        }
        if(current_time < lecture_start_time || current_time < lecture_playback_submission_start_time) 
          this.lecture_is_upcoming = true
        else if(current_time >= lecture_start_time && current_time <= lecture_end_time){
          this.lecture_is_live = true
          this.setSubmissionWindowStatus()
        }
        else
          this.lecture_is_over = true
      },
      setSubmissionWindowStatus() {
        let current_time = Date.now()
        for(let i=0;i<this.lecture.checkins.length;i++) {
          let start = new Date(this.lecture.checkins[i].start_time)
          let end = new Date(this.lecture.checkins[i].end_time)
          console.log(current_time-start,end-current_time)
          let self = this
          if(current_time < end) {
            if(start < current_time) {
              this.show_checkin_qr = i
            } else {
              setTimeout(function() {
                self.show_checkin_qr = i
              }, start-current_time);
            }
            setTimeout(function() {
              self.show_checkin_qr = -1
            }, end-current_time);
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
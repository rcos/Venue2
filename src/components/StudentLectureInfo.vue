<template>
  <div>
    <div class="spinner-border" role="status" v-if="!lecture_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <LectureInfoHeader v-bind:lecture="lecture" v-bind:is_instructor="false" />
    </div>
  </div>
</template>

<script>
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import LectureInfoHeader from '@/components/LectureInfoHeader.vue';

  export default {
    name: 'StudentLectureInfo',
    components: {
      LectureInfoHeader
    },
    data(){
      return {
        lecture: {},
        live_submissions: [],
        playback_submissions: [],
        absent: [],
        lecture_has_loaded: false,
        lecture_is_upcoming: Boolean,
        lecture_is_live: Boolean,
        lecture_is_over: Boolean,
        show_checkin_qr: -1,
        self_submission_count: 0,
        student_lecture_submissions: []
      }
    },
    created() {
      this.lecture_id = this.$route.params.lecture_id
      this.getLecture()
      this.getStudentLectureSubmissions()
      this.setLectureStatus()
    },
    methods: {
      async getLecture() {
        const response = await LectureAPI.getLectureWithSectionsAndCourse(this.lecture_id)
        this.lecture = response.data
        this.lecture_has_loaded = true
      },
      async getStudentLectureSubmissions() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForStudent(this.lecture_id,this.user_id)
        this.student_lecture_submissions = response.data 
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
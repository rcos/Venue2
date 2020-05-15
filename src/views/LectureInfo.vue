<template>
  <div>
    I'm the lecture info view

  </div>
</template>

<script>
  import LectureAPI from '@/services/LectureAPI.js';
  import QRCode from "qrcode";
  import QRScanner from "qr-code-scanner";
  import LectureUploadModal from "../components/LectureUploadModal";

  export default {
    name: 'LectureInfo',
    props: {
    },
    computed: {
    },
    components: {
      LectureUploadModal
    },
    data(){
      return {
        lecture: {},
        is_instructor: Boolean,
        lecture_has_loaded: false,
        lecture_is_pending: false,
        lecture_is_active: false,
        lecture_is_over: false,
        submission_window_pending: false,
        submission_window_ongoing: false,
        submission_window_closed: false
      }
    },
    created() {
      // this.getLecture()
      this.is_instructor = this.$store.state.user.current_user.is_instructor
    },
    methods: {
      async getLecture() {
        let lecture_id = this.$route.params.lecture_id
        const response = await LectureAPI.getLectureWithSectionAndCourse(lecture_id)
        this.lecture = response.data
        this.lecture_has_loaded = true
        this.setLectureStatus()
        if(this.is_instructor && this.lecture_is_active && this.submission_window_ongoing){
          this.$nextTick(function() {
            this.showQR(this.lecture.code)
          });
        }
      },
      setLectureStatus() {
        let current_time = new Date()
        let lecture_start_time = new Date(this.lecture.start_time)
        let lecture_end_time = new Date(this.lecture.end_time)
        if(current_time <= lecture_start_time) 
          this.lecture_is_pending = true
        else if(current_time >= lecture_start_time && current_time <= lecture_end_time){
          this.lecture_is_active = true
          this.setSubmissionWindowStatus()
        }
        else
          this.lecture_is_over = true
      },
      setSubmissionWindowStatus() {
        let current_time = new Date()
        let submission_start_time = new Date(this.lecture.submission_start_time)
        let submission_end_time = new Date(this.lecture.submission_end_time)
        if(current_time < submission_start_time)
          this.submission_window_pending = true
        else if(current_time >= submission_start_time && current_time <= submission_end_time)
          this.submission_window_ongoing = true
        else
          this.submission_window_closed = true
      },
      showQR(qr_data) {
        let canvas = document.getElementById("qr_render_area")
        if (qr_data) {
          QRCode.toCanvas(canvas, qr_data, function(error) {
            if (error) console.error(error)
          });
        }
      },
      scanQR() {
        QRScanner.initiate({
          onResult: result => {
            let submission = {
              lecture: this.lecture,
              submitter: this.$store.state.user.current_user,
              time: Date(),
              code: result
            };
            SubmissionAPI.addSubmission(submission);
            console.log("ATTENDANCE CODE FOUND:", result);
          },
          onTimeout: () => {
            console.log("TIMEOUT: Could not find any QRCode");
          },
          timeout: 10000
        });
      }
    }
  }
</script>

<style scoped>
  .lecture-title {
    margin-top: 1rem;
  }

  .course-name {
    margin-top: 2rem;
  }

  .time-info-container {
    margin-top: 2rem;
  }

  .submission-status {
    margin-top: 3rem;
  }
</style>
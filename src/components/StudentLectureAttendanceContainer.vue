<template>
  <div>
    <!-- TODO: Check if student submitted already -->
    <div id="qr-scanning-container" v-if="qr_scanning_window_open">
      <button @click="qr_scanning_window_open = false" id="exit_preview_btn" tabindex="0" aria-label="Close QR Scanner">X</button>
      <qrcode-stream id="video_preview" @decode="checkForQRMatch"></qrcode-stream>
    </div>
    <div id="table-header">
      <h2>Attendance</h2>
      <button v-if="lectureIsOngoing()" @click="qr_scanning_window_open = true" class="header-btn btn btn-primary">
        <img src="@/assets/icons8-qr-code-50.png" width="60" alt="QR Code" aria-label="QR Code">
      </button>
      <router-link class="header-btn btn btn-secondary" v-else-if="lectureIsOver() && lecture.allow_playback_submissions" :to="{name: 'lecture_playback', params: { lecture_id: lecture._id }}">
        Watch Playback
      </router-link>
    </div>
    <LectureAttendanceTable :is_instructor="false" :lecture="lecture" :submissions="[submission]" />
    <AnswerPoll v-if="answering_poll" :poll="current_poll" @answer="handleAnswerPoll" @cancel="handleCancelPoll"/>
  </div>
</template>


<script>
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';

  import { QrcodeStream } from 'vue-qrcode-reader';
  import LectureAttendanceTable from "@/components/LectureAttendanceTable.vue";
  import AnswerPoll from '@/components/AnswerPoll.vue';

  export default {
    name: 'StudentLectureAttendanceContainer',
    props: {
      lecture: Object,
      submission: Object,
      polls: Array
    },
    components: {
      QrcodeStream,
      LectureAttendanceTable,
      AnswerPoll
    },
    data(){
      return {
        qr_scanning_window_open: false,
        student_can_submit_live: false,
        student_can_watch_playback: false,
        answering_poll: false,
        current_poll: null,
        current_code: ""
      }
    },
    created() {
      this.lectureIsOngoing()
    },
    methods: {
      lectureIsOngoing() {
        let now = Date.now()
        return (this.lecture.start_time && Date.parse(this.lecture.start_time) <= now && Date.parse(this.lecture.end_time) >= now)
      },
      lectureIsOver() {
        let now = Date.now()
				return (!this.lecture.end_time || Date.parse(this.lecture.end_time) < now)
			},
      getPollForCheckin(i) {
        return this.polls.find(a => a.checkin == i)
      },
      checkForQRMatch(scanned_str) {
        this.qr_scanning_window_open = false
        this.lecture.checkins.forEach((checkin,i) => {
          if(checkin.code === scanned_str) {
            if(!this.studentSubmittedToCheckin(checkin)) {
              this.current_code = scanned_str
              this.current_poll = this.getPollForCheckin(i)
              if(this.current_poll) {
                this.answering_poll = true
              } else {
                this.createLiveSubmission()
              }
            } else {
              alert("Already submitted for this check-in")
            }
          }
        })
      },
      async createLiveSubmission() {
        if(!this.submission.live_progress) {
          this.submission.live_progress = 0
        }
        this.submission.live_progress++
        this.submission.live_percent = this.submission.live_progress / this.lecture.checkins.length
        this.submission.live_submission_time = new Date()
        this.submission.codes.push(this.current_code)
        this.current_code = ""
        const response = await LectureSubmissionAPI.update(this.submission)
        alert("Live Submission Recorded")
        location.reload();
      },
      studentSubmittedToCheckin(checkin) {
        if(this.submission.codes) {
          return this.submission.codes.includes(checkin.code)
        } else {
          return false
        }
      },
      handleAnswerPoll(student_answers,code) {
        if(!this.submission.student_poll_answers) {
          this.submission.student_poll_answers = {}
        }
        this.submission.student_poll_answers[code] = student_answers
        this.current_poll = null
        this.answering_poll = false
        this.createLiveSubmission()
      },
      handleCancelPoll() {
        this.current_poll = null
        this.answering_poll = false
      }
    }
  }
</script>

<style scoped>
  #table-header {
    position: relative;
    top: 1.5rem;
    bottom: 0;
    text-align: left;
    /* padding-left: 5rem;
    padding-right: 5rem; */
  }

  #table-header h2 {
    display: inline-block;
  }

  .header-btn {
    display: inline-block;
    margin-left: 2rem;
  }

  .show-qr-btn {
    margin-left: 2rem;
  }

  .tab_btn h5 {
    color: gray;
  }

  .tab_btn.selected_tab {
    color: #0078c2;
    border-bottom: .2rem solid #0078c2;
  }

  .tab_btn.selected_tab h5 {
    color: #0078c2;
  }

  .tab_section {
    margin-top: 3rem;
    overflow-y: auto;
    height: 17rem;
    padding-bottom: 3rem;
  }

  .namecard-edging {
    display: inline-block;
    border-radius: .25rem;
    width: 12rem;
    height: 4rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  .namecard-edging.live-color {
    background: green;
  }

  .namecard-edging.playback-color {
    background: blueviolet;
  }

  .namecard-edging.absent-color {
    background: red;
  }

  .namecard {
    position: relative;
    background: white;
    text-align: center;
    border-radius: .25rem;
    top: 0.5rem;
    margin-left: 0.5rem;
    width: 11rem;
    height: 4rem;
    box-shadow: 0 5px 10px -1px gray;
    padding-top: 0.5rem;
    z-index: 100;
  }

  .hidden {
    display: none;
  }

  #qr-scanning-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: white;
  }
</style>
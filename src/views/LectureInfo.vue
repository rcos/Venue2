<template>
  <div>
    <!-- Lecture Headers -->
    <div class="spinner-border" role="status" v-if="!lecture_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <div id="lecture-info-container">
        <div v-if="show_qr_preview">
          <button @click="closeQRPreview" id="exit_preview_btn">X</button>
          <qrcode-stream id="video_preview" @decode="checkForQRMatch"></qrcode-stream>
        </div>
        <div id="lecture-info-section">
          <h1>{{lecture.title}} Info</h1>
          <show-at breakpoint="small">
            <!-- Mobile Start -->
            <div id="lecture-data">
              <div class="row main-info">
                <h3>{{lecture.sections[0].course.name}}</h3>
                <h5 class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</h5>
                <h5>Sections: <a class="section-numbers" v-for="(section,i) in lecture.sections" :key="i">{{ section.number }}</a></h5>
              </div>
              <div class="row">
                <h5>Start Time:<h6>{{new Date(lecture.start_time)}}</h6></h5>
              </div>
              <div class="row">
                <h5>Submission Start Time: <h6>{{new Date(lecture.submission_start_time)}}</h6></h5>
              </div>
              <div class="row">
                <h5>Submission End Time: <h6>{{new Date(lecture.submission_end_time)}}</h6></h5>
              </div>
              <div class="row">
                <h5>End Time: <h6>{{new Date(lecture.end_time)}}</h6></h5>
              </div>
            </div>
            <!-- Mobile End -->
          </show-at>
          <show-at breakpoint="mediumAndAbove">
            <!-- Not-mobile Start -->
            <div class="row" id="lecture-data">
              <div class="col main-info">
                <h3>{{lecture.sections[0].course.name}}</h3>
                <h5 class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</h5>
                <h5>Sections: <a class="section-numbers" v-for="(section,i) in lecture.sections" :key="i">{{ section.number }}</a></h5>
              </div>
              <div class="col">
                <h5>Start Time</h5>
                <h6>{{new Date(lecture.start_time)}}</h6>
              </div>
              <div class="col">
                <h5>Submission Start Time</h5>
                <h6>{{new Date(lecture.submission_start_time)}}</h6>
              </div>
              <div class="col">
                <h5>Submission End Time</h5>
                <h6>{{new Date(lecture.submission_end_time)}}</h6>
              </div>
              <div class="col">
                <h5>End Time</h5>
                <h6>{{new Date(lecture.end_time)}}</h6>
              </div>
            </div>
            <!-- Not-mobile End -->
          </show-at>
        </div>
        <div id="lecture-attendance-section">
          <h1>Attendance
              <button v-if="show_checkin_qr!=-1
                            && is_instructor" class="btn btn-secondary show-qr-btn" @click="showQR">
                Show QR
              </button>
              <LectureUploadModal v-if="Date.now() > new Date(lecture.end_time)
                                            && !lecture.video_ref.includes('.')
                                            && is_instructor" v-bind:lecture="lecture" :update_lecture="true"/>
              <button v-else-if="show_checkin_qr!=-1
                            && !is_instructor
                            && self_submission_count<=show_checkin_qr" class="btn btn-secondary scan-qr-btn" @click="showQRPreview">
                Attend this lecture
              </button>
              <router-link v-else-if="((Date.now() > new Date(lecture.end_time)) || (undefined == lecture.end_time))
                            && lecture.video_ref.includes('.')" :to="{name: 'lecture_playback', params: { lecture_id: lecture._id }}">
                <button class="btn btn-secondary watch-recording">Watch recording</button>
              </router-link>
          </h1>
          <div v-if="is_instructor">
            <div class="tabs">
              <button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)"><h5>Live ({{Object.keys(live_submissions).length}}/{{all_students.length}})</h5></button>
              <button id="playback_btn" class="tab_btn" @click="selectTab(1)"><h5>Playback ({{playback_submissions.length}}/{{all_students.length}})</h5></button>
              <button id="absent_btn" class="tab_btn" @click="selectTab(2)"><h5>Absent ({{absent.length}}/{{all_students.length}})</h5></button>
              <button id="stats_btn" class="tab_btn" @click="selectTab(3)"><h5>Statistics</h5></button>
            </div>
            <div v-if="selected_tab == 0" id="live_submit" class="tab_section">
              <div v-if="Object.keys(live_submissions).length > 0">
                <div class="namecard-edging live-color" v-for="(submission,i) in Object.keys(live_submissions)" :key="i">
                  <div class="namecard">
                    {{live_submissions[submission][0].submitter.first_name}} {{live_submissions[submission][0].submitter.last_name}}
                    {{live_submissions[submission][0].submitter.email}}
                    {{live_submissions[submission].length / lecture.checkins.length * 100}}%
                  </div>
                </div>
              </div>
              <div v-else>
                None
              </div>
            </div>
            <div v-if="selected_tab == 1" id="playback_submit" class="tab_section">
              <div v-if="playback_submissions.length > 0">
                <div class="namecard-edging playback-color" v-for="(submission,i) in playback_submissions" :key="i">
                  <div class="namecard">
                    {{submission.submitter.first_name}} {{submission.submitter.last_name}}
                    {{submission.submitter.email}}
                  </div>
                </div>
              </div>
              <div v-else>
                None
              </div>
            </div>
            <div v-if="selected_tab == 2" id="no_submit" class="tab_section">
              <div v-if="absent.length > 0">
                <div class="namecard-edging absent-color" v-for="(absentee,i) in absent" :key="i">
                  <div class="namecard">
                    {{absentee.first_name}} {{absentee.last_name}}
                    {{absentee.email}}
                  </div>
                </div>
              </div>
              <div v-else>
                None
              </div>
            </div>
            <div v-if="selected_tab == 3" id="stats" class="tab_section">
              Statistics
            </div>
          </div>
          <div v-else class="student_lecture_attendance_info">
            <div v-if="self_submission_count > 0">
              <div v-for="student_lecture_submission in student_lecture_submissions">
                <div v-if="student_lecture_submission.is_live_submission">
                  <p>Live submission was made {{ self_submission_count }} time(s)</p>
                  <p>Live submission time: {{ new Date(student_lecture_submission.live_submission_time) }}</p>
                </div>
                <div v-else>
                  <p>Playback Submission was made</p>
                  <ul>
                    <li v-for="answer in student_poll_answers">{{answer}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <p v-else>No Submission</p>
          </div>
        </div>
      </div>
    </div>
    <div id="qr_modal" class="hidden">
      <canvas id="qr_render_area" width="600px" height="600px"></canvas>
      <button id="close_qr_btn" @click="hideQR">Hide</button>
    </div>
  </div>
</template>

<script>
  import LectureAPI from '@/services/LectureAPI.js';
  import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js';
  import UserAPI from '@/services/UserAPI.js';
  import QRCode from "qrcode";
  import QRScanner from "qr-code-scanner";
  import LectureUploadModal from "@/components/LectureUploadModal";
  import LectureSubmissionsList from "@/components/LectureSubmissionsList.vue";
  import StudentLectureSubmissionCard from "@/components/StudentLectureSubmissionCard.vue";
  import {showAt, hideAt} from 'vue-breakpoints';
  import { QrcodeStream } from 'vue-qrcode-reader'

  export default {
    name: 'LectureInfo',
    props: {
    },
    computed: {
    },
    components: {
      LectureUploadModal,
      LectureSubmissionsList,
      StudentLectureSubmissionCard,
      showAt,
      hideAt,
      QrcodeStream
    },
    data(){
      return {
        lecture_has_loaded: false,
        lecture: {},
        student_lecture_submission: {},
        student_has_submitted: false,
        is_instructor: Boolean,
        selected_tab: 0,
        all_students: [],
        live_submissions: {},
        playback_submissions: [],
        absent: [],
        show_checkin_qr: -1,
        self_submission_count: 0,
        showing_qr: false,
        show_qr_preview: false,
        student_lecture_submissions: []
      }
    },
    created() {
      this.lecture_id = this.$route.params.lecture_id
      this.user = this.$store.state.user.current_user
      this.user_id = this.user._id
      this.is_instructor = this.user.is_instructor
      this.getLecture()
      if(this.is_instructor)
        this.getStudentsAndCalcAttendance()
      else
        this.getStudentLectureSubmissions()
    },
    methods: {
      async getLecture() {
        const response = await LectureAPI.getLectureWithSectionsAndCourse(this.lecture_id)
        this.lecture = response.data
        this.lecture_has_loaded = true
        this.setSubmissionWindowStatus()
      },
      async checkAttendance() {
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
              if(this.$store.state.user.current_user._id == subID) {
                this.self_submission_count++
              }
            }
          }
          if(!did_attend) {
            this.absent.push(this.all_students[i])
          }
        }
      },
      async getStudentsAndCalcAttendance() {
        const response = await UserAPI.getStudentsForLecture(this.lecture_id)
        this.all_students = response.data
        this.checkAttendance()
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
      async getStudentLectureSubmissions() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForStudent(this.lecture_id,this.user_id)
        let lect_submissions = response.data
        this.self_submission_count = lect_submissions.length
        lect_submissions.forEach(submission => {
          this.addStudentLectureSubmission(submission)
        })
        // console.log("Got Student Lecture Submission",this.student_lecture_submission)
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
      },
      showQR() {
        QRCode.toCanvas(document.getElementById("qr_render_area"), this.lecture.checkins[this.show_checkin_qr].code, function(error) {
          if (error) console.error(error)
        });
        document.getElementById("qr_modal").classList.remove("hidden")
      },
      hideQR() {
        document.getElementById("qr_modal").classList.add("hidden")
      },
      showQRPreview() {
        this.show_qr_preview = true
      },
      closeQRPreview() {
        this.show_qr_preview = false
      },
      checkForQRMatch(scanned_str) {
        // Todo: check for actual code
        let lecture_codes = []
        this.lecture.checkins.forEach(check_in => {
          lecture_codes.push(check_in.code)
        })
        if(lecture_codes.includes(scanned_str)){
          console.log("Scanned Correct Code. Creating Live Submission")
          this.createLiveSubmission()
          this.closeQRPreview()
        } else {
          alert("Scanned incorrect code!")
        }
      },
      async createLiveSubmission() {
        // TODO
        // 1. Don't event show Attend this lecture button if submission window is not open
        // 2. Check if result matches lecture QR Code before submission
        let lecture_submission = {
          lecture: this.lecture,
          submitter: this.user,
          is_live_submission: true,
          live_submission_time: new Date()
        }
        console.log("Adding submission: ",lecture_submission)
        const response = await LectureSubmissionAPI.addLectureSubmission(lecture_submission)
        this.self_submission_count++
        this.addStudentLectureSubmission(lecture_submission)
        alert("Live Submission Recorded")
        console.log("Created Lecture Submission")
      },
      addStudentLectureSubmission(lecture_submission) {
        this.student_lecture_submissions.push(lecture_submission)
      },
      handleAttendanceOverride() {
        let names = document.getElementById("attendance_override").value.replace(/\s/g,'').split(",")
        for(let i=0;i<names.length;i++) {
          let name = names[i]
          LectureSubmissionAPI.addLiveSubmissionByRCS(name,this.lecture._id)
            .then(res => {
              console.log(res.data)
            }).catch(err => {
              console.log("Error creating submission for '"+name+"'")
            })
        }
      },
      selectTab(i) {
        let btns = [
          document.getElementById("live_btn"),
          document.getElementById("playback_btn"),
          document.getElementById("absent_btn"),
          document.getElementById("stats_btn")
        ]
        for(let j=0;j<btns.length;j++) {
          if(j==i) {
            btns[j].classList.add("selected_tab")
          } else {
            btns[j].classList.remove("selected_tab")
          }
        }
        this.selected_tab = i
      }
    }
  }
</script>

<style scoped>

  /* div {
    border: 1px solid black;
  } */

  #video_preview {
    /*height: 20rem;*/
    /*width: 20rem;*/
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
  }

  #exit_preview_btn {
    position: absolute;
    z-index: 2;
  }

  #lecture-info-container {
    text-align: left; 
    position: absolute;
    left: 9rem;
    right: 9rem;
    bottom: 3rem;
    top: 3rem;
  }

  #lecture-info-section {
    position: relative;
    border: black solid;
  }

  #lecture-attendance-section {
    position: relative;
    top: 3rem;
    bottom: 0;
  }

  #lecture-data {
    position: relative;
    text-align: center;
    margin-top: 3rem;
    margin-left: 3rem;
  }

  .row {
    position: relative;
    right: 1rem;
  }

  .show-qr-btn {
    margin-left: 2rem;
  }

  p {
    margin: 0;
  }

  h1 {
    /* position: absolute; */
    left: 0rem;
    right: 2rem;
  }

  h5 {
    color: black;
  }

  h6 {
    color: rgb(110, 110, 110);
  }

  .dept-and-number {
    background: black;
    color: white;
    border-radius: 1rem;
  }

  .tabs {
    margin-top: 3rem;
    margin-left: 3rem;
  }

  .col {
    margin: 0;
    padding: 0;
  }

  .tab_btn {
    background: none;
    outline: none;
    border: none;
    color: gray;
    margin-right: 3rem;
  }

  .tab_btn h5 {
    color: gray;
  }

  .tab_btn.selected_tab {
    color: blue;
    border-bottom: .2rem solid blue;
  }
  .tab_btn.selected_tab h5 {
    color: blue;
  }
  .tab_section {
    margin-top: 3rem;
    margin-left: 6rem;
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

  .custom-qr-scanner {
    margin: 0;
    position: 'fixed';
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  #qr_modal {
    position: fixed;
    border: 1px solid black;
    background: white;
    top: 25%;
    left: 25%;
    width: 50%;
    z-index: 100;
  }

  #qr_render_area {
    margin-bottom: 1rem;
  }

  #close_qr_btn {
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
  }

  .col.main-info {
    border-radius: .5rem;
    box-shadow: 0 5px 10px -1px gray;
    padding: 1rem;
  }

  .row.main-info {
    border-radius: .5rem;
    box-shadow: 0 5px 10px -1px gray;
    padding: 1rem;
    margin-right: 1rem;
  }

  .hidden {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    #lecture-info-container {
      left: 2rem;
      right: 2rem;
      margin-top: 1rem;
    }
    #lecture-data {
      left: 2rem;
      margin-top: 1rem;
      padding-right: 2rem;
    }
  }
</style>
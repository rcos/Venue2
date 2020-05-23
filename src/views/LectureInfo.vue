<template>
  <div>
    <!-- Lecture Headers -->
    <div class="spinner-border" role="status" v-if="!lecture_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <div id="lecture-info-container">
        <div id="lecture-info-section">
          <h1>{{lecture.title}} Info</h1>
          <div class="row" id="lecture-data">
            <div class="col main-info">
              <h3>{{lecture.sections[0].course.name}}</h3>
              <h5 class="dept-and-number">{{lecture.sections[0].course.dept}} {{lecture.sections[0].course.course_number}}</h5>
              <h5>Sections: <a class="section-numbers" v-for="(section,i) in lecture.sections" :key="i">{{ section.number }}</a></h5>
            </div>
            <div class="col">
              <h5>Start Time</h5>
              <h6>{{lecture.start_time}}</h6>
            </div>
            <div class="col">
              <h5>Submission Start Time</h5>
              <h6>{{lecture.submission_start_time}}</h6>
            </div>
            <div class="col">
              <h5>Submission End Time</h5>
              <h6>{{lecture.submission_end_time}}</h6>
            </div>
            <div class="col">
              <h5>End Time</h5>
              <h6>{{lecture.end_time}}</h6>
            </div>
          </div>
        </div>
        <div id="lecture-attendance-section">
          <h1>Attendance
              <button v-if="lecture.allow_live_submissions && is_instructor" class="btn btn-secondary show-qr-btn" @click="showQR">Show QR</button>
              <button v-if="lecture.allow_live_submissions && !is_instructor" class="btn btn-secondary scan-qr-btn" @click="scanQR">Attend this lecture</button>
          </h1>
          <div class="tabs">
            <button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)"><h5>Live ({{live_submissions.length}}/{{all_students.length}})</h5></button>
            <button id="playback_btn" class="tab_btn" @click="selectTab(1)"><h5>Playback ({{playback_submissions.length}}/{{all_students.length}})</h5></button>
            <button id="absent_btn" class="tab_btn" @click="selectTab(2)"><h5>Absent ({{absent.length}}/{{all_students.length}})</h5></button>
            <button id="stats_btn" class="tab_btn" @click="selectTab(3)"><h5>Statistics</h5></button>
          </div>
          <div v-if="selected_tab == 0" id="live_submit" class="tab_section">
            <div v-if="live_submissions.length > 0">
              <div class="namecard-edging live-color" v-for="(submission,i) in live_submissions" :key="i">
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
      </div>
      <!-- <h1 class="lecture-title">{{ lecture.title }}</h1>
      <h3 class="course-name">{{ lecture.sections[0].course.name }}</h3>
      <h5 class="section-numbers" v-for="section in lecture.sections">Section {{ section.number }}</h5>
      <div class="time-info-container">
        <h4 class="time-info">Start time: {{ new Date(lecture.start_time) }}</h4>
        <h4 class="time-info">End time: {{ new Date(lecture.end_time) }}</h4>
        <h4 class="time-info">Submission Start time: {{ new Date(lecture.submission_start_time) }}</h4>
        <h4 class="time-info">Submission End time: {{ new Date(lecture.submission_end_time) }}</h4>
      </div> -->
      <!-- Submission Info -->
      <!-- <div class="submission-status"> -->
        <!-- Instructor -->
        <!-- <div v-if="is_instructor">
          <div v-if="lecture_is_upcoming">
            <p>Lecture is upcoming</p>
          </div>
          <div v-else-if="lecture_is_live">
            <p>Lecture is live.</p>
            <p v-if="submission_window_pending">Submission Window pending</p>
            <div v-else-if="submission_window_open">
              <p>QR Code:</p>
              <LectureSubmissionsList v-bind:lecture_id="lecture_id" />
            </div>
            <div v-else>
              <p>Submission window closed</p>
              <LectureSubmissionsList v-bind:lecture_id="lecture_id" />
            </div>
          </div>
          <div v-else>
            <p v-if="lecture.allow_live_submissions">Lecture was live</p>
            <p v-else>Lecture was never live</p>
            <div v-if="lecture.allow_playback_submissions">
              <p>video_ref: {{ lecture.video_ref }}</p>
              <p>playback_submission_start_time: {{ new Date(lecture.playback_submission_start_time) }}</p>
              <p>playback_submission_end_time: {{ new Date(lecture.playback_submission_end_time) }}</p>
              <router-link :to="{name: 'lecture_playback', params: { lecture_id: lecture._id }}">
                <button>Video Playback</button>
              </router-link>
              <LectureSubmissionsList v-bind:lecture_id="lecture_id" />
            </div>
            <LectureUploadModal v-else v-bind:lecture="lecture" />
          </div> -->
          <!-- Give student a live submission -->
          <!-- <div id="attendance_override_section">
            <label>Mark as attended:</label>
            <input id="attendance_override" type="text" placeholder="RCS IDs separated by ','"> <button class="btn btn-primary" @click="handleAttendanceOverride">Submit</button>
          </div>
        </div> -->
        <!-- Student -->
        <!-- <div v-else>
          <div v-if="lecture_is_upcoming">
            <p>Lecture is upcoming</p>
          </div>
          <div v-else-if="lecture_is_live">
            <p>Lecture is ongoing.</p>
            <p v-if="submission_window_pending">Submission Window pending</p>
            <button v-else-if="submission_window_open" @click="scanQR">Scan Code</button>
            <p v-else>Submission window closed</p>
            <StudentLectureSubmissionCard v-bind:lecture_id="lecture_id" />
          </div>
          <div v-else>
            <p v-if="lecture.allow_live_submissions">Lecture was live</p>
            <p v-else>Lecture was never live</p>
            <div v-if="lecture.allow_playback_submissions"> -->
              <!-- TODO: Prevent students from viewing playback outside of the plabyack time -->
              <!-- <p>video_ref: {{ lecture.video_ref }}</p>
              <p>playback_submission_start_time: {{ new Date(lecture.playback_submission_start_time) }}</p>
              <p>playback_submission_end_time: {{ new Date(lecture.playback_submission_end_time) }}</p>
              <router-link :to="{name: 'lecture_playback', params: { lecture_id: lecture._id }}">
                <button>Video Playback</button>
              </router-link>
            </div>
            <p>No lecture playback</p>
            <StudentLectureSubmissionCard v-bind:lecture_id="lecture_id" />
          </div>
        </div>
      </div> -->
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

  export default {
    name: 'LectureInfo',
    props: {
    },
    computed: {
    },
    components: {
      LectureUploadModal,
      LectureSubmissionsList,
      StudentLectureSubmissionCard
    },
    data(){
      return {
        lecture: {},
        is_instructor: Boolean,
        lecture_has_loaded: false,
        lecture_is_upcoming: false,
        lecture_is_live: false,
        lecture_is_over: false,
        submission_window_pending: false,
        submission_window_open: false,
        submission_window_closed: false,
        selected_tab: 0,
        all_students: [],
        live_submissions: [],
        playback_submissions: [],
        absent: [],
        showing_qr: false
      }
    },
    created() {
      this.lecture_id = this.$route.params.lecture_id
      this.is_instructor = this.$store.state.user.current_user.is_instructor
      this.getLecture()
      this.getStudentsAndCalcAttendance()
    },
    methods: {
      async getLecture() {
        const response = await LectureAPI.getLectureWithSectionsAndCourse(this.lecture_id)
        this.lecture = response.data
        this.lecture_has_loaded = true
        this.setLectureStatus()
        if(this.is_instructor && this.lecture_is_live && this.submission_window_open){
          this.$nextTick(function() {
            // this.showQR(this.lecture.code)
          });
        }
      },
      async checkAttendance() {
        const response = await LectureSubmissionAPI.getLectureSubmissionsForLecture(this.lecture_id)
        let lecture_submissions = response.data
        console.log(lecture_submissions)
        console.log(this.all_students)
        for(let i=0;i<this.all_students.length;i++) {
          let did_attend = false;
          for(let j=0;j<lecture_submissions.length;j++) {
            if(this.all_students[i]._id == lecture_submissions[j].submitter._id) {
              if(lecture_submissions[j].is_live_submission) {
                this.live_submissions.push(lecture_submissions[j])
              } else {
                this.playback_submissions.push(lecture_submissions[j])
              }
              did_attend = true;
              j = lecture_submissions.length
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
        let current_time = new Date()
        let lecture_start_time = new Date(this.lecture.start_time)
        let lecture_end_time = new Date(this.lecture.end_time)
        let lecture_playback_submission_start_time = new Date(this.lecture.playback_submission_start_time)
        let lecture_playback_submission_end_time = new Date(this.lecture.playback_submission_end_time)
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
        let current_time = new Date()
        let submission_start_time = new Date(this.lecture.submission_start_time)
        let submission_end_time = new Date(this.lecture.submission_end_time)
        if(current_time < submission_start_time)
          this.submission_window_pending = true
        else if(current_time >= submission_start_time && current_time <= submission_end_time)
          this.submission_window_open = true
        else
          this.submission_window_closed = true
      },
      showQR() {
        QRCode.toCanvas(document.getElementById("qr_render_area"), this.lecture.code, function(error) {
          if (error) console.error(error)
        });
        document.getElementById("qr_modal").classList.remove("hidden")
      },
      hideQR() {
        document.getElementById("qr_modal").classList.add("hidden")
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
          // timeout: 10000,
        })
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
  #lecture-info-container {
    text-align: left; 
    position: relative;
    left: 9rem;
    top: 3rem;
  }

  #lecture-info-section {
    position: relative;
  }

  #lecture-attendance-section {
    position: relative;
    margin-top: 3rem;
  }

  #lecture-data {
    position: relative;
    text-align: center;
    margin-top: 3rem;
    margin-left: 3rem;
    margin-right: 15rem;
  }

  .show-qr-btn {
    margin-left: 2rem;
  }

  p {
    margin: 0;
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
  }
  .namecard-edging {
    display: inline-block;
    border-radius: .25rem;
    width: 12rem;
    height: 4rem;
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

  .main-info {
    border-radius: .5rem;
    box-shadow: 0 5px 10px -1px gray;
    padding: 1rem;
  }
  /* h1 {
    position: relative;
    left: 0;
  } */

  /* .lecture-title {
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
  #attendance_override_section {
    position: relative;
    margin-top: 2rem;
  } */

  .hidden {
    display: none;
  }
</style>
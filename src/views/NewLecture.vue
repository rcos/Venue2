<template>
  <!-- ADDING USER -->
  <div>
    <h2>New Lecture For {{ course.name }}</h2>
    <form class="new-lecture-form" @submit.prevent="addLecture">
      <div class="form-group">
        <!-- Lecture Info -->
        <div class="input-wrapper">
          <label>Title</label>
          <input
            type="text"
            class="form-control new-lecture-input"
            placeholder="e.g. Lecture 1"
            v-model="lecture.title"
          />
        </div>
        <!-- Section -->
        <div class="input-wrapper">
          <label>Section(s)</label>
          <input v-for="(section,i) in lecture_sections" :key="i" type="text" class="form-control new-lecture-input" v-model="section.number" readonly />
        </div>
        <div class="spinner-border" role="status" v-if="!course_sections_have_loaded">
          <span class="sr-only">Loading...</span>
        </div>
        <Sections v-else v-bind:sections="course_sections" v-on:select-section="addSection" />
        <div class="input-wrapper">
          <input @click="setAllowLiveSubmissions" type="checkbox" name="live_submission" v-model="allow_live_submissions" @change="handleAllowLive">
          <label for="live_submission">Live Submissions (can add playback after lecture ends)</label><br>
          <input @click="setAllowPlaybackSubmissions" type="checkbox" name="playback_submission" v-model="allow_playback_submissions">
          <label for="playback_submission">Playback Submissions Only</label><br>
        </div>
        <!-- Times -->
        <div v-if="allow_live_submissions">
          <div class="input-wrapper">
            <label>Start Time</label>
            <input id="lecture_start"/>
            <label>End Time</label>
            <input id="lecture_end"/>
          </div>
          <div class="input-wrapper" id="submission-time-wrapper">
            <label>Submission Start Time</label>
            <input id="submission_start"/>
            <label>Submission End Time</label>
            <input id="submission_end"/>
          </div>
        </div>
        <!-- Playback video adder -->
        <div v-if="allow_playback_submissions" id="lecture_modal_viewable">
          <div class="row">
              <button id="close_lecture_modal" class="btn btn-secondary" @click="showModal = false">X</button>
          </div>
          <input id="video_selector" name="lecturevideo" type="file" accept="video/*"/>
          <div class="row" id="lecture_container" v-if="file_selected">
            <div class="col-8" id="preview">
              <video
                id="video_player"
                class="video-js"
                controls
                preload="auto"
                poster=""
                data-setup='{}'>
                <!-- <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" /> -->
                <p class="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a
                  web browser that
                  <a href="http://videojs.com/html5-video-support/" target="_blank">
                    supports HTML5 video
                  </a>
                </p>
              </video>
            </div>
            <div class="col">
              <div id="polls">
                <!-- <PollCard v-for="i in n_polls" :key="i" :ref="'pollRef' + i"/> -->
                <button id="add_poll_btn" class="btn btn-primary" @click="addPoll">+</button>
              </div>
            </div>
            <div class="input-wrapper" id="submission-time-wrapper">
              <label>Playback Submission Start Time</label>
              <input id="playback_start"/>
              <label>Playback Submission End Time</label>
              <input id="playback_end"/>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary create-lecture-btn">Create Lecture</button>
    </form>
  </div>
</template>

<script>
import LectureAPI from "@/services/LectureAPI.js";
import CourseAPI from "@/services/CourseAPI.js";
import SectionAPI from "@/services/SectionAPI.js";
import Sections from "@/components/Sections";
import QRCode from "qrcode";
import GoogleMap from "@/components/GoogleMap";
// import PollCard from "@/components/PollCard";
import flatpickr from "flatpickr";
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/material_blue.css");
// DatePicker themes options:
// "material_blue","material_green","material_red","material_orange",
// "dark","airbnb","confetti"

export default {
  name: "NewLecture",
  components: {
    Sections,
    GoogleMap,
    // PollCard
  },
  data() {
    return {
      course: {},
      lecture: {},
      lecture_sections: [],
      course_sections: [],
      course_sections_have_loaded: false,
      selected_geofence: [],
      allow_live_submissions: false,
      allow_playback_submissions: false,
      file_selected: false,
      n_polls: 0
    };
  },
  created() {
    this.course_id = this.$route.params.course_id;
    this.getCourse();
    this.getSectionsForCourse();
  },
  methods: {
    async getCourse() {
      const response = await CourseAPI.getCourse(this.course_id);
      this.course = response.data;
    },
    addSection(section) {
      if(!this.lecture_sections.includes(section))
        this.lecture_sections.push(section)
    },
    async addLecture(evt) {
      evt.preventDefault();
      this.lecture.sections = this.lecture_sections;
      this.lecture.allow_live_submissions = this.allow_live_submissions
      this.lecture.allow_playback_submissions = this.allow_playback_submissions
      // generate attendance codes for live lectures
      if(this.lecture.allow_live_submissions)
        this.generateAttendanceCode()
      let response = await LectureAPI.addLecture(this.lecture);
      this.lecture = response.data
      // add video playback for playback lectures
      if(this.lecture.allow_playback_submissions)
        this.addPlaybackToLecture()
      else {
        // go back to course info
        this.$router.push({
          name: "course_info",
          params: { id: this.course_id }
        })
      }
    },
    async addPlaybackToLecture() {
      this.lecture.video_ref = "/videos/" + this.lecture._id + "/";
      LectureAPI.addLecturePlayback(
        this.lecture,
        document.getElementById("video_selector").files[0]
      ).then(res => {
        // save all the polls
        for(let i in this.$refs) {
          this.$refs[i][0].savePoll(res.data._id)
        }
        // go back to course info
        this.$router.push({
          name: "course_info",
          params: { id: this.course_id }
        })
      })
    },
    async getSectionsForCourse() {
      const response = await SectionAPI.getSectionsForCourse(this.course_id);
      this.course_sections = response.data;
      this.course_sections_have_loaded = true;
    },
    generateAttendanceCode() {
      const alnums =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let result = "";
      for (let i = 100; i > 0; --i) {
        result += alnums[Math.floor(Math.random() * alnums.length)];
      }
      this.lecture.code = result;
      // this.showQR(this.lecture.code);
    },
    showQR(qr_data) {
      let canvas = document.getElementById("qr_render_area");
      if (qr_data) {
        QRCode.toCanvas(canvas, qr_data, function(error) {
          if (error) console.error(error);
        });
      }
    },
    setAllowLiveSubmissions() {
      this.allow_live_submissions = true
      this.allow_playback_submissions = false
    },
    setAllowPlaybackSubmissions() {
      this.allow_playback_submissions = true
      this.allow_live_submissions = false
      this.handleShowModal()
    },
    handleShowModal() {
      this.$nextTick(() => {
        let vid_selector = document.getElementById("video_selector");
        let self = this;
        vid_selector.addEventListener("change", function() {
          if (vid_selector.files.length == 0) {
            self.file_selected = false;
          } else {
            self.polls = [];
            self.file_selected = true;
            self.$nextTick(() => {
              var srcEl = document.createElement("source")
              srcEl.setAttribute("src",URL.createObjectURL(vid_selector.files[0]))
              srcEl.setAttribute("type",vid_selector.files[0].type)
              
              document.getElementById("video_player").prepend(srcEl)

              var fp4 = flatpickr(document.getElementById("playback_start"),{
                enableTime: true,
                minDate: Date.now(),
                onChange: function(selectedDates, dateStr, instance) {
                  self.lecture.playback_submission_start_time = Date.parse(dateStr)
                  fp5.set("minDate",self.lecture.playback_submission_start_time)
                  if(self.lecture.playback_submission_start_time > self.lecture.playback_submission_end_time) {
                    fp5.setDate(self.lecture.playback_submission_start_time)
                  }
                }
              })
              var fp5 = flatpickr(document.getElementById("playback_end"),{
                enableTime: true,
                minDate: Date.now(),
                onChange: function(selectedDates, dateStr, instance) {
                  self.lecture.playback_submission_end_time = Date.parse(dateStr)
                }
              })
            })
          }
        });
      })
    },
    addPoll(evt) {
      evt.preventDefault()
      this.n_polls++
    },
    handleAllowLive() {
      let self = this
      var fp0 = flatpickr(document.getElementById("lecture_start"),{
        enableTime: true,
        minDate: Date.now(),
        onChange: function(selectedDates, dateStr, instance) {
          self.lecture.start_time = Date.parse(dateStr)
          fp1.set("minDate",self.lecture.start_time)
          if(self.lecture.start_time > self.lecture.end_time) {
            fp1.setDate(self.lecture.start_time)
          }
        }
      })
      var fp1 = flatpickr(document.getElementById("lecture_end"),{
        enableTime: true,
        minDate: Date.now(),
        onChange: function(selectedDates, dateStr, instance) {
          self.lecture.end_time = Date.parse(dateStr)
        }
      })      
      var fp2 = flatpickr(document.getElementById("submission_start"),{
        enableTime: true,
        minDate: Date.now(),
        onChange: function(selectedDates, dateStr, instance) {
          self.lecture.submission_start_time = Date.parse(dateStr)
          fp3.set("minDate",self.lecture.submission_start_time)
          if(self.lecture.submission_start_time > self.lecture.submission_end_time) {
            fp3.setDate(self.lecture.submission_start_time)
          }
        }
      })
      var fp3 = flatpickr(document.getElementById("submission_end"),{
        enableTime: true,
        minDate: Date.now(),
        onChange: function(selectedDates, dateStr, instance) {
          self.lecture.submission_end_time = Date.parse(dateStr)
        }
      })
    }
  }
};
</script>

<style>
.new-lecture-form {
  /*border: black solid;*/
}

.input-wrapper {
  width: 50%;
  margin: auto;
  margin-top: 3rem;
  /*border: blue solid;*/
}

#submission-time-wrapper {
  width: 80%;
}

.time-picker {
  /*border: black solid;*/
  display: inline-block;
  margin-left: 1rem;
  margin-right: 1rem;
}

.create-lecture-btn {
  margin-top: 2rem;
}

#qr-section {
  margin-top: 2rem;
}
</style>
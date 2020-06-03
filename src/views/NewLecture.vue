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
          <div v-for="(checkin,i) in checkins" :key="i" class="input-wrapper" id="submission-time-wrapper">
            <label>Submission Start Time</label>
            <input :id="'submission_start_'+i"/>
            <label>Submission End Time</label>
            <input :id="'submission_end_'+i"/>
            <button v-if="checkins.length > 1" type="button" class="btn btn-danger" @click="handleRemoveCheckin(i)">X</button>
          </div>
          <div class="input-wrapper">
            <button type="button" class="btn btn-secondary" @click="handleAddCheckin">Add another attendance check-in</button>
          </div>
        </div>
        <!-- Playback video adder -->
        <LectureUploadModal ref="uploadmodal" v-if="allow_playback_submissions" :lecture="lecture" :update_lecture="false"/>
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
import LectureUploadModal from "@/components/LectureUploadModal";
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
    LectureUploadModal
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
      checkins: [],
      checkin_pickers: [],
      times_added: 0
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
      this.lecture.checkins = this.checkins
      // generate attendance codes for live lectures
      if(this.lecture.allow_live_submissions) {
        this.generateAttendanceCodes()
        let response = await LectureAPI.addLecture(this.lecture);
        this.lecture = response.data
        this.$router.push({
          name: "course_info",
          params: { id: this.course_id }
        })
      }
      else if(this.lecture.allow_playback_submissions && this.$refs["uploadmodal"].isComplete()) {
        let response = await LectureAPI.addLecture(this.lecture);
        this.lecture = response.data
        this.$refs["uploadmodal"].updateLectureFromParent(this.lecture,this.course_id)
      }
    },
    async getSectionsForCourse() {
      const response = await SectionAPI.getSectionsForCourse(this.course_id);
      this.course_sections = response.data;
      this.course_sections_have_loaded = true;
    },
    generateAttendanceCodes() {
      for(let i=0;i<this.lecture.checkins.length;i++) {
        const alnums = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let j = 100; j > 0; --j) {
          result += alnums[Math.floor(Math.random() * alnums.length)];
        }
        this.lecture.checkins[i].code = result;
      }
    },
    setAllowLiveSubmissions() {
      this.allow_live_submissions = true
      this.allow_playback_submissions = false
    },
    setAllowPlaybackSubmissions() {
      this.allow_playback_submissions = true
      this.allow_live_submissions = false
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
      this.handleAddCheckin();
    },
    handleAddCheckin() {
      this.checkins.push({
        start_time: null,
        end_time: null,
        code: ""
      })
      this.checkin_pickers.push({
        start: null,
        end: null
      })
      this.$nextTick(() => {
        let i = this.checkin_pickers.length-1
        let pickrs = this.checkin_pickers[i]
        let self = this
        pickrs.start = flatpickr(document.getElementById("submission_start_"+i),{
          enableTime: true,
          minDate: Date.now(),
          onChange: function(selectedDates, dateStr, instance) {
            self.checkins[i].start_time = Date.parse(dateStr)
            pickrs.end.set("minDate",self.checkins[i].start_time)
            if(self.checkins[i].start_time > self.checkins[i].end_time) {
              pickrs.end.setDate(self.checkins[i].start_time)
            }
          }
        })
        pickrs.end = flatpickr(document.getElementById("submission_end_"+i),{
          enableTime: true,
          minDate: Date.now(),
          onChange: function(selectedDates, dateStr, instance) {
            self.checkins[i].end_time = Date.parse(dateStr)
          }
        })
      })
    },
    handleRemoveCheckin(i) {
      let fallback = []
      for(let j=i+1;j<this.checkins.length;j++) {
        fallback.push({
          start: this.checkins[j].start_time,
          end: this.checkins[j].end_time
        })
      }
      for(let j=i;j<this.checkin_pickers.length;j++) { // cleanup
        this.checkin_pickers[j].start.destroy()
        this.checkin_pickers[j].end.destroy()
      }
      this.checkins.splice(i,1)
      this.checkin_pickers.splice(i,1)
      for(let j=i;j<this.checkin_pickers.length;j++) { // rebuild instances
        let self = this
        self.checkin_pickers[j].start = flatpickr(document.getElementById("submission_start_"+j),{
          enableTime: true,
          minDate: Date.now(),
          onChange: function(selectedDates, dateStr, instance) {
            self.checkins[j].start_time = Date.parse(dateStr)
            self.checkin_pickers[j].end.set("minDate",self.checkins[j].start_time)
            if(self.checkins[j].start_time > self.checkins[j].end_time) {
              self.checkin_pickers[j].end.setDate(self.checkins[j].start_time)
            }
          }
        })
        self.checkin_pickers[j].end = flatpickr(document.getElementById("submission_end_"+j),{
          enableTime: true,
          minDate: fallback[this.checkin_pickers.length-j-1].start || Date.now(),
          onChange: function(selectedDates, dateStr, instance) {
            self.checkins[j].end_time = Date.parse(dateStr)
          }
        })
        if(fallback[this.checkin_pickers.length-j-1].start != null) { // setDate to fallback
          self.checkin_pickers[j].start.setDate(fallback[this.checkin_pickers.length-j-1].start)
          if(fallback[this.checkin_pickers.length-j-1].end != null) { // setDate to fallback
            self.checkin_pickers[j].end.setDate(fallback[this.checkin_pickers.length-j-1].end)
          } else {
            self.checkin_pickers[j].end.setDate(fallback[this.checkin_pickers.length-j-1].start)
          }
        }
      }
    }
  }
};
</script>

<style>
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
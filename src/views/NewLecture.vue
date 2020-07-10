<template>
  <!-- ADDING USER -->
  <div>
    <h1>New Lecture For {{ course.name }}</h1>
    <form class="new-lecture-form" @submit.prevent="handleAttemptSubmit">
      <div class="form-group">
        <!-- Lecture Info -->
        <div class="input-wrapper">
          <label id="title_label">Lecture Title</label>
          <input
            type="text"
            class="form-control new-lecture-input"
            placeholder="e.g. Lecture 1"
            v-model="lecture.title"
            aria-labelledby="title_label"
            :tabindex="(modal_open ? '-1' : '0')"
          />
        </div>
        <!-- Section -->
        <div class="spinner-border" role="status" v-if="!course_sections_have_loaded">
          <span class="sr-only">Loading...</span>
        </div>
        <Sections v-else v-bind:sections="course_sections" v-on:select-section="addSection" :disable_tabbing="(modal_open ? true : false)"/>
        <div class="input-wrapper">
          <label>Section(s):</label>
          <input v-for="(section,i) in lecture_sections" :key="i" type="text" class="form-control new-lecture-input" v-model="section.number" readonly :tabindex="(modal_open ? '-1' : '0')"/>
        </div>
        <div class="input-wrapper">
          <input @click="setAllowLiveSubmissions" type="checkbox" name="live_submission" v-model="allow_live_submissions" aria-labelledby="live_submission_label" :tabindex="(modal_open ? '-1' : '0')">
          <label id="live_submission_label">Lecture DOES have Live Submissions and Show Associated Options</label><br>
          <input @click="setAllowPlaybackSubmissions" type="checkbox" name="playback_submission" v-model="allow_playback_submissions" aria-labelledby="playback_submission_label" :tabindex="(modal_open ? '-1' : '0')">
          <label id="playback_submission_label">Lecture DOES NOT have Live Submissions and Show Associated Options</label><br>
        </div>
        <!-- Times -->
        <div v-if="allow_live_submissions">
          <div class="input-wrapper">
            <label id="start_time_label">Start Time</label>
            <input id="lecture_start" aria-labelledby="start_time_label" :tabindex="(modal_open ? '-1' : '0')" type="datetime-local"/>
            <br>
            <label id="end_time_label">End Time</label>
            <input id="lecture_end" aria-labelledby="end_time_label" :tabindex="(modal_open ? '-1' : '0')" type="datetime-local"/>
          </div>
          <div class="input-wrapper">
            <input @click="setAllowRandom" type="checkbox" v-model="random_times" aria-labelledby="random_times" :tabindex="(modal_open ? '-1' : '0')"/>
            <label id="random_times">Use randomized check-in times and show associated options</label><br>
            <input @click="setAllowCustom" type="checkbox" v-model="custom_times" aria-labelledby="custom_times" :tabindex="(modal_open ? '-1' : '0')"/>
            <label id="custom_times">Use custom check-in times and show associated options</label><br>
          </div>
          <div v-if="random_times">
            <div class="input-wrapper">
              <label id="random_checkin_count">Number of check-in times</label>
              <input class="random_input" type="number" min="1" max="10" v-model.lazy="random_checkin_count" aria-labelledby="random_checkin_count" :tabindex="(modal_open ? '-1' : '0')"/>
              <label id="random_checkin_length">Minutes for each check-in</label>
              <input class="random_input" type="number" min="1" max="10" v-model.lazy="random_checkin_length" aria-labelledby="random_checkin_length" :tabindex="(modal_open ? '-1' : '0')"/>
            </div>
          </div>
          <div v-else-if="custom_times">
            <div v-for="(checkin,i) in checkins" :key="i" class="input-wrapper" id="submission-time-wrapper">
              <label :id="'submission_start_label_'+i">Submission Start Time</label>
              <input :id="'submission_start_'+i" :aria-labelledby="'submission_start_label_'+i" :tabindex="(modal_open ? '-1' : '0')"/>
              <label :id="'submission_end_label_'+i">Submission End Time</label>
              <input :id="'submission_end_'+i" :aria-labelledby="'submission_end_label_'+i" :tabindex="(modal_open ? '-1' : '0')"/>
              <button v-if="checkins.length > 1" type="button" class="btn btn-danger" @click="handleRemoveCheckin(i)" :aria-label="'Remove submission window '+(i+1)" :tabindex="(modal_open ? '-1' : '0')">X</button>
            </div>
            <div class="input-wrapper">
              <button type="button" class="btn btn-secondary" @click="handleAddCheckin" :tabindex="(modal_open ? '-1' : '0')">Add another attendance check-in</button>
            </div>
          </div>
        </div>
        <!-- Playback video adder -->
        <LectureUploadModal ref="uploadmodal" v-if="allow_playback_submissions" :lecture="lecture" :update_lecture="false" :shown="modal_open" @openstatus="handleModalChange"/>
        <p class="error_msg" v-if="input_error_message!=''">{{input_error_message}}</p>
        <button class="btn btn-primary create-lecture-btn" :tabindex="(modal_open ? '-1' : '0')">Create Lecture</button>
      </div>
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
      random_checkins: [],
      times_added: 0,
      random_times: true,
      custom_times: false,
      random_checkin_count: 1,
      random_checkin_length: 5,
      input_error_message: "",
      modal_open: false
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
    setErrorMessage(error) {
      this.input_error_message = "ERROR: "+error
      let self = this
      setTimeout(function() {
        self.input_error_message = ""
      },(7*1000))
    },
    handleAttemptSubmit(evt) {
      evt.preventDefault();
      let allGood = true
      let hasTitle = this.lecture.title && this.lecture.title != ""
      let hasSections = this.lecture_sections.length > 0
      let hasType = this.allow_live_submissions || this.allow_playback_submissions
      if(hasTitle && hasSections && hasType) {
        if(this.allow_live_submissions) {
          let hasStart = this.lecture.start_time != null && this.lecture.start_time != ""
          let hasEnd = this.lecture.end_time != null && this.lecture.end_time != ""
          let validRange = this.lecture.start_time < this.lecture.end_time
          if(hasStart && hasEnd && validRange) {
            let hasRandom = this.random_times
            if(hasRandom) {
              allGood = true
            } else {
              this.checkins.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
              if(this.checkins[0].start_time == null || this.checkins[0].end_time == null || this.checkins[0].start_time == "" || this.checkins[0].end_time == "") {
                this.setErrorMessage("Missing start or end time for check-in number: 1")
                allGood = false
              } else if(this.lecture.start_time <= this.checkins[0].start_time && this.checkins[this.checkins.length-1].end_time <= this.lecture.end_time) {
                for(let i=0;i<this.checkins.length-1;i++) {
                  if(this.checkins[i+1].start_time == null || this.checkins[i+1].end_time == null || this.checkins[i+1].start_time == "" || this.checkins[i+1].end_time == "") {
                    this.setErrorMessage("Missing start or end time for check-in number: "+(i+2))
                    allGood = false
                  } else if(this.checkins[i].end_time > this.checkins[i+1].start_time) {
                    this.setErrorMessage("Invalid time range for check-in number: "+(i+2))
                    allGood = false
                  }
                }
              } else {
                this.setErrorMessage("Check-in times must be between lecture start and end times")
                allGood = false
              }
            }
          } else if(!hasStart) {
            this.setErrorMessage("Missing start time")
            allGood = false
          } else if(!hasEnd) {
            this.setErrorMessage("Missing end time")
            allGood = false
          } else if(!validRange) {
            this.setErrorMessage("Invalid lecture time range")
            allGood = false
          }
        } else if(this.$refs["uploadmodal"].isComplete()) {
          allGood = true
        } else {
          this.setErrorMessage("Video upload section is not complete")
          allGood = false
        }
      } else if(!hasTitle) {
        this.setErrorMessage("Missing title")
        allGood = false
      } else if(!hasSections) {
        this.setErrorMessage("Missing section(s)")
        allGood = false
      } else if(!hasType) {
        this.setErrorMessage("Missing lecture type")
        allGood = false
      }
      if(allGood) {
        this.addLecture()
      }
    },
    async addLecture() {
      this.lecture.sections = this.lecture_sections;
      this.lecture.allow_live_submissions = this.allow_live_submissions
      this.lecture.allow_playback_submissions = this.allow_playback_submissions
      this.lecture.checkins = this.checkins
      // generate attendance codes for live lectures
      if(this.lecture.allow_live_submissions) {
        if(this.random_times) {
          this.generateRandomCheckins()
          this.lecture.checkins = this.random_checkins
        }
        this.generateAttendanceCodes()
        let response = await LectureAPI.addLecture(this.lecture);
        this.lecture = response.data
        this.$router.push({
          name: "course_info",
          params: { id: this.course_id }
        })
      }
      else if(this.lecture.allow_playback_submissions) {
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
    generateRandomCheckins() {
      function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let n = this.random_checkin_count
      let l = this.random_checkin_length * 60 * 1000
      let buffer = 5 * 60 * 1000
      this.random_checkins = []
      let min = this.lecture.start_time + buffer //Cannot start attendance until 5 min after start
      let max = this.lecture.end_time - l - buffer //Cannot start attendance until l min before end
      for(let i=0;i<n;i++) { // Try to create an acceptable check-in start time
        let start
        let accept = true
        let attempts = 0
        do {
          attempts++
          start = randomNumber(min,max)
          for(let j=0;j<this.random_checkins.length;j++) {
            let checkin = this.random_checkins[j]
            if(start >= checkin.start_time && start <= checkin.end_time + buffer) {
              accept = false
            }
          }
        }while(!accept && attempts < 10)
        if(attempts < 10) {
          this.random_checkins.push({
            start_time: start,
            end_time: start + l,
            code: ''
          })
        }
      }
      this.random_checkins.sort((a, b) => (a.start_time > b.start_time) ? 1 : -1)
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
      this.$nextTick(() => {
        let self = this
        var fp0 = flatpickr(document.getElementById("lecture_start"),{
          enableTime: true,
          dateFormat: "h:i K, M d, Y",
          minDate: Date.now(),
          minuteIncrement: 1,
          onChange: function(selectedDates, dateStr, instance) {
            self.lecture.start_time = Date.parse(dateStr)
            fp1.set("minDate",self.lecture.start_time)
            if(self.lecture.start_time > self.lecture.end_time || !self.lecture.end_time) {
              self.lecture.end_time = Date.parse(dateStr)
              fp1.setDate(self.lecture.start_time)
            }
          }
        })
        var fp1 = flatpickr(document.getElementById("lecture_end"),{
          enableTime: true,
          dateFormat: "h:i K, M d, Y",
          minDate: Date.now(),
          minuteIncrement: 1,
          onChange: function(selectedDates, dateStr, instance) {
            self.lecture.end_time = Date.parse(dateStr)
          }
        })
      })
    },
    resetPickers() {
      for(let i=0;i<this.checkins.length;i++) {
        if(this.checkin_pickers[i].start)
          this.checkin_pickers[i].start.destroy()
        if(this.checkin_pickers[i].end)
          this.checkin_pickers[i].end.destroy()
      }
      this.checkins = []
      this.checkin_pickers = []
    },
    setAllowPlaybackSubmissions() {
      this.allow_playback_submissions = true
      this.allow_live_submissions = false
      this.resetPickers()
    },
    setAllowRandom() {
      this.custom_times = false
      this.random_times = true
      this.resetPickers()
    },
    setAllowCustom() {
      this.custom_times = true
      this.random_times = false
      this.handleAddCheckin()
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
          dateFormat: "h:i K, M d, Y",
          minDate: Date.now(),
          minuteIncrement: 1,
          onChange: function(selectedDates, dateStr, instance) {
            self.checkins[i].start_time = Date.parse(dateStr)
            pickrs.end.set("minDate",self.checkins[i].start_time)
            if(self.checkins[i].start_time > self.checkins[i].end_time) {
              self.checkins[i].end_time = Date.parse(dateStr)
              pickrs.end.setDate(self.checkins[i].start_time)
            }
          }
        })
        pickrs.end = flatpickr(document.getElementById("submission_end_"+i),{
          enableTime: true,
          dateFormat: "h:i K, M d, Y",
          minDate: Date.now(),
          minuteIncrement: 1,
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
          dateFormat: "h:i K, M d, Y",
          minDate: Date.now(),
          minuteIncrement: 1,
          onChange: function(selectedDates, dateStr, instance) {
            self.checkins[j].start_time = Date.parse(dateStr)
            self.checkin_pickers[j].end.set("minDate",self.checkins[j].start_time)
            if(self.checkins[j].start_time > self.checkins[j].end_time) {
              self.checkins[j].end_time = Date.parse(dateStr)
              self.checkin_pickers[j].end.setDate(self.checkins[j].start_time)
            }
          }
        })
        self.checkin_pickers[j].end = flatpickr(document.getElementById("submission_end_"+j),{
          enableTime: true,
          dateFormat: "h:i K, M d, Y",
          minDate: fallback[this.checkin_pickers.length-j-1].start || Date.now(),
          minuteIncrement: 1,
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
    },
    handleModalChange(isOpen) {
      this.modal_open = isOpen
    }
  }
};
</script>

<style>
.input-wrapper {
  width: 80%;
  margin: auto;
  margin-top: 3rem;
  padding: 0;
  /*border: blue solid;*/
}

.form-group {
  margin: 0;
}

.random_input {
  width: 5rem;
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

.error_msg {
  color: red;
}
</style>
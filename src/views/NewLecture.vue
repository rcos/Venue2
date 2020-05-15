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
          <input v-for="section in lecture_sections" type="text" class="form-control new-lecture-input" v-model="section.number" readonly />
        </div>
        <div class="spinner-border" role="status" v-if="!course_sections_have_loaded">
          <span class="sr-only">Loading...</span>
        </div>
        <Sections v-else v-bind:sections="course_sections" v-on:select-section="addSection" />
        <div class="input-wrapper">
          <input type="checkbox" name="live_submission" v-model="allow_live_submissions">
          <label for="live_submission">Allow Live Submissions</label><br>
        </div>
        <!-- Times -->
        <div v-if="allow_live_submissions">
          <div class="input-wrapper">
            <label>Start Time</label>
            <datetime
              class="time-picker"
              type="datetime"
              use12-hour
              value-zone="local"
              title="Lecture Start"
              v-model="lecture.start_time"
            ></datetime>
            <label>End Time</label>
            <datetime
              class="time-picker"
              type="datetime"
              use12-hour
              value-zone="local"
              title="Lecture End"
              v-model="lecture.end_time"
            ></datetime>
          </div>
          <div class="input-wrapper" id="submission-time-wrapper">
            <label>Submission Start Time</label>
            <datetime
              class="time-picker"
              type="datetime"
              use12-hour
              value-zone="local"
              title="Submission Start"
              v-model="lecture.submission_start_time"
            ></datetime>
            <label>Submission End Time</label>
            <datetime
              class="time-picker"
              type="datetime"
              use12-hour
              value-zone="local"
              title="Submission End"
              v-model="lecture.submission_end_time"
            ></datetime>
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
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import QRCode from "qrcode";
import GoogleMap from "@/components/GoogleMap";

export default {
  name: "NewLecture",
  components: {
    Sections,
    datetime: Datetime,
    GoogleMap
  },
  data() {
    return {
      course: {},
      lecture: {},
      lecture_sections: [],
      course_sections: [],
      course_sections_have_loaded: false,
      selected_geofence: [],
      allow_live_submissions: false
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
      this.generateAttendanceCode()
      const response = await LectureAPI.addLecture(this.lecture);
      this.$router.push({
        name: "course_info",
        params: { id: this.course_id }
      });
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
      for (let i = 1000; i > 0; --i) {
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
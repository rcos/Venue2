<template>
  <div class="active-event-card-container">
    <a class="active-event-card" v-on:click="scanQR()">
      <div class="event-card-section" id="course-section">
        <div class="course-name">{{ course.name }}</div>
        <div class="course-title">{{ course.dept }} {{ course.course_number }}-{{ section.number }}</div>
      </div>
      <div class="event-card-section" id="event-section">
        <div class="event-name">{{ event.title }}</div>
        <div class="event-location">DCC 308</div>
      </div>
      <div class="event-card-section" id="time-section">
        <img src="@/assets/clock.svg" class="clock" />
        <div class="time-remaining">
          <span v-if="remaining_days > 0">{{ remaining_days }}d</span>
          <span v-if="remaining_hours > 0">{{ remaining_hours }}h</span>
          <span v-if="remaining_mins > 0">{{ remaining_mins }}m</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import SectionAPI from "@/services/SectionAPI.js";
import QRScanner from "qr-code-scanner";
import SubmissionAPI from "@/services/SubmissionAPI.js";

export default {
  name: "ActiveEventCard",
  props: {
    event: {}
  },
  computed: {},
  components: {},
  data() {
    return {
      section: {},
      course: {},
      remaining_days: Number,
      remaining_hours: Number,
      remaining_mins: Number
    };
  },
  created() {
    this.getEventSectionWithCourse();
  },
  methods: {
    async getEventSectionWithCourse() {
      const response = await SectionAPI.getSectionWithCourse(
        this.event.section
      );
      this.section = response.data;
      this.course = this.section.course;
      this.adjustCourseNameForViewing();
      this.getRemainingTime();
    },
    adjustCourseNameForViewing() {
      if (this.course.name.length > 18) {
        this.course.name = this.course.name.slice(0, 11);
        this.course.name += "...";
      }
    },
    getRemainingTime() {
      let current_time = new Date();
      let event_end_time = new Date(this.event.end_time);
      let diff_milliseconds = Math.abs(event_end_time - current_time);
      let diff_hours = Math.floor((diff_milliseconds % 86400000) / 3600000); // hours
      let diff_mins = Math.round(
        ((diff_milliseconds % 86400000) % 3600000) / 60000
      ); // minutes
      let diff_days = Math.floor(diff_milliseconds / 86400000); // days
      this.remaining_days = diff_days;
      this.remaining_hours = diff_hours;
      this.remaining_mins = diff_mins;
    },
    scanQR() {
      QRScanner.initiate({
        onResult: result => {
          let submission = {
            event: this.event,
            submitter: this.$store.state.user.current_user,
            time: Date(),
            code: result
          };
          SubmissionAPI.addSubmission(submission);
          console.log("ATTENDANCE CODE FOUND:", result);
        },
        timeout: 10000
      });
    }
  }
};
</script>

<style scoped>
.active-event-card-container {
  position: relative;
  width: 75%;
  height: 3.5rem;
  margin-left: 2rem;
  margin-top: 2rem;
  border: #fc5d60 solid;
  border-radius: 5px;
  background-color: #fc5d60;
  cursor: pointer;
  transition: background-color, border, width, 0.25s;
}

.active-event-card-container:hover {
  background-color: #cf4c4f;
  border: #cf4c4f solid;
}

.active-event-card {
  position: absolute;
  background-color: white;
  width: 98%;
  border-radius: 5px;
  /*margin: auto;*/
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  padding: 0.8rem 0.4rem 0.7rem 0.4rem;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
  transition: background-color, box-shadow 0.25s;
}

.active-event-card:hover {
  background-color: #e8e8e8;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.3);
}

.event-card-section {
  display: inline-block;
  vertical-align: top;
  height: 100%;
}

#course-section {
  width: 30%;
  margin-left: 0.5rem;
  /*text-align: center;*/
}

.course-name {
  /*font-size: 0.8rem;*/
  font-size: 0.8rem;
  color: #466d85;
  font-weight: bold;
}

.course-title {
  font-size: 0.75rem;
  color: #1591c5;
}

#event-section {
  width: 40%;
  text-align: center;
  margin: auto;
}

.event-name {
  font-size: 0.9rem;
  font-weight: bold;
}

.event-location {
  font-size: 0.75rem;
  color: #524e0a;
}

#time-section {
  width: 26%;
  text-align: center;
  padding-top: 0.25rem;
}

.clock {
  display: inline-block;
  height: 1rem;
}

.time-remaining {
  display: inline-block;
  padding-top: 0.25rem;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  color: #ff7b7b;
  font-weight: bold;
}

/*Large devices (Laptops and above)*/
@media (max-width: 1128px) {
  .active-event-card-container {
    margin: auto;
    margin-top: 2rem;
    width: 50%;
  }
  #course-section {
    width: 23%;
  }
}

/*Small devices (phones and below)*/
@media (max-width: 575.98px) {
  .active-event-card-container {
    width: 80%;
  }
  .active-event-card {
    padding-left: 0;
  }
  #course-section {
    width: 30%;
  }
}
</style>

<template>
  <div>
    <!-- Event Headers -->
    <div class="spinner-border" role="status" v-if="!event_has_loaded">
      <span class="sr-only">Loading...</span>
    </div>
    <!-- Times -->
    <div v-else>
      <h1 class="event-title">{{ event.title }}</h1>
      <h6>{{ event.location }}</h6>
      <h3 class="course-name">{{ event.section.course.name }}</h3>
      <h5 class="section-numbers">Section {{ event.section.number }}</h5>
      <div class="time-info-container">
        <h4 class="time-info">Start time: {{ new Date(event.start_time) }}</h4>
        <h4 class="time-info">End time: {{ new Date(event.end_time) }}</h4>
        <h4 class="time-info">Submission Start time: {{ new Date(event.submission_start_time) }}</h4>
        <h4 class="time-info">Submission End time: {{ new Date(event.submission_end_time) }}</h4>
      </div>
      <!-- geo fence -->
      <div>
        {{ event.geofence }}
      </div>
      <!-- Submission Info -->
      <div class="submission-status">
        <!-- Instructor -->
        <div v-if="is_instructor">
          <div v-if="event_is_pending">
            <p>Event not started yet</p>
          </div>
          <div v-else-if="event_is_active">
            <p>Event is active.</p>
            <p v-if="submission_window_pending">Submission Window pending</p>
            <div v-else-if="submission_window_ongoing">
              <p>QR Code:</p>
              <canvas id="qr_render_area"></canvas>
            </div>
            <p v-else>Submission window closed</p>
          </div>
          <div v-else>
            <p>Event is over - show submission statistics</p>
          </div>
        </div>
        <!-- Student -->
        <div v-else>
          <div v-if="event_is_pending">
            <p>Event not started yet</p>
          </div>
          <div v-else-if="event_is_active">
            <p>Event is ongoing.</p>
            <p v-if="submission_window_pending">Submission Window pending</p>
            <button v-else-if="submission_window_ongoing" @click="scanQR">Scan Code</button>
            <p v-else>Submission window closed</p>
          </div>
          <div v-else>
            Event is over - show submission status
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';
  import QRCode from "qrcode";
  import QRScanner from "qr-code-scanner";

  export default {
    name: 'EventInfo',
    props: {
    },
    computed: {
    },
    components: {
    },
    data(){
      return {
        event: {},
        is_instructor: Boolean,
        event_has_loaded: false,
        event_is_pending: false,
        event_is_active: false,
        event_is_over: false,
        submission_window_pending: false,
        submission_window_ongoing: false,
        submission_window_closed: false
      }
    },
    created() {
      this.getEvent()
      this.is_instructor = this.$store.state.user.current_user.is_instructor
    },
    methods: {
      async getEvent() {
        let event_id = this.$route.params.event_id
        const response = await EventAPI.getEventWithSectionAndCourse(event_id)
        this.event = response.data
        this.event_has_loaded = true
        this.setEventStatus()
        if(this.is_instructor && this.event_is_active && this.submission_window_ongoing){
          this.$nextTick(function() {
            this.showQR(this.event.code)
          });
        }
      },
      setEventStatus() {
        let current_time = new Date()
        let event_start_time = new Date(this.event.start_time)
        let event_end_time = new Date(this.event.end_time)
        if(current_time <= event_start_time) 
          this.event_is_pending = true
        else if(current_time >= event_start_time && current_time <= event_end_time){
          this.event_is_active = true
          this.setSubmissionWindowStatus()
        }
        else
          this.event_is_over = true
      },
      setSubmissionWindowStatus() {
        let current_time = new Date()
        let submission_start_time = new Date(this.event.submission_start_time)
        let submission_end_time = new Date(this.event.submission_end_time)
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
              event: this.event,
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
  .event-title {
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
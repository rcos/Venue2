<template>
  <div>
    <h2>Create A Submission</h2>
    <form @submit.prevent="addSubmission">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>event:</label>
            <input type="text" class="form-control" v-model="event.title" readonly />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>submitter:</label>
            <input class="form-control" v-model="submitter.first_name" readonly />
            <input class="form-control" v-model="submitter.last_name" readonly />
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>

    <Events v-on:select-event="selectEvent" />
    <Students v-on:select-student="selectSubmitter" />
  </div>
</template>

<script>
import SubmissionAPI from "@/services/SubmissionAPI.js";
import Events from "../Event/AdminEvents";
import Students from "../User/Students";

export default {
  name: "Submission",
  components: {
    Events,
    Students
  },
  data() {
    return {
      submission: {},
      event: {},
      submitter: {},
      gettingLocation: false,
      location: null,
      errorStr: ""
    };
  },
  created() {},
  methods: {
    async addSubmission(evt) {
      var self = this;
      evt.preventDefault(); // prevents the form's default action from redirecting the page
      this.submission.event = this.event;
      this.submission.submitter = this.submitter;

      console.log("Here1");
      if (!("geolocation" in navigator)) {
        this.errorStr = "Geolocation is not available.";
      } else {
        this.gettingLocation = true;
        // get position
        // console.log("Here2");
        // // navigator.geolocation.getCurrentPosition(pos => {}, err => {});

        // //Dummy one, which will result in a working next statement.
        navigator.geolocation.getCurrentPosition(
          function() {},
          function() {},
          {}
        );
        //The working next statement.
        navigator.geolocation.getCurrentPosition(
          function(position) {
            self.gettingLocation = false;
            self.submission.location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            self.submission.time = Date(position.timestamp);
            const response = SubmissionAPI.addSubmission(self.submission);
            self.$router.push({ name: "submissions" });
          },
          function(e) {
            self.gettingLocation = false;
            self.errorStr = e.message;
            console.log(self.errorStr);
          },
          {
            enableHighAccuracy: true
          }
        );
      }
    },
    selectEvent(event) {
      this.event = event;
    },
    selectSubmitter(submitter) {
      this.submitter = submitter;
    }
  }
};
</script>
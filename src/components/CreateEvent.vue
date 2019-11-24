<template>
  <div>
    <h2 class="text-center">Current Events</h2>

    <div class="event-form">
      <div class="">
        <label for="eventName">Event Name:</label>
        <input type="text" class="form-control" id="eventName">
      </div>

      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <datetime
          type="datetime"
          input-class="my-class"
          value-zone="America/New_York"
          zone="Asia/Shanghai"
          :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
          :phrases="{ok: 'Continue', cancel: 'Exit'}"
          :hour-step="1"
          :minute-step="15"
          :week-start="7"
          use12-hour
          auto
        ></datetime>
      </div>

      <div class="form-group">
        <label for="endDate">End Date:</label>
        <datetime
          type="datetime"
          input-class="my-class"
          value-zone="America/New_York"
          zone="Asia/Shanghai"
          :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
          :phrases="{ok: 'Continue', cancel: 'Exit'}"
          :hour-step="1"
          :minute-step="15"
          :week-start="7"
          use12-hour
          auto
        ></datetime>
      </div>

      <div class="form-group">
        <label for="location">Select Location:</label>
          <GoogleMap></GoogleMap>
      </div>

      <button type="button" class="btn btn-primary">
        <router-link to="/Dashboard" class="nav-link">Create Event</router-link>
      </button>




    </div>

  </div>

</template>

<script>
import GoogleMap from './GoogleMap.vue'

export default {
  components: {
    GoogleMap
  }
};
</script>

<style>
#eventName{
  margin-left: auto;
  margin-right: auto;
  width: auto;
}

</style>

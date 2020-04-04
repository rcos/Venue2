<template>
  <div class="event-history-list">
    <div class="attendance-month-container">
      <div class="month">February</div>
      <div class="event-pill">
        <p class="event-card-section" id="event-name">Class 2/2</p>
        <p class="event-card-section" id="event-location">DCC 308</p>
      </div>
      <div class="event-pill">
        <p class="event-card-section" id="event-name">Class 2/2</p>
        <p class="event-card-section" id="event-location">DCC 308</p>
      </div>
      <div class="event-pill">
        <p class="event-card-section" id="event-name">Class 2/2</p>
        <p class="event-card-section" id="event-location">DCC 308</p>
      </div>
      <div class="event-pill">
        <p class="event-card-section" id="event-name">Class 2/2</p>
        <p class="event-card-section" id="event-location">DCC 308</p>
      </div>
      <div class="event-pill">
        <p class="event-card-section" id="event-name">Class 2/2</p>
        <p class="event-card-section" id="event-location">DCC 308</p>
      </div>
    </div>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';

  export default {
    name: 'EventHistoryList',
    props: {
      course: Object
    },
    computed: {
    },
    components: {

    },
    data(){
      return {
        event_history: []
      }
    },
    created() {
      this.getEventHistoryForCourse()
    },
    methods: {
      async getEventHistoryForCourse() {
        // const response = EventAPI.getEventHistoryForCourse(this.course._id)
        // this.event_history = response.data
      }
    }
  }
</script>

<style scoped>
  .attendance-month-container {
    /*border: green solid;*/
    overflow: hidden;
    margin-top: 1rem;
  }

  .month {
    float: left;
    margin-left: 2rem;
    /*border: red solid;*/
    width: 100%;
    text-align: left;
    padding-left: 1rem;
  }

  .event-pill {
    width: 14rem;
    border: green solid;
    float: left;
    margin-left: 2rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
  }

  .event-card-section {
    /*border: purple solid;*/
    display: inline-block;
    padding-left: 1rem;
    padding-right: 1rem;
    overflow: hidden;
  }

  #event-name {
    float: left;
  }

  #event-location {
    float: right;
  }
</style>
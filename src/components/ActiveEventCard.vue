<template>
  <div class="active-event-card">
    <div class="event-card-section" id="course-section">
      <div class="course-name">Intro to AI</div>
      <div class="course-title">CSCI 4200-02</div>
    </div>
    <div class="event-card-section" id="event-section">
      <div class="event-name">Class 10/12/18</div>
      <div class="event-location">DCC 308</div>
    </div>
    <div class="event-card-section" id="time-section">
      <div class="time-remaining">35m</div>
    </div>
  </div>
<!-- <div class="desktop-active-class-modal">
  <div class="bg"></div>
  <div class="fg">
    <div class="class-info">
      <div class="class-name">Intro to AI</div>
      <div class="class-code">CSCI 1200</div>
    </div>
    <div class="time-remaining">
      35m
    </div>
  </div>
</div> -->
</template>

<script>
export default {
  name: 'ActiveEventCard',
  props: {
  },
  computed: {
  },
  components: {
  },
  data(){
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
.active-event-card {
  background-color: white;
  width: 95%;
  border-radius: 5px;
  margin: auto;
  margin-top: 0.1rem;
  padding: 12px 15px 5px 15px;
  /*font-size: 2rem;*/
}

.event-card-section {
  /*border: blue solid;*/
  width: 33%;
  display: inline-block;
  vertical-align: top;
  height: 100%;
}

.course-name {
  font-size: 0.9rem;
}

.course-title {
  font-size: 0.75rem;
  color: #1591C5;
}

#event-section {
  text-align: center;
}

.event-name {
  font-size: 0.9rem;
}

.event-location {
  font-size: 0.75rem;
}

.time-remaining {
  padding-top: 0.25rem;
  text-align: right;
  font-size: 0.9rem;
  color: #FF7B7B;
}

.desktop-active-class-modal {
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  height: 70px;
  position: relative;
}

.desktop-active-class-modal .bg,
.desktop-active-class-modal .fg {
  position: absolute;
}

.desktop-active-class-modal .bg {
  background-color: #FC5D60;
  width: 104%;
  height: 70px;
  left: -2%;
  border-radius: 5px;
}

.desktop-active-class-modal .fg {
  background-color: white;
  width: 100%;
  top: 6px;
  height: 70px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px 20px;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
}

.desktop-active-class-modal .time-remaining,
.desktop-active-class-modal .class-info {
  display: inline-block;
  vertical-align: top;
}

.desktop-active-class-modal .time-remaining {
  width: 12%;
  color: #FF7B7B;
  font-size: 13px;
  text-align: right;
  height: 70px;
  line-height: 70px;
  position: relative;
  top: -5px;
}
.desktop-active-class-modal .class-info {
  width: 85%;
}

.desktop-active-class-modal .class-info .class-name {
  font-size: 15px;
  margin-top: 10px;
}

.desktop-active-class-modal .class-info .class-code {
  font-size: 12px;
  color: #1591C5;
}
</style>

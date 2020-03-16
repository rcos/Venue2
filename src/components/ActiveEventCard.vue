<template>
  <div class="active-event-card">
    <div class="event-card-section" id="course-section">
      <div class="course-name">{{ course.name }}</div>
      <div class="course-title">{{ course.dept }} {{ course.course_number }}-{{ section.number }}</div>
    </div>
    <div class="event-card-section" id="event-section">
      <div class="event-name">{{ event.title }}</div>
      <div class="event-location">DCC 308</div>
    </div>
    <div class="event-card-section" id="time-section">
      <img src="@/assets/clock.svg" class="clock">
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
  import SectionAPI from '@/services/SectionAPI.js'

export default {
  name: 'ActiveEventCard',
  props: {
    event: {}
  },
  computed: {
  },
  components: {
  },
  data(){
    return {
      section: {},
      course: {}
    }
  },
  created() {
    this.getEventSectionWithCourse()
  },
  methods: {
    async getEventSectionWithCourse() {
      const response = await SectionAPI.getSectionWithCourse(this.event.section)
      this.section = response.data
      this.course = this.section.course
      this.adjustCourseNameForViewing()
    },
    adjustCourseNameForViewing() {
      if(this.course.name.length > 18){
        this.course.name = this.course.name.slice(0,11)
        this.course.name += "..."
      }
    }
  }
}
</script>

<style scoped>
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
  /*font-size: 2rem;*/
}

.event-card-section {
  /*border: blue solid;*/
  /*margin-left: 0.5rem;*/
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
  color: #466D85;
  font-weight: bold;
}

.course-title {
  font-size: 0.75rem;
  color: #1591C5;
}

#event-section {
  width: 40%;
  text-align: center;
  margin:auto;
}

.event-name {
  font-size: 0.9rem;
  font-weight: bold;
}

.event-location {
  /*text-align: center;*/
  font-size: 0.75rem;
  color: #524e0a;
}

#time-section {
  width: 20%;
  margin-left: 1rem;
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
  color: #FF7B7B;
  font-weight: bold;
}

/*Medium devices (tablets and below)*/
@media (max-width: 1128px) {
  #course-section {
    width: 23%;
  }
}

/*Small devices (phones and below)*/
@media (max-width: 575.98px) {
  .active-event-card {
    padding-left: 0;
  }
  #course-section {
    width: 30%;
  }
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

<template>

  <div>
    <div v-if="!mobileView()">DesktopView</div>
    <div v-if="mobileView()">
      <div class="course-info-container mobile-content-bounds">
        <Section title="Course Info">
          <div class="course-name">{{course_data.name}}</div>
          <div class="below-course-name">
            <div class="course-code">{{course_data.course_code}}</div>
            <div class="course-time">3:00pm-3:50pm</div>
          </div>
          <div class="attendance-history-section">
            <div class="plain-title">Attendance History</div>
            <div v-for="month_key of Object.keys(course_data.attendance_history)">
              <div class="plain-subtitle">{{intToMonth(month_key)}}</div>

              <!-- Attendance Pills -->
              <div class="attendance-history-flex">
                <div class="flex-pill" v-for="day_key of Object.keys(course_data.attendance_history[month_key])">
                  <div class="attendance-day">
                    <div :class="course_data.attendance_history[month_key][day_key] == true ? 'day-pill present' : 'day-pill absent'">
                      {{ day_key }}
                    </div>
                  </div>
                  <div class="attendance-result">{{ course_data.attendance_history[month_key][day_key] == true ? 'Present' : 'Absent' }}</div>
                </div>
              </div>

            </div>
          </div>
        </Section>
      </div>
      <div class='footer-btn-area'>
          <div class="mobile-content-bounds-strong">

            <div class='attend-btn'>
              Not In Session
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Section from './Section'

export default {
  name: 'CourseInfo',
  props: {
    mobileView: Function
  },
  components: {
    Section
  },
  data () {
    return {
      course_data: {
        name: "Intro to AI",
        course_code: "CSCI 4020",
        time_start: 10,
        time_end: 12,
        days: [1,3,5], // mon, wed, fri ... 0=sunday, 6=saturday,
        attendance_history: {
          // each key is an index of the month. 0 = january, 11=december
          // the keys of each object is just the day of the month
          0: {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: true, 8: false},
          1: {1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: true, 8: false},
        }
      }
    }
  },
  methods: {
    intToMonth (x) {
      if (x >= 12) return 'none'
      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return months[Math.floor(x)]
    }
  }
}
</script>

<style>
.course-info-container .course-name {
  font-size: 35px;
}

.course-info-container .below-course-name {
  display: flex;
  font-size: 12px;
}

.course-info-container .below-course-name .course-code {
  background-color: #393939;
  color: white;
  box-sizing: border-box;
  padding: 0 10px;
  height: 26px;
  line-height: 26px;
  border-radius: 3px;
}
.course-info-container .below-course-name .course-time {
  margin: 0 20px;
  height: 26px;
  line-height: 26px;
}

.course-info-container .attendance-history-section .plain-title {
  font-size: 20px;
  margin: 20px 0px;
}
.course-info-container .attendance-history-section .plain-subtitle {
  font-size: 15px;
  margin: 20px 10px;
}

.course-info-container .attendance-history-section .attendance-history-flex {
  width: 100%;
}

.course-info-container .attendance-history-section .attendance-history-flex .flex-pill {
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  height: 40px;
}

.course-info-container .attendance-history-section .attendance-history-flex .attendance-day,
.course-info-container .attendance-history-section .attendance-history-flex .attendance-result {
display: inline-block;
}

.course-info-container .attendance-history-section .attendance-history-flex .attendance-day {
  width: 20%;
}

.course-info-container .attendance-history-section .attendance-history-flex .attendance-day .day-pill {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  position: relative;
  top: 5px;
  text-align: center;
  color: white;
  border-radius: 3px;
}

.course-info-container .attendance-history-section .attendance-history-flex .attendance-day .day-pill.present {
background-color: #58DE85;
}

.course-info-container .attendance-history-section .attendance-history-flex .attendance-day .day-pill.absent {
background-color: #E36064;
}

.course-info-container .attendance-history-section .attendance-history-flex .attendance-result {
  background-color: pink;
  width: 75%;
  height: 30px;
  line-height: 30px;
  background-color: white;
  position: relative;
  top: 5px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.07);
  text-align: center;
  border-radius: 3px;
}

.footer-btn-area {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: white;
  height: 110px;
}

.footer-btn-area .attend-btn {
  background-color: #A7A7A7;
  font-weight: bold;
  color: white;
  font-size: 15px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
}
</style>

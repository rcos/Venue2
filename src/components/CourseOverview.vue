<template>
  <div v-if="course" id="course-overview">
    <h2>{{course.name}}</h2>
    <h5>{{course.prefix}} {{course.suffix}}</h5>
    <br>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Instructors</label>
        </div>
      </div>
      <div class="col-md-5">
        <div class="form-group">
          <div v-for="(instructor, i) in instructors" :key="i">
            <div class="form-control">{{instructor.first_name}} {{instructor.last_name}} 
            <!-- <a href="mailto: {{instructor.email}}"><img src="https://img.icons8.com/fluent-systems-regular/24/000000/send-mass-email.png"/></a> -->
            </div>
          </div>
        </div>
      </div>
    </div><br>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Lecture Times</label>
        </div>
      </div>
      <div class="col-md-5">
        <div class="form-group">
          <div v-for="(time, i) in sortTimes" :key="i">
            <div class="form-control">{{time.day}} {{convertTime(time.start_time)}} - {{convertTime(time.end_time)}}</div>
          </div>
        </div>
      </div>
    </div><br>
    <div class ="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Meeting URL</label>
        </div>
      </div>
      <div class="col-md-5">
        <div class="form-group">
          <a :href="course.meetingURL" target="_blank">
          <div class="form-control"> {{course.meetingURL}} </div>
          </a>
        </div>
      </div>
    </div><br>
    <div class ="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Syllabus</label>
        </div>
      </div>
      <div class="col-md-5">
        <div class="form-group">
          <!-- Replace with course syllabus PDF link -->
          <a href="https://www.unl.edu/gradstudies/current/teaching/Syllabus_Sample.pdf" target="_blank">
          <div class="form-control">Course Syllabus PDF</div>
          </a>
        </div>
      </div>
    </div><br>
    <hr>
    <div>
      <h4>Announcements</h4>
      <br>
      <button class="btn btn-primary" @click="new_announcement = true">Add new announcement</button>
      <div class="announcement-div" v-if="new_announcement">
          <br>
          <textarea v-model="title" placeholder="Announcement Title" rows=1 cols=80></textarea>
          <textarea v-model="message" placeholder="Add announcement here" cols=80></textarea><br>
          <button class="btn btn-primary" @click="addAnnouncementToCourse">Create</button>
          <button class="btn btn-primary" @click="new_announcement = false">Cancel</button>
      </div>
      <!-- <div class="form-group">
        <input v-for="(announcement, i) in course.announcements" :key="i" class="form-control" :value="announcement.message" rows="5" readonly>
      </div> -->
      <br>
      <br>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>November 22, 2020 3:00 PM</label> <!--Replace with posted time-->
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group">
            <vsa-list>
              <!-- Add v-for to loop through announcements  -->
              <vsa-item>
                <vsa-heading>
                  Homework 4 Deadline Extended
                </vsa-heading>
                <vsa-content>
                  Due to changes in our schedule, the deadline for Homework 4 has been extended to next Tuesday, November 30th. Please let me know if you have any questions.
                </vsa-content>
              </vsa-item>
            </vsa-list>
          </div>
        </div>
      </div>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';
  import Instructors from '@/components/admin/User/Instructors'
  import {
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
    VsaIcon
    } from 'vue-simple-accordion';
  import 'vue-simple-accordion/dist/vue-simple-accordion.css';

  export default {
    name: 'CourseOverview',
    components: {
      Instructors,
      VsaList,
      VsaItem,
      VsaHeading,
      VsaContent,
      VsaIcon
    },
    props: {
    },
    data(){
      return {
        current_user: {},
        announcements: {},
        new_announcement: false,
        course: {},
        instructors: [],
        message: "",
        first_name: "",
        last_name: "",
        waiting: false
      }
    },
    created() {
    this.getCurrentCourse()
    this.getCurrentUser()
    },
    computed: {
      sortTimes() {
        function getIndex(day) {
          if (day == "Sunday") {return 0;}
          if (day == "Monday") {return 1;}
          if (day == "Tuesday") {return 2;}
          if (day == "Wednesday") {return 3;}
          if (day == "Thursday") {return 4;}
          if (day == "Friday") {return 5;}
          if (day == "Saturday") {return 6;}
        }
        function compare(a, b) {
          let aDay = getIndex(a.day);
          let bDay = getIndex(b.day);
          if (aDay < bDay )
            return -1;
          if (aDay > bDay)
            return 1;
          if (aDay == bDay) {
             if (a.start_time < b.start_time)
              return -1;
            if (a.start_time > b.start_time)
              return 1;
          }
          return 0;
        }
        if(this.course.course_times) {
          return this.course.course_times.sort(compare);
        }
        return []
      }
    },
    methods: {
      getCurrentUser() {
        this.current_user = this.$store.state.user.current_user
        this.first_name = this.$store.state.user.current_user.first_name
        this.last_name = this.$store.state.user.current_user.last_name
      },
        async getCurrentCourse() {
          let course_id = this.$route.params.id
          const response = await CourseAPI.getCourse(course_id)
          this.course = response.data
          this.getCurrentCourseInstructor()
        },
        async getCurrentCourseInstructor(){
          const response = await UserAPI.getInstructorsForCourse(this.course._id)
          if(response.data)
          this.instructors = response.data
        },
        convertTime(time) {
        if (time == '' || time == undefined || time == null) return ''
        let newTime = time.split(":")
        let hours = parseInt(newTime[0])
        let mod = hours / 12
        let ampm = "am"
        if (mod > 1) {
          ampm = "pm"
          hours = hours - 12
        }
        if (mod == 1) {
          ampm = "pm"
        }
        if (hours == 0){
          hours = 12
        }
        let mins = newTime[1]
        return `${hours}:${mins} ${ampm}`
      },
        async addAnnouncementToCourse(evt) {
          this.waiting = true
          let current_date = new Date()
          let current_user = this.first_name + " " + this.last_name
          let announcements = {
            message: this.message,
            date: current_date,
            name: current_user
          }
          const response = await CourseAPI.addAnnouncement(this.course._id, announcements)
          // await CourseAPI.addAnnouncement(this.course_id, announcements).then(res => {
          //   this.waiting = false
          //   let course_id = this.$route.params.id
          //   this.course.announcements = this.announ
          // }) 
          location.reload()
        },
      },
    }
</script>

<style scoped>

.form-group {
	margin-top: 1rem;
}

hr {
    border-top: 2px solid #3E8FCE;
    width: 95%;
}

.vsa-list {
  --vsa-max-width: 750px;
  --vsa-min-width: 100px;
  --vsa-text-color:#4B5154;
  --vsa-highlight-color: #3E8FCE;
  --vsa-bg-color: #FFFFFF;
  --vsa-border-color: #8F9091;
  --vsa-border-width: 1px;
  --vsa-border-style: solid;
  --vsa-heading-padding: 0 0.5rem;
  --vsa-content-padding: 0.5rem 0.5rem;
  --vsa-default-icon-size: 0.3;
}

</style>
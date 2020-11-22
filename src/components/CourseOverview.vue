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
            <!-- <a href="mailto: wangx45@rpi.edu"><img src="https://img.icons8.com/fluent-systems-regular/24/000000/send-mass-email.png"/></a> -->
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
          <div class="form-control">Monday 2:00 PM</div>
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
          <textarea v-model="message" placeholder="Add announcement here"></textarea>
          <button class="btn btn-primary" @click="addAnnouncementToCourse">Create</button>
          <button class="btn btn-primary" @click="new_announcement = false">Cancel</button>
      </div>
      <div class="form-group">
        <input v-for="(announcement, i) in course.announcements" :key="i" class="form-control" :value="announcement.message" rows="5" readonly>
      </div>
    </div>
  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';
  import Instructors from '@/components/admin/User/Instructors'

  export default {
    name: 'CourseOverview',
    components: {
        Instructors
    },
    props: {
    },
    data(){
      return {
        new_announcement: false,
        course: {},
        instructors: [],
        message: ''
      }
    },
    created() {
		this.getCurrentCourse()
    },
    methods: {
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
        async addAnnouncementToCourse() {
            Course.API.addAnnouncement(this.course_id, this.message).then(res => {
              location.reload()
            })
        }
    }
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
</style>
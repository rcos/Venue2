<template>
  <div v-if="course" id="course-overview">
    <h2>{{course.name}}</h2>
    <div>
        <label> Instructors </label>
        <!-- maybe write a function to turn all instructors into one string its ugly rn -->
        <ul>
            <li v-for="(instructor, i) in instructors" :key="i">
                {{instructor.first_name}} {{instructor.last_name}}
            </li>
        </ul>
    </div>

     <div>
        <label> Lecture Times </label>
        <!-- there are currently no times because course_settings is still in PR LOL so here are some fake ones -->
        <ul>
            <li>Monday 2:00pm</li>
            <li>Wednesday 3:00pm</li>
            <li>Thursday 2:00pm</li>
        </ul>
    </div>

    <div>
        <label>Announcements</label><br>
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
</style>
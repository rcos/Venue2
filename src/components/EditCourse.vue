<template>
  <div id="edit-course">
    <h2>Edit Course</h2>
    <form @submit.prevent="updateCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
<<<<<<< HEAD
            <label>Name</label>
            <input type="text" class="form-control" v-model="edited_course_name" :placeholder="course.name"/>
=======
            <label>name</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" class="form-control" v-model="course.name">
>>>>>>> master
          </div>
        </div>
        <div class="col-md-6">
            <div>
              <label>Meeting URL</label>
              <input class="form-control" type="url" name="meetingURL" placeholder="Enter Meeting URL" size=75>
            </div>
          </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
<<<<<<< HEAD
            <label>Dept</label>
            <input class="form-control" v-model="edited_dept_name" :placeholder="course.prefix"/>
=======
            <label>dept</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input class="form-control" v-model="course.prefix" rows="5">
>>>>>>> master
          </div>
        </div>
        <div class="col-md-6">
          <label>Snooze</label>
          <input class="form-control" v-model="edited_snooze" :placeholder="course.snooze" rows="5">
          <br>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
<<<<<<< HEAD
            <label>Number</label>
=======
            <label>number</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
>>>>>>> master
            <input class="form-control" v-model="course.suffix" rows="5">
          </div>
        </div>
          <div class="col-md-6">
            <label>Lecture Times</label>
            <!-- <input class="form-control" v-model="course.prefix" rows="5" readonly> -->
            <input v-for="time in course.course_times" :key="time.day" class="form-control" :value="time.day + ': ' + time.start_time + ' - ' +  time.end_time" rows="5" readonly>
            <br>
            <router-link :to="{name: 'new_lecture_time', params: { id:course._id}}">
              <button class="btn btn-primary">Add Time</button>
            </router-link>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
<<<<<<< HEAD
            <label>Instructors</label>
            <input v-for="(instructor,i) in instructors" :key="i" class="form-control" :value="instructor.first_name + ' ' + instructor.last_name" rows="5" readonly>
            <br>
            <label>Add instructors by email</label>
            <input type="text" v-model="instructors_to_add"/>
            <button type="button" @click="addInstructorsToCourse()">Update</button>
            <br>
=======
            <label>instructors</label>
>>>>>>> master
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input v-for="(instructor,i) in instructors" :key="i" class="form-control" :value="instructor.first_name + ' ' + instructor.last_name" rows="5" readonly>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" id="update-course-btn" @click="updateCourse()">Update</button>
      </div>
    </form>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Add instructors by email</label>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <input type="text" v-model="instructors_to_add"/>
          <button type="button" @click="addInstructorsToCourse()">Update</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <router-link v-for="section in sections" :key="section._id" :to="{name: 'edit_section', params: { id: section._id }}">
              <button class="btn btn-secondary">Edit Section {{section.name}}</button>
          </router-link>
          <router-link :to="{name: 'new_section', params: { id: course._id }}">
              <button class="btn btn-primary">New Section</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';
  import SectionAPI from '@/services/SectionAPI.js';
  import UserAPI from '@/services/UserAPI.js';
  import Instructors from '@/components/admin/User/Instructors'

  export default {
    name: 'EditCourse',
    components: {
      Instructors
    },
    data() {
      return {
        course: {},
        instructors: [],
        sections: [],
        instructors_to_add: ""
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
        this.getCurrentCourseSections()
      },
      async getCurrentCourseInstructor(){
        const response = await UserAPI.getInstructorsForCourse(this.course._id)
        if(response.data)
          this.instructors = response.data
      },
      async getCurrentCourseSections(){
        const response = await SectionAPI.getSectionsForCourse(this.course._id)
        if(response.data)
          this.sections = response.data
      },
      async updateCourse() {
        let course_id = this.$route.params.id
        this.course.instructors = this.instructors.map(a=>a.email)
        const response = await CourseAPI.updateCourse(course_id, this.course)
        location.reload()
      },
      addInstructorsToCourse() {
        let insts = this.instructors_to_add.split(',')
        if(insts.length) {
          CourseAPI.addInstructors(this.course._id,insts).then(res => {
            location.reload()
          })
        }
      },
      // async updateCourse() {
      //   this.waiting= true
      //   if (this.edited_course_name != '')
      //     this.course.name = this.edited_course_name
      //   else 
      //     this.course.name = this.course.name
      //   if (this.edited_dept_name != '')
      //     this.course.prefix = this.edited_dept_name
      //   else 
      //     this.course.prefix = this.course.prefix

      //   CourseAPI.updateCourse(this.course._id, this.course).then(res => {
      //     this.$store.dispatch('updateCurrentCourse', {token: this.$store.state.course.token, course: this.course})
      //     this.edited_course_name = ''
      //     this.edited_dept_name = ''
      //     this.waiting = false
      //   })
      // }
    }
  }
</script>

<style scoped>
#edit-course {
  padding: 2rem;
  max-width: 80rem;
  margin: auto;
}
.btn {
  margin: 0.5rem 0.25rem 0rem 0rem;
}
#update-course-btn {
  margin: 2rem;
}
</style>
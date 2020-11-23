<template>
  <div id="edit-course">
    <h1>Edit Course</h1>
    <form @submit.prevent="updateCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>name</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" class="form-control" v-model="course.name">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>dept</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input class="form-control" v-model="course.prefix" rows="5">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>number</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input class="form-control" v-model="course.suffix" rows="5">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Meeting URL</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input class="form-control" type="url" v-model="edited_course_url" :placeholder="course.meetingURL" rows=5>
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Snooze Duration (Coming soon)</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <select v-model="course.snooze" class="form-control" aria-labelledby="section_select_label" disabled>
              <option v-for="(time,i) in ['None','15 Minutes','30 Minutes','45 Minutes','60 Minutes']" :key="i" :value="time">{{time}} </option>
            </select>
          </div>
          <br>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Lecture Times (Coming soon)</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <!-- <div v-for="(time, i) in sortTimes(course.course_times)" :key="i"> -->
              <div v-for="(time, i) in sortTimes" :key="i">
                 <div class="form-control">{{time.day}} {{convertTime(time.start_time)}} - {{convertTime(time.end_time)}} <button class="btn"  @click="removeElement(time)"><img class="red-x btn-prima" id="delete-time" src="@/assets/icons8-delete.svg" alt="Delete" width="20" aria-label="Delete"></button> </div>
            </div>
             <div >
            <router-link :to="{name: 'new_lecture_time', params: { id: course._id}}">
              <button class="btn btn-primary" disabled>Add Time</button>
            </router-link>
          </div>
        </div>
       </div>
      </div><br />
    
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Instructors</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input v-for="(instructor,i) in instructors" :key="i" class="form-control" :value="instructor.first_name + ' ' + instructor.last_name" rows="5" readonly>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" id="update-course-btn">Update</button>
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
    <h2>Sections</h2>
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <button v-if="sections.find(a=>a.is_public)" class="btn btn-primary" :style="{margin: '5px'}" @click="closeSections">Make All Private</button>
          <button v-if="sections.find(a=>!a.is_public)" class="btn btn-primary" :style="{margin: '5px'}" @click="openSections">Make All Publicly Joinable</button>
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
      closeSections() {
        let close = this.sections.filter(a=>a.is_public)
        if (window.confirm("Are you sure you want to turn all sections to private?")) {
          CourseAPI.turnSectionsOff(close, this.course._id).then(res=> {
            location.reload()
          })
        }
      },
      openSections() {
        let open = this.sections.filter(a=>!(a.is_public))
        if (window.confirm("Are you sure you want to turn all sections to public?")) {
          CourseAPI.turnSectionsOn(open, this.course._id).then(res=> {
            location.reload()
          })
        }
      },
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
      }
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
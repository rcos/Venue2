<template>
  <div id="edit-course">
    <h2>Edit Course</h2>
    <form @submit.prevent="updateCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>name</label>
            <input type="text" class="form-control" v-model="course.name">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>dept</label>
            <input class="form-control" v-model="course.prefix" rows="5">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>number</label>
            <input class="form-control" v-model="course.suffix" rows="5">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>instructors</label>
            <input v-for="(instructor,i) in instructors" :key="i" class="form-control" :value="instructor.first_name + ' ' + instructor.last_name" rows="5" readonly>
            <label>Add instructors by email</label>
            <input type="text" v-model="instructors_to_add"/>
            <button type="button" @click="addInstructorsToCourse()">Update</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
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
      <div class="form-group">
        <button class="btn btn-primary" id="update-course-btn">Update</button>
      </div>
    </form>
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
        this.course.instructors = this.instructors.map(a=>a._id)
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
}
#update-course-btn {
  margin: 2rem;
}
</style>
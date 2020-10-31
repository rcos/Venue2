<template>
  <div v-if="course" id="new-lecture-time">
    <h2>Add Lecture Time</h2>
    <form @submit.prevent="updateCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Course Name</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" class="form-control" v-model="course.name" readonly rows="5">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Day</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" class="form-control" v-model="new_day">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Start Time</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" class="form-control" v-model="new_start">
          </div>
        </div>
      </div><br />
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>End Time</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <input type="text" class="form-control" v-model="new_end">
          </div>
        </div>
      </div><br />
    
      <div class="row">
          <div class="form-group col-md-5 float-right">
            <button class="btn btn-primary " style="position:absolute">Add Time</button>
          </div>
      </div>
    </form>

  </div>
</template>

<script>
  import UserAPI from '@/services/UserAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';

  export default {
    name: 'NewLectureTime',
    props: {
    },
    data(){
      return {
        course: null,
				course_times: {}
      }
    },
    created() {
			CourseAPI.getCourse(this.$route.params.id).then(res => {
				this.course = res.data
			})
    },
    methods: {
      async addTime(evt){
        evt.preventDefault() // prevents the form's default action from redirecting the page
        this.course_times.course = this.course._id
        const response = await CourseAPI.addTime(this.course_times)
        this.$router.push({name: 'edit_course',params: {id: this.course._id}})
				location.reload()
      }
    }
  }
</script>

<style scoped>
#new-lecture-time {
	padding: 2rem;
}
.form-group {
	margin-top: 1rem;
}
</style>
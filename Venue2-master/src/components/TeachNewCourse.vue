<template>
  <div>
    <h2>Teach New Course</h2>
    <form @submit.prevent="addCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="course.name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Prefix / Dept</label>
              <input class="form-control" v-model="course.prefix">
            </div>
          </div>
        </div><br />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Suffix / Number</label>
              <input type="number" class="form-control" v-model="course.suffix">
            </div>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>

  <!-- Showing Instructors -->

  </div>
</template>

<script>
  import CourseAPI from '@/services/CourseAPI.js';
  import UserAPI from '@/services/UserAPI.js';

  export default {
    name: 'TeachNewCourse',
    components: {
    },
    data(){
      return {
        course: {}
      }
    },
    created() {
    },
    methods: {
      addCourse(evt){
        evt.preventDefault();
        CourseAPI.addCourse(this.course).then(res => {
          CourseAPI.addInstructors(res.data._id,[this.$store.state.user.current_user.email]).then(res2 => {
            this.$router.push({name: 'dashboard'});
            location.reload()
          })
        });
      }
    }
  }
</script>courses
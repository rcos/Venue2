<template>
  <div v-if="course" id="new-section">
    <h2>Add Section</h2>
    <form @submit.prevent="addSection">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>course:</label>
            <input type="text" class="form-control" v-model="course.name" readonly>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>section's name:</label>
            <input type="text" class="form-control" v-model="section.name">
          </div>
          <div class="form-group">
            <button class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js';
  import UserAPI from '@/services/UserAPI.js';
  import CourseAPI from '@/services/CourseAPI.js';

  export default {
    name: 'NewSection',
    props: {
    },
    data(){
      return {
        course: null,
				section: {}
      }
    },
    created() {
			CourseAPI.getCourse(this.$route.params.id).then(res => {
				this.course = res.data
			})
    },
    methods: {
      async addSection(evt){
        evt.preventDefault() // prevents the form's default action from redirecting the page
        this.section.course = this.course._id
        const response = await SectionAPI.addSection(this.section)
        this.$router.push({name: 'edit_course',params: {id: this.course._id}})
				location.reload()
      }
    }
  }
</script>

<style scoped>
#new-section {
	padding: 2rem;
}
.form-group {
	margin-top: 1rem;
}
</style>
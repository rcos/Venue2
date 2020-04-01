<template>
  <router-link :to="{name: 'course_info', query: { course: course }}">
    <div class="course-card">
    	<div class="color-box" v-bind:class="{
        'blue-box':box_color == 'blue', 
        'red-box':box_color == 'red', 
        'orange-box':box_color == 'orange',
        'green-box':box_color == 'green',
        'purple-box':box_color == 'purple'}"></div>
      <div v-if="is_instructor" class="course-info">
        <div class="course-title">{{ course.dept }} {{ course.course_number }}</div>
        <div v-if="course.name.length > 21" class="course-name">{{ course.name.substring(0,18) + "..." }}</div>
        <div v-else class="course-name">{{ course.name }}</div>
      </div>
      <div v-else class="course-info">
        <div class="course-title">{{ section.course.dept }} {{ section.course.course_number }}-{{ section.number }}</div>
        <div v-if="section.course.name.length > 21" class="course-name">{{ section.course.name.substring(0,18) + "..." }}</div>
        <div v-else class="course-name">{{ section.course.name }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>

  export default {
    name: 'CourseCard',
    props: {
      course: Object,
      section: Object,
      box_color: String
    },
    computed: {
    },
    components: {

    },
    data(){
      return {
        is_instructor: Boolean
      }
    },
    created() {
      this.is_instructor = this.$store.state.user.current_user.is_instructor
    },
    methods: {
    }
  }
</script>

<style scoped>
.course-card {
	display: inline-block;
	margin-left: 2rem;
  margin-top: 1rem;
	/*width: 16rem;*/
  width: 20rem;
	height: 3rem;
  padding-top: 0.7rem;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.07);
  border-radius: 3px;
  cursor: pointer;
  transition: background-color, box-shadow, width, 0.25s;
}

.course-card:hover {
  background-color: #e8e8e8;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.3);
}

.color-box {
	border-radius: 3px;
	width: 1.5rem;
	height: 1.5rem;
	margin-left: 0.5rem;
  display: inline-block;
  vertical-align: top;
}

.blue-box {
  background-color: #516ded;
}

.green-box {
  background-color: #4bcc69;
}

.red-box {
  background-color: #FC5D60;
}

.purple-box {
  background-color: #B77DC2;
}

.orange-box {
  background-color: #f29f33;
}

.course-info {
  display: inline-block;
  width: 80%;
  height: 1.5rem;
  margin-left: 0.5rem;
}

.course-title {
  float: left;
  display: inline-block;
  font-size: 0.7rem;
  vertical-align: middle;
  color: #1591C5;
  margin-top: 0.3rem;
}

.course-name {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.85rem;
}

/*Desktop*/
@media (min-width: 1200px) {
  .course-card:hover {
    width: 22rem;
  }
}

/*Medium devices (tablets and below)*/
@media (max-width: 1128px) {
  .course-card {
    width: 21rem;
    margin-top: 2.5rem;
  }
}

/*Small devices (phones and below)*/
@media (max-width: 575.98px) {
  .course-card {
    margin: auto;
    margin-top: 2.5rem;
  }
}
</style>
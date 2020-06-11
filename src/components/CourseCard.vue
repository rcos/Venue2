<template>
  <div class="course_card_container">
    <div v-if="is_instructor">
      <router-link class="course_card_link" :to="is_instructor ? {name: 'course_info', params: { id: course._id }} : {name: 'course_info', params: { id: section._id }}"
      :aria-label="'Course Info - '+course.name+' - '+course.dept+' '+course.course_number" tabindex="0">
        <div v-if="mobile" class="course-card-mobile">
          <div class="color-box"  :style="{backgroundColor: box_color}"></div>
          <div class="course-info">
            <div class="course-title">{{ course.dept }} {{ course.course_number }}</div>
            <div v-if="course.name.length > 21" class="course-name">{{ course.name.substring(0,18) + "..." }}</div>
            <div v-else class="course-name">{{ course.name }}</div>
          </div>
        </div>
        <div v-else class="course-card">
          <div class="color-box" :style="{backgroundColor: box_color}"></div>
          <div class="course-info">
            <div class="course-title">{{ course.dept }} {{ course.course_number }}</div>
            <div v-if="course.name.length > 21" class="course-name">{{ course.name.substring(0,18) + "..." }}</div>
            <div v-else class="course-name">{{ course.name }}</div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else>
      <router-link class="course_card_link" :to="is_instructor ? {name: 'course_info', params: { id: course._id }} : {name: 'course_info', params: { id: section._id }}"
      :aria-label="'Course Info - '+section.course.name+' - '+section.course.dept+' '+section.course.course_number" tabindex="0">
        <div v-if="mobile" class="course-card-mobile">
          <div class="color-box"  :style="{backgroundColor: box_color}"></div>
          <div class="course-info">
            <div class="course-title">{{ section.course.dept }} {{ section.course.course_number }}-{{ section.number }}</div>
            <div v-if="section.course.name.length > 21" class="course-name">{{ section.course.name.substring(0,18) + "..." }}</div>
            <div v-else class="course-name">{{ section.course.name }}</div>
          </div>
        </div>
        <div v-else class="course-card">
          <div class="color-box" :style="{backgroundColor: box_color}"></div>
          <div class="course-info">
            <div class="course-title">{{ section.course.dept }} {{ section.course.course_number }}-{{ section.number }}</div>
            <div v-if="section.course.name.length > 21" class="course-name">{{ section.course.name.substring(0,18) + "..." }}</div>
            <div v-else class="course-name">{{ section.course.name }}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'CourseCard',
    props: {
      course: Object,
      section: Object,
      box_color: String,
      mobile: {
        type: Boolean,
        default: false
      }
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
.course_card_container {
  min-width: 40%;
  display: inline-block;
  margin: 1rem;
}
.mobile-justify-div .course_card_container {
  width: 80%;
}
.course-card {
	display: inline-block;
	height: 3rem;
  width: 100%;
  line-height: 3rem;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.25s, box-shadow 0.25s, width, 0.25s, border 0.25s;
  color: rgba(0, 0, 0, 0.81);
  border: 1px solid rgba(107, 163, 195, 0.7);
}

.course-card:hover,
.course_card_link:focus .course-card {
  border: 1px solid rgba(85, 136, 166, 1);
  box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.2);
}

.course_card_link:focus {
  outline: none;
}

.course-card-mobile {
	height: 50px;
  vertical-align: top;
  min-width: 90%;
  margin: 2rem auto;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.25s, box-shadow 0.25s, width, 0.25s, border 0.25s;
  color: rgba(0, 0, 0, 0.81);
  border: 1px solid rgba(107, 163, 195, 0.7);
}

.course-card-mobile:hover,
.course_card_link:focus .course-card-mobile {
  border: 1px solid rgba(85, 136, 166, 1);
  box-shadow: 0px 0px 10px 7px rgba(0, 0, 0, 0.2);
}

.course-card-mobile .course-title {
  font-size: 1rem;
}

.course-card-mobile .course-info {
  display: inline-block;
  width: 80%;
  height: 1.5rem;
  text-align: left;
}

.course-card-mobile .course-info div {
  vertical-align: top;
  position: relative;
  top: 10px;
}

.course-card-mobile .course-title {
  width: 30%;
  text-align: center;
}

.course-card-mobile .course-name {
  font-size: 1.2rem;
}

.color-box {
	border-radius: 3px;
	width: 1rem;
	height: 1rem;
	margin-left: 1rem;
  display: inline-block;
  vertical-align: top;
  margin-right: 0.5rem;
  position: relative;
  top: 20px;
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
  text-align: left;
}

.course-title {
  display: inline-block;
  font-size: 0.7rem;
  color: rgb(14, 96, 131);
}

.course-name {
  display: inline-block;
  margin-left: 0.85rem;
  font-size: 0.9rem;
}
</style>

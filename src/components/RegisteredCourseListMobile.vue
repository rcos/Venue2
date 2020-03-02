<template>
  <div>
    <a :href="'/courses/' + course.name" v-for="course of course_info">
      <div class="registered-course-mobile">
        <div class="tablet">
          <div class="color-identifier-area">
            <div class="color-identifier"></div>
          </div>
          <div class="course-code">{{course.course_code}}</div>
          <div class="course-name">{{course.name}}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'RegisteredCourseListMobile',
  props: {
    course_info: Array
  }
}
</script>

<style>
.registered-course-mobile {
  height: 80px;
}
.registered-course-mobile .tablet {
  height: 60px;
  line-height: 60px;
  position: relative;
  top: 10px;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.07);
  background-color: white;
  display: flex;
  border-radius: 5px;
}

.registered-course-mobile .tablet .color-identifier-area {
  width: 20%;
}

.registered-course-mobile .tablet .color-identifier-area .color-identifier {
  width: 20px;
  height: 20px;
  background-color: #FC5D60;
  margin: 0 auto;
  position: relative;
  top: 20px;
  border-radius: 5px;
}

.registered-course-mobile .tablet .course-code {
  width: 25%;
  text-align: left;
  color: #1591C5;
}

.registered-course-mobile .tablet .course-name {
  width: 55%;
  color: rgba(0, 0, 0, 0.7);
}
</style>

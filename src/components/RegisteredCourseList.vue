<template>
  <div>
    <div class="course-tablet" v-for="course of course_info">
      <div class="tablet">
        <div class="color-identifier"></div>
        <div class="course-data">
          <div class="course-name">{{course.name}}</div>
          <div class="course-code">{{course.course_code}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisteredCourseList',
  props: {
    course_info: Array
  }
}
</script>

<style>
.course-tablet {
  width: 250px;
  display: inline-block;
  height: 75px;
}

.course-tablet .tablet {
  background-color: white;
  width: 90%;
  margin: 0 auto;
  height: 55px;
  position: relative;
  top: 10px;
  background-color: white;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.07);
}

.course-tablet .tablet .color-identifier {
  background-color: #B77DC2;
  width: 20px;
  height: 20px;
  position: relative;
  top: 17px;
  margin: 0px 15px;
  border-radius: 3px;
}

.course-tablet .tablet .color-identifier,
.course-tablet .tablet .course-data {
  display: inline-block;
  vertical-align: top;
}

.course-tablet .tablet .course-data {
  width: 85%;
  margin-left: 50px;
  position: relative;
  top: -20px;
}

.course-tablet .tablet .course-data .course-code {
  font-size: 12px;
  color: #1591C5;
}

.course-tablet .tablet .course-data .course-name {
  font-size: 14px;
  margin-top: 3px;
}
</style>

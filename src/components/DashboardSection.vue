<template>
  <div id="infosection">
    <h1 v-if="active_section" class="section-title">Active</h1>
    <h1 v-else-if="courses_section" class="section-title">Courses</h1>
    <h1 v-else-if="upcoming_section" class="section-title">Upcoming</h1>
    
<!--     <div class='course-modal-temp'>
      <div class="title">Intro to AI</div>
      <div class="course-code">CSCI 4200</div>
      <div class='time-left'>Time Remaining: 42m</div>
    </div>
 -->
  </div>
</template>

<script>

  export default {
    name: 'DashboardSection',
    props: {
      active_section: Boolean,
      courses_section: Boolean,
      upcoming_section: Boolean
    },
    computed: {
    },
    components: {
    },
    data(){
      return {
      }
    },
    created() {
    },
    methods: {

    }
  }
</script>

<style scoped>
#infosection {
  border: red solid;
  margin-top: 2rem;
  text-align: left;
  padding: 1rem;
  padding-left: 2rem;
}

.section-title {

}
/*
.course-modal-temp {
  width: 200px; height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: border 0.25s;
  display: inline-block;
  vertical-align: top;
  margin: 10px;
}

.course-modal-temp:hover {
  border: 1px solid rgba(0, 0, 0, 0.6);
}

.course-modal-temp .time-left {
  font-size: 12px;
  color: #b54545;
  font-weight: bold;
}

.course-modal-temp .title {
  font-size: 20px;
}

.course-modal-temp .course-code {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}*/
</style>
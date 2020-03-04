<template>
  <div class="info-container">
    <div v-if="course_info">
      <div>{{ section.course.dept }} {{ section.course.course_number }}-{{ section.number }}</div>
      <div class="percentage-text">67% attendance</div>
      <div class="progress pg-bar">
        <div class="progress-bar bg-success " role="progressbar" style="width:67%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
    <div v-else-if="active_event_info">
      <div class="title">Lecture 2/29</div>
      <div class="course-code">CSCI 4200-01</div>
      <div class='time-left'>Time Remaining: 42m</div>
    </div>
    <div v-else-if="upcoming_event_info">
      <div class="title">Museum Tour</div>
      <div class="course-code">CSCI 4200-01</div>
      <div class="percentage-text">2/22/20</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'InfoContainer',
    props: {
      course_info: Boolean,
      active_event_info: Boolean,
      upcoming_event_info: Boolean,
      section: {}
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

.info-container {
  width: 11rem; 
  height: 6rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  /*box-sizing: border-box;*/
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: border 0.25s;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}

.info-container:hover {
  border: 1px solid rgba(0, 0, 0, 0.6);
}

.info-container .time-left {
  font-size: 12px;
  color: #b54545;
  font-weight: bold;
}

.info-container .title {
  font-size: 1.25rem;
}

.info-container .course-code {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
}

.percentage-text {
  font-size: 0.9rem;
  color: #828282;
}

.pg-bar {
  margin-top: 0.5rem;
}
</style>
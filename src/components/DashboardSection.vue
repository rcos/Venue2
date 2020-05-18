<template>
  <div class="dashboard-section custom-scrollbar" v-bind:class="{'active-section':active_section, 'today-section':today_section,
    'courses-section':courses_section}">
    <!-- Active Section -->
    <div v-if="active_section">
      <h4 class="section-title">Active</h4>
      <ActiveEventList />
    </div>
    <!-- Today Section -->
    <div v-else-if="today_section">
      <h4 class="section-title">Today's Events</h4>
      <TodaysEventsList />
<!--       <div v-if="todays_events.length > 0">
        <h3 v-for="event in todays_events">{{ event.title }}</h3>
      </div>
      <div v-else>
        <p class="no-container" id="no-today">No events today</p>
      </div> -->
    </div>
    <!-- Courses Section -->
    <div v-else-if="courses_section">
      <div class="courses-section-title">
        <div><h4  class="section-title">Courses</h4></div>
        <div v-if="courses_loaded != 0" class="load-course-size">{{courses_loaded}} {{courses_loaded == 1 ? 'course' : 'courses'}} loaded</div>
      </div>
      <CourseList :sizeCallback="setCourseSize" />
    </div>
  </div>
</template>

<script>
  import {showAt, hideAt} from 'vue-breakpoints'
  import ActiveEventList from '@/components/ActiveEventList.vue'
  import TodaysEventsList from '@/components/TodaysEventsList.vue'
  import CourseList from '@/components/CourseList.vue'

  export default {
    name: 'DashboardSection',
    props: {
      active_section: Boolean,
      courses_section: Boolean,
      today_section: Boolean
    },
    computed: {
    },
    components: {
      hideAt,
      showAt,
      ActiveEventList,
      TodaysEventsList,
      CourseList
    },
    data(){
      return {
        courses_loaded: 0
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
    },
    methods: {
      setCourseSize (_size_) {
        console.log(`Course Size: ${_size_}`)
        this.courses_loaded = _size_
      }
    }
  }
</script>

<style scoped>
.dashboard-section {
  /*border: red solid;*/
  text-align: left;
  margin-top: 4rem;
  display: inline-block;
  vertical-align: top;
  height: 15rem;
  width: 100%;
  margin: 0 8rem;
}

.active-section {
  float: left;
  margin-left: 8rem;
  width: 30rem;
}

.today-section {
  width: 30rem;
  margin-left: -5rem;
}

.courses-section-title div {
  display: inline-block;
  font-family: "Segoe UI";
}

.courses-section {
  display: block;
  margin-top: 2rem;
}

.section-title {
  font-weight: bold;
}

.load-course-size {
  font-size: 1.2rem;
  margin-left: 0.9rem;
  color: rgba(87, 140, 171, 0.8);
}

#no-active {
  margin-left: 3rem;
}

#no-today {
  margin-left: 3rem;
}

#no-courses {
  margin-left: 3rem;
}

/*Medium devices (tablets and below)*/
@media (max-width: 1128px) {
  .dashboard-section {
    text-align: center;
    height: auto;
  }
  .active-section {
    margin-left: 0;
    width: 100%;
  }
  .dashboard-section {
    width: 100%;
  }
  .today-section {
    margin-left: 0;
  }
  #no-active {
    margin-left: auto;
  }
  #no-today {
    margin-left: auto;
  }
}

</style>

<template>
  <div class="dashboard-section" v-bind:class="{'active-section':active_section, 'today-section':today_section,
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
      <h4 class="section-title">Courses</h4>
      <CourseList />
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
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
    },
    methods: {
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

.courses-section {
  display: block;
  margin-left: 8rem;
  margin-top: 2rem;
}

.section-title {
  font-weight: bold;
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
    margin-top: 3rem;
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
<template>
  <div class="dashboard-section" v-bind:class="{'active-section':active_section, 'today-section':today_section,
    'courses-section':courses_section}">
    <!-- Active Section -->
    <div v-if="active_section">
      <h4 class="section-title">Active</h4>
      <div class="dashboard-section-content" v-if="active_events.length > 0">
        <div v-for="event in active_events" class="active-event-card-container">
          <ActiveEventCard v-bind:event="event" />
        </div>
      </div>
      <div v-else>
        <p class="no-container" id="no-active">No active events</p>
      </div>
    </div>
    <!-- Today Section -->
    <div v-else-if="today_section">
      <h4 class="section-title">Today's Events</h4>
      <div v-if="todays_events.length > 0">
        <h3 v-for="event in todays_events">{{ event.title }}</h3>
      </div>
      <div v-else>
        <p class="no-container" id="no-today">No events today</p>
      </div>
    </div>
    <!-- Courses Section -->
    <div v-else-if="courses_section">
      <h4 class="section-title">Courses</h4>
      <CourseList />
    </div>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js'
  import {showAt, hideAt} from 'vue-breakpoints'
  import ActiveEventCard from '@/components/ActiveEventCard.vue'
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
      ActiveEventCard,
      CourseList
    },
    data(){
      return {
        sections: [],
        courses: [],
        active_events: [],
        todays_events: [],
        is_instructor: Boolean
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.is_instructor = this.current_user.is_instructor
      if(this.active_section) {
        this.getActiveEvents()
      }
    },
    methods: {
      async getActiveEvents() {
        let response = await EventAPI.getActiveOrTodaysEventsForUser(this.current_user._id, true)
        this.active_events = response.data
      }
    }
  }
</script>

<style scoped>
.dashboard-section {
  text-align: left;
  margin-top: 4rem;
  display: inline-block;
  vertical-align: top;
  height: 15rem;
}

.dashboard-section-content {
  height: 12.5rem;
  overflow-y: auto;
}

.dashboard-section-content::-webkit-scrollbar {
  width: 12px;
}

.dashboard-section-content::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5; 
}

.active-section {
  float: left;
  margin-left: 8rem;
  width: 30rem;
}

.today-section {
  width: 30rem;
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

.active-event-card-container {
  position: relative;
  width: 75%;
  height: 3.5rem;
  margin-left: 2rem;
  margin-top: 2rem;
  border: #FC5D60 solid;
  border-radius: 5px;
  background-color: #FC5D60;
  cursor: pointer;
  transition: background-color, border, width, 0.25s;
  /*padding-bottom: -5rem;*/
}

.active-event-card-container:hover {
  background-color: #cf4c4f;
  border: #cf4c4f solid;
}

/*Desktop*/
@media (min-width: 1200px) {
  .active-event-card-container:hover {
    width: 78%;
  }
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
  .no-container {
    text-align: center;
  }
  #no-active {
    margin-left: auto;
  }
  #no-today {
    margin-left: auto;
  }
  .active-event-card-container {
    margin: auto;
    margin-top: 2rem;
    width: 50%;
  }
}

/*Small devices (phones and below)*/
@media (max-width: 575.98px) {
  .active-event-card-container {
    width: 80%;
  }
}


</style>
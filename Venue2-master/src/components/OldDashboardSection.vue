<template>
  <div
    class="dashboard-section custom-scrollbar"
    v-bind:class="{
      'active-section': active_section,
      'today-section': today_section,
      'courses-section': courses_section
    }"
  >
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
        <div><h4 class="section-title">Courses</h4></div>
        <div v-if="courses_loaded != 0" class="load-course-size">
          {{ courses_loaded }}
          {{ courses_loaded == 1 ? "course" : "courses" }} loaded
        </div>
      </div>
      <CourseList :sizeCallback="setCourseSize" />
    </div>
  </div>
</template>

<script>
import { showAt, hideAt } from "vue-breakpoints";
import ActiveEventList from "@/components/ActiveEventList.vue";
import TodaysEventsList from "@/components/TodaysEventsList.vue";
import CourseList from "@/components/CourseList.vue";

export default {
  name: "DashboardSection",
  props: {
    active_section: Boolean,
    courses_section: Boolean,
    today_section: Boolean
  },
  computed: {},
  components: {
    hideAt,
    showAt,
    ActiveEventList,
    TodaysEventsList,
    CourseList
  },
  data() {
    return {
      courses_loaded: 0
    };
  },
  methods: {
    setCourseSize(_size_) {
      this.courses_loaded = _size_;
    }
  }
};
</script>

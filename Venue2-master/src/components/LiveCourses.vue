<template>
  <div :class="'dashboard-section-modal ' + (mobileMode ? 'is-mobile' : '')">
    <div class="title">Live</div>
    <div class="center-fill-section" v-if="!loaded">
      <SquareLoader />
    </div>
    <div
      class="center-fill-section"
      v-else-if="data == null || data.length == 0"
    >
      No data.
    </div>
    <div v-else :class="'sub-section ' + (mobileMode ? 'is-mobile' : '')">
      <router-link
        v-for="data_ in data"
        :to="{ name: 'lecture_info', params: { id: data_._id } }"
      >
        <!-- <EventInfoPill
          :courseName="getCourseName(data_)"
          :courseDept="getCourseTitle(data_)"
          :eventLabel="data_.title"
          :rightText="getTimeUntil(data_.end_time)"
          :colorHex="colorCallback(data_.course_info)"
          :mobileMode="mobileMode"
        /> -->
        <ActiveEventCard
          :courseName="getCourseName(data_)"
          :courseDept="getCourseTitle(data_)"
          :eventLabel="data_.title"
          status="ongoing"
          :timeFromNow="data_.end_time"
        />
      </router-link>

      <!-- <ActiveEventCard
        courseName="Sample Course"
        courseDept="TEST"
        eventLabel="123Label"
        eventSublabel="Sample Sublabel"
        status="pending"
       />

       <ActiveEventCard
         courseName="Sample Course"
         courseDept="TEST"
         eventLabel="123Label"
         status="ongoing"
         timeFromNow="2020-05-24T00:00:00.000Z"
        />

        <ActiveEventCard
          courseName="Sample Course"
          courseDept="TEST"
          eventLabel="123Label"
          status="ended"
          timeFromNow="2020-05-24T00:00:00.000Z"
         /> -->
    </div>
  </div>
</template>
<script>
import EventInfoPill from "@/components/EventInfoPill.vue";
import SquareLoader from "@/components/Loaders/SquareLoader.vue";
import ActiveEventCard from "@/components/ActiveEventCard.vue";

import moment from "moment";

export default {
  name: "LiveCourses",
  components: {
    EventInfoPill,
    SquareLoader,
    ActiveEventCard
  },
  props: {
    mobileMode: Boolean,
    data: Array,
    colorCallback: Function,
    loaded: Boolean
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    getTimeUntil(time_string) {
      return moment(time_string).fromNow();
    },
    getCourseName(data_) {
      if (
        data_ == null ||
        data_ == undefined ||
        !data_.hasOwnProperty("course_info")
      )
        return "-----";
      return data_.course_info.name;
    },
    getCourseTitle(data_) {
      if (
        data_ == null ||
        data_ == undefined ||
        !data_.hasOwnProperty("course_info")
      )
        return "-----";
      return data_.course_info.dept + " " + data_.course_info.course_number;
    }
  }
};
</script>

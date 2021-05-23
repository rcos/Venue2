<template>
  <div
    :class="
      'live-course-pill course-pill ' +
        (mobileMode ? 'is-mobile' : 'not-mobile')
    "
  >
    <div class="background-pillar" :style="{ backgroundColor: colorHex }"></div>
    <div class="foreground-pillar">
      <div class="inline-block pill-left">
        <div class="course-name">{{ courseName }}</div>
        <div class="course-dept">{{ courseDept }}</div>
      </div>
      <div class="inline-block pill-center">
        <div class="single-info" v-if="eventSublabel == ''">
          {{ eventLabel }}
        </div>
        <div v-else>
          <div class="double-info primary">{{ eventLabel }}</div>
          <div class="double-info secondary">{{ eventSublabel }}</div>
        </div>
      </div>
      <div class="inline-block pill-right">{{ rightText }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EventInfoPill",
  props: {
    courseName: String,
    courseDept: String,
    eventLabel: String,
    mobileMode: Boolean,
    colorHex: String,
    eventSublabel: {
      type: String,
      default: ""
    },
    rightText: String
  }
};
</script>

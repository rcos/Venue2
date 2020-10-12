<template>
  <a data-toggle="collapse" href="#collapse" class="venue-nav-link" :class="{'active-link':{is_section_info} }" style="cursor:pointer;">
    {whose_course_label} <img src="@/assets/icons8-sort-down-26.png" width="10" height="10" alt="Down Icon" aria-label="Down Icon">
  </a>

  <hide-at breakpoint="mediumAndBelow">
    <div class="dropdown-content">
      <router-link v-for="course in {whose_courses}" :key="course._id" :to="{name: 'course_info', params: { id: course._id }}">
        <p>{{ course.name }}</p>
      </router-link>
    </div>
  </hide-at>

  <show-at breakpoint="mediumAndBelow">
    <div id="all-collapse">
      <div class="collapse" id="collapse" data-parent="#all-collapse">
        <ul class="mobile-course-list">
          <li class="mobile-course-link" href="#collapse" data-toggle="collapse" v-for="course in {whose_courses}" :key="course._id">
            <router-link :to="{name: 'course_info', params: { id: course._id }}">
              <p class="mobile-course-link-name">{{ course.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </show-at>
</template>

<script>
  import {showAt, hideAt} from 'vue-breakpoints'

  export default {
    name: 'DropDown',
    components: {
      hideAt,
      showAt
    },
    props: {
      is_section_info: {
        type: Boolean,
      },
      whose_course_label: {
        type: String,
      },
      whose_courses: {
        type:  Arrays,
      },
    }
  }

</script>

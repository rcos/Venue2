<template>
  <div>

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

  </div>
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

<style scoped>
  .dropdown-content a:hover,
  .dropdown-content a:focus {
    background-color: #466D85;
    color: white;
    outline: none;
    box-shadow: 0px 3px 3px 0px rgba(85, 85, 85, 0.644) inset, 0px -3px 3px 0px rgba(179, 179, 179, 0.644) inset;
    -webkit-transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    -ms-transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .mobile-course-list {
    display: block;
    list-style-type: none;
    padding: 0;
  }

  .mobile-course-link {
    height: 2rem;
    width: 100%;
    display: inline-block;
  }

  .mobile-course-link-name {
    text-decoration: none;

  }

  .venue-nav-link {
    text-decoration: none;
    color: #575757;
    font-weight: 100;
    margin: 0;
    padding: 0;
    height: 2rem;
  }

  .active-link {
    color: #466D85;
  }

  .active-link:hover,
  .active-link:focus {
      color: #575757;
  }

  .active-link-underline {
    height: 0rem;
    width: 0rem;
    background-color: #466D85;
    margin: auto;
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .active-link-underline.active {
    height: 0.15rem;
    width: 80%;
    transition: all 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .venue-nav-link:focus,
  .settings_link:focus {
    outline: none;
  }

  .venue-nav-link:hover,
  .settings_link:hover .mr-2,
  .venue-nav-link:focus,
  .settings_link:focus .mr-2,
  .venue-nav-link:focus p,
  .venue-nav-link:hover p {
    color: #466D85;
  }

  img {
    display: inline-block;
  }

</style>

<template>
  <div>

    <v-for="section in this.whose_courses">
      <p>hsadsad</p>
    <!-- Courses Link -->
    <div id="course-link">

      <a data-toggle="collapse" href="#course-collapse" class="venue-nav-link" :class="{'active-link':this.is_section_info }" style="cursor:pointer;">
        {{whose_course_label}} <img src="@/assets/icons8-sort-down-26.png" width="10" height="10" alt="Down Icon" aria-label="Down Icon">
      </a>

      <hide-at breakpoint="mediumAndBelow">
        <div class="dropdown-content">
        <router-link v-for="section in this.whose_courses" :key="section._id" :to="{name: 'course_info', params: { id: section._id }}">
          <p>{{ section.name }}  {{ section.name }}</p>
        </router-link>
        </div>
      </hide-at>

      <div :class="'active-link-underline ' + ( this.is_section_info?'active':'')"></div>

    </div>


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
        type:  Array,
      },
    },
  }
</script>

<style scoped>

#venue-nav {
  height: 4rem;
  padding: 1rem 0rem;
  position: relative;
  top: 0;
  left: 0;
}

#venue-nav-links {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
}

#breadcrumb-container {
  position: relative;
  margin: 1rem 0rem;
  width: 100%;
  text-align: left;
  padding-left: 4rem;
  font-size: 0.9rem;
}

.crumb {
  display: inline-block;
  margin-right: 0.5rem;
}

#nav-logo {
  margin-left: 1.5rem;
  display: inline-block;
}

.venue-nav-link-container {
  margin-left: 1.5rem;
  display: inline-block;
  border-radius: 0.3rem;
  /* height: 2rem; */
  margin-top: 0.5rem;
  margin-bottom: 0;
  border-bottom: none;
  transition: border-bottom 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1);
}

.venue-nav-link-container.active {
  border-bottom: 0.2rem solid #466D85;
  transition: border-bottom 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1);
}

#instructor-course-dropdown,
#ta-section-dropdown,
#student-section-dropdown {
  border-radius: 5px;
}

.dropdown-content {
  margin-left: -1rem;
  margin-top: 0.2rem;
  position: absolute;
  /* background-color: #f7f7f7; */

  z-index: 9999;
  border-radius: 0.5rem;

  /* transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1); */
}

.dropdown-content a {
  opacity: 0;
  color: #2C3E50;
  background-color: #f7f7f7;
  font-weight: bold;
  text-decoration: none;
  display: block;
  max-height: 0px;
  width: 15rem;
  margin: 0px;
  padding: 0px;
  box-shadow: 0px 3px 3px 0px rgba(109, 109, 109, 0.644);
  transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
}

.dropdown-content a:first-of-type {
  border-radius: 0.5rem 0.5rem 0rem 0rem;
}

.dropdown-content a:last-of-type {
  border-radius: 0rem 0rem 0.5rem 0.5rem;
}

.dropdown-content a:not(:first-of-type) {
  border-top: 0.1rem solid rgba(0, 0, 0, 0.15);
}

.dropdown-content a:last-of-type {
  border-radius: 0rem 0rem 0.5rem 0.5rem;
}

.dropdown-content a:only-of-type {
  border-radius: 0.5rem;
}

#instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(1),
#ta-section-dropdown:hover > .dropdown-content a:nth-of-type(1),
#student-section-dropdown:hover > .dropdown-content a:nth-of-type(1),
#instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(1),
#ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(1),
#student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(1) {
  opacity: 1;
  max-height: 3rem;
  width: 15rem;
  padding: 12px 16px;
  transform: rotateY(0deg);
  transition: all 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0s cubic-bezier(0.19, 1, 0.22, 1);
}

#instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(2),
#ta-section-dropdown:hover > .dropdown-content a:nth-of-type(2),
#student-section-dropdown:hover > .dropdown-content a:nth-of-type(2),
#instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(2),
#ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(2),
#student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(2) {
  opacity: 1;
  max-height: 3rem;
  width: 15rem;
  padding: 12px 16px;
  transform: rotateY(0deg);
  transition: all 0.25s 0.05s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.05s cubic-bezier(0.19, 1, 0.22, 1);
}

#instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(3),
#ta-section-dropdown:hover > .dropdown-content a:nth-of-type(3),
#student-section-dropdown:hover > .dropdown-content a:nth-of-type(3),
#instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(3),
#ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(3),
#student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(3) {
  opacity: 1;
  max-height: 3rem;
  width: 15rem;
  padding: 12px 16px;
  transform: rotateY(0deg);
  transition: all 0.25s 0.1s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.1s cubic-bezier(0.19, 1, 0.22, 1);
}

#instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(4),
#ta-section-dropdown:hover > .dropdown-content a:nth-of-type(4),
#student-section-dropdown:hover > .dropdown-content a:nth-of-type(4),
#instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(4),
#ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(4),
#student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(4) {
  opacity: 1;
  max-height: 3rem;
  width: 15rem;
  padding: 12px 16px;
  transform: rotateY(0deg);
  transition: all 0.25s 0.15s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.15s cubic-bezier(0.19, 1, 0.22, 1);
}

#instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(5),
#ta-section-dropdown:hover > .dropdown-content a:nth-of-type(5),
#student-section-dropdown:hover > .dropdown-content a:nth-of-type(5),
#instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(5),
#ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(5),
#student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(5) {
  opacity: 1;
  max-height: 3rem;
  width: 15rem;
  padding: 12px 16px;
  transform: rotateY(0deg);
  transition: all 0.25s 0.20s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0.2s cubic-bezier(0.19, 1, 0.22, 1);
}

#instructor-course-dropdown:hover > .dropdown-content a:nth-of-type(6),
#ta-section-dropdown:hover > .dropdown-content a:nth-of-type(6),
#student-section-dropdown:hover > .dropdown-content a:nth-of-type(6),
#instructor-course-dropdown:focus-within > .dropdown-content a:nth-of-type(6),
#ta-section-dropdown:focus-within .dropdown-content a:nth-of-type(6),
#student-section-dropdown:focus-within > .dropdown-content a:nth-of-type(6) {
  opacity: 1;
  max-height: 3rem;
  width: 15rem;
  padding: 12px 16px;
  transform: rotateY(0deg);
  transition: all 0.25s 0.25s cubic-bezier(0.19, 1, 0.22, 1), transform 0.25s 0.25s cubic-bezier(0.19, 1, 0.22, 1);
}

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

.user-name {
  /* margin-top: 5px; */
  /* font-weight: 100; */
}

.settings {
  cursor: pointer;
  margin-top: 0.1rem;
  margin-left: 0.25rem;
  margin-right: 1.5rem;
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

.rotate-arrow {
  transform: rotateX(-90deg);
  margin-bottom: 0.1rem;
}

img {
  display: inline-block;
}

</style>

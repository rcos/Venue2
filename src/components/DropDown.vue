<template>
  <div>

    <!-- Courses Link -->
    <div id="course-link">
      <a data-toggle="collapse" href="#collapse-me" class="venue-nav-link" :class="{'active-link':this.is_active }" style="cursor:pointer;">
        {{navbar_label}} <img class="svg-color" src="@/assets/icons8-sort-down-26.png" width="10" height="10" alt="Down Icon" aria-label="Down Icon">
      </a>

    <hide-at breakpoint="mediumAndBelow">
      <div class="dropdown-content">
        <router-link v-for="content in this.dd_content" :key="content._id" :to="{name: 'course_info', params: { id: content._id }}">
          <div v-if= "did === 'section'">
            <p>{{ content.course.name }}  {{ content.name }}</p>
          </div>
          <div v-else-if="did === 'course'">
            <span @mouseover="hover = true">
              <p>{{ content.name }}</p>
            </span>
            <span v-if="hover">
              <div class="inner_content">
                <NestedDropDown :is_active="is_active" :dd_content="nested_contents" :index=content :hover="content.name"></NestedDropDown>
              </div>
            </span>
          </div>
          <div v-else></div>
        </router-link>
      </div>
    </hide-at>
    <div :class="'active-link-underline ' + ( this.is_active?'active':'')"></div>
    </div>

    <show-at breakpoint="mediumAndBelow">
      <div id="all-collapse">
        <div class="collapse" id="collapse-me" data-parent="#all-collapse">
          <ul class="mobile-course-list">
            <li class="mobile-course-link" href="#collapse-me" data-toggle="collapse" v-for="content in this.dd_content" :key="content._id">
              <router-link :to="{name: 'course_info', params: { id: content._id }}">
                <div v-if= "did === 'section'">
                  <p class="mobile-course-link-name">{{ content.course.name }} {{ content.name }}</p>
                </div>
                <div v-else-if= "did === 'course'">
                  <p class="mobile-course-link-name">{{ content.name }}</p>
                </div>
                <div v-else></div>
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
  import SectionAPI from '@/services/SectionAPI.js'
  import NestedDropDown from './NestedDropDown.vue'

  export default {
    name: 'DropDown',
    components: {
      hideAt,
      showAt,
      NestedDropDown
    },
    data(){
      return {
        nested_contents: [],
        hover: false,
        hoverItem: null,
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      async loadData(){
         this.loadInstructorContents()
      },
      async loadInstructorContents(){
        for (let i = 0; i < this.dd_content.length; i++){
          let temp = []
          let sections = []
          await SectionAPI.getSectionsForCourse(this.dd_content[i]._id).then(res =>
          {
          temp.push(this.dd_content[i])
          temp.push(res.data)
          this.nested_contents.push(temp)
          })
        }
      },
    },
    props: {
      is_active: {
        type: Boolean,
      },
      navbar_label: {
        type: String,
      },
      dd_content: {
        type:  Array,
      },
      did:{
        type: String,
      },
    }
  }
</script>

<style scoped>

/*.inner_content{
  visibility: hidden;
}*/
.dropdown-content{
  margin-left: -1rem;
  margin-top: 0.2rem;
  position: absolute;
  visibility: hidden;
  /* background-color: #f7f7f7; */
  z-index: 9999;
  border-radius: 0.5rem;
  /* transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1); */
}
.dropdown-content a{
  visibility: hidden;
  color: #2C3E50;
  background-color: #f7f7f7;
  font-weight: bold;
  font-size: 0rem;
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
.dropdown-content a:last-of-type{
  border-radius: 0rem 0rem 0.5rem 0.5rem;
}
.dropdown-content a:not(:first-of-type) {
  border-top: 0.1rem solid rgba(0, 0, 0, 0.15);
}
.dropdown-content a:last-of-type{
  border-radius: 0rem 0rem 0.5rem 0.5rem;
}
.dropdown-content a:only-of-type {
  border-radius: 0.5rem;
}
.dropdown-content a:hover,
.dropdown-content a:focus {
  background-color: #466D85;
  color: white;
  outline: none;
  box-shadow: 0px 3px 3px 0px rgba(85, 85, 85, 0.644) inset, 0px -3px 3px 0px rgba(179, 179, 179, 0.644) inset;
  /* -webkit-transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  -ms-transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  transition: background-color 0.25s cubic-bezier(0.19, 1, 0.22, 1); */
}

.dropdown-content a:hover,
.dropdown-content a:focus-within{
  visibility: visible;
}

#course-link:hover > .dropdown-content,
#course-link:focus-within > .dropdown-content {
  visibility: visible;
}
#course-link:hover > .dropdown-content a,
#course-link:focus-within > .dropdown-content a {
  visibility: visible;
  font-size: 1rem;
  max-height: 3rem;
  width: 15rem;
  padding: 12px 16px;
  transform: rotateY(0deg);
  transition: font-size 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1), max-height 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1), padding 0.25s 0s cubic-bezier(0.19, 1, 0.22, 1), transform 0.05s 0s cubic-bezier(0.19, 1, 0.22, 1);
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

</style>

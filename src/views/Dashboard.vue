<template>
  <div>
    <div class="desktop-body" v-if="!mobileView()">
      <div class="dashboard-top-row">
        <div class="desktop-active-classes" v-if="getActive() != null">
          <Section title="Active">
            <ActiveClassModal
              :class_info="getActive()"
            />
          </Section>
        </div>
        <div class="desktop-todays-events">
          <Section title="Today's Events">
            <TodayEventSchedule
              :events_info="getTodaysEvents()"
            />
          </Section>
        </div>
      </div>
      <div class="dashboard-bottom-row">
        <Section title="Registered Courses">
          <RegisteredCourseList
            :course_info="course_info.courses"
          />
        </Section>
      </div>
    </div>
    <div v-if="mobileView()">
      <div id="mobile-dashboard-slider-holder">
        <div id="mobile-dashboard-slider">
          <transition name="animate"
            enter-active-class="animated slideInLeft"
            leave-active-class="animated slideOutLeft">
            <div id="mobile-dashboard" v-if="!show_courses">

              <div class="mobile-content-bounds">
                <!-- Mobile Dashboard Section -->
                <div v-if="getActive() != null">
                  <Section title="Active">
                    <ActiveClassModal
                      :class_info="getActive()"
                    />
                  </Section>
                </div>
                <div :style="{marginTop: '60px'}">
                  <Section title="Today's Events">
                    <TodayEventScheduleMobile
                      :events_info="getTodaysEvents()"
                    />
                  </Section>
                </div>

              </div>

            </div>
          </transition>
          <transition name="animate"
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutRight">
            <div id="mobile-courses" v-if="show_courses">

              <!-- Mobile Courses Section -->
              <div  class="mobile-content-bounds">
                <Section title="Course List">
                  <RegisteredCourseListMobile
                    :course_info="course_info.courses"
                  />
                </Section>
              </div>

            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- For testing -->
<!-- <template>
  <div>
    <h2>Dashboard</h2>
    <button type="submit" class="btn btn-primary" @click="logOut">Logout</button>
    <Users />
    <h2 v-if="loggedIn">I'm logged in</h2>
    <h2 v-else>Not logged in</h2>
  </div>
</template> -->

<script>
  import UserAPI from '@/services/UserAPI.js';
  import DashboardSection from '@/components/DashboardSection'
  import { authComputed } from '../vuex/helpers.js'
  import Section from '@/components/Section'
  import ActiveClassModal from '@/components/ActiveClassModal'
  import TodayEventSchedule from '@/components/TodayEventSchedule'
  import RegisteredCourseList from '@/components/RegisteredCourseList'
  import TodayEventScheduleMobile from '@/components/TodayEventScheduleMobile'
  import RegisteredCourseListMobile from '@/components/RegisteredCourseListMobile'

  export default {
    name: 'Dashboard',
    computed: {
      ...authComputed
    },
    components: {
      DashboardSection,
      Section,
      ActiveClassModal,
      TodayEventSchedule,
      RegisteredCourseList,
      TodayEventScheduleMobile,
      RegisteredCourseListMobile
    },
    data(){
      return {
        current_user: {},
        show_courses: false,
        course_info: {
          courses: [{
            id: 'klageaj123',
            name: "Data Structures 3",
            course_code: "CSCI 5000",
            time_start: 10, time_end: 12
          },{
            id: 'klaghrtsggeaj123',
            name: "Intro to AI",
            course_code: "CSCI 4020",
            time_start: 14, time_end: 16
          },{
            id: 'klaafaefgeaj123',
            name: "Gender Studies",
            course_code: "HASS 3050",
            time_start: 16, time_end: 18
          },{
            id: 'klagfae1eaj123',
            name: "Technological Sentience",
            course_code: "STSS 4100",
            time_start: 20, time_end: 22
          }]
        }
      }
    },
    props: {
      mobileView: Function
    },
    created() {
      this.getCurrentUser()

      window.addEventListener('resize', ((e) => {vm.forceUpdate ()}).bind(vm) )
      window.onresize = (e) => {
        vm.$forceUpdate ()
      }
    },
    mounted() {
      window.addEventListener('resize', this.setPanelWidths.bind(this));
      this.setPanelWidths();

      window.addEventListener('hashchange', this.detectPanel.bind(this))
      this.detectPanel()
    },
    methods: {
      detectPanel () {

        console.log ('hash changed!')
        if (window.location.href.indexOf('#') == -1) {
          console.log ('detectPanel(): exited early')
          return;
        }

        let i = window.location.href.length - 1;
        while (i >= 0 && window.location.href.charAt(i) != '#') --i;
        i += 1;

        let id_ = window.location.href.substring(i);
        console.log (id_)

        if (id_ == 'courses') {
          // show courses
          this.show_courses = true;
        }
        else {
          this.show_courses = false;
        }

      },
      setPanelWidths () {
        console.log (window.innerWidth)
        // document.getElementById('mobile-dashboard-slider').style.width = (window.innerWidth * 2) + 'px';
        // document.getElementById('mobile-dashboard').style.width = window.innerWidth + 'px';
        // document.getElementById('mobile-courses').style.width = window.innerWidth + 'px';
        // document.getElementById('mobile-dashboard-slider-holder').style.width = window.innerWidth + 'px';

      },
      getActive () {
        if (this.course_info == null || this.course_info == undefined) return null;
        return this.course_info.courses[0]
      },
      getTodaysEvents () {
        return [this.course_info.courses[0], this.course_info.courses[1], this.course_info.courses[2], this.course_info.courses[3]]
      },
      getCurrentUser() {
        const user_string = localStorage.getItem('user')
        const user_data = JSON.parse(user_string)
        this.current_user = user_data.current_user
      },
      logOut() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
.desktop-active-classes {
  width: 380px;
}

.desktop-todays-events,
.desktop-active-classes {
  display: inline-block;
  vertical-align: top;
}

.desktop-active-classes {
  flex-shrink: 0;
}

.dashboard-top-row {
  display: flex;
}

.desktop-todays-events {
  width: 80%;
}

.desktop-body {
  box-sizing: border-box;
  padding-left: 15%;
}

#mobile-dashboard, #mobile-courses {
  position: fixed;
  top: 130px;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>

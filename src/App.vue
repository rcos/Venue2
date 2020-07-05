<template>
  <div id="app">
    <NavBar class="main_navbar" v-if="this.$route.name != 'landing_page' && this.$route.name != 'set_permanent_password' && current_user"></NavBar>
    <div id="main-content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>

import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import LectureAPI from './services/LectureAPI';
import {getLiveLectures,getUpcomingLectures,getPastLectures} from './services/GlobalFunctions.js'
import '@/assets/css/venue.css';

Number.prototype.toFixedDecimals = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

export default {
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Venue'
    }
  },
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      current_user: null
    }
  },
  created() {
    let self = this
    var waitForUser = setInterval(function(){
      if (self.$store.state.user && self.$store.state.user.current_user) {
        self.current_user = self.$store.state.user.current_user
        self.afterUser()
        clearInterval(waitForUser);
      }
    }, 100);
  },
  methods: {
    afterUser() {
      if(this.current_user.is_instructor) {
        LectureAPI.getLecturesForUser(this.current_user._id, "none") 
          .then(res => {
            let liveAndUpcoming = getLiveLectures(res.data).concat(getUpcomingLectures(res.data))
            if (!("Notification" in window)) {
              alert("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
              this.processNotifications(liveAndUpcoming)
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                  this.processNotifications(liveAndUpcoming)
                }
              });
            }
            this.processInstructorEmails(getPastLectures(res.data))
          })
      } else {
        
      }
    },
    processNotifications(lectures) {
      for(let i=0;i<lectures.length;i++) {
        for(let j=0;j<lectures[i].checkins.length;j++) {
          let timeuntil = Date.parse(lectures[i].checkins[j].start_time) - Date.now()
          if(timeuntil > -1000) { //If the page loads within one second of checkin-time
            let self = this
            setTimeout(function() {
              self.attendanceNotification(lectures[i]._id)
            },timeuntil)
          }
        }
      }
    },
    attendanceNotification(lectureid) {
      var notification = new Notification("Time to take attendance!");
      notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        if(process.env.NODE_ENV === "production") {
          window.open('https://venue-attend.herokuapp.com/#/lecture_info/'+lectureid, '_blank');
        } else {
          window.open('http://localhost:8080/#/lecture_info/'+lectureid, '_blank');
        }
      }
    },
    processInstructorEmails(lectures) {
      LectureAPI.processEmailsForLectures(lectures,this.current_user.email)
    }
  }
  //initially displayNav is false because the first page loaded is the homepage
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // min-height: 100%;
}

Footer {
  position: fixed;
  bottom: 0;
}

#main-content {
  position: absolute;
  top: 4rem;
  bottom: 2rem;
  left: 0;
  right: 0;
  // padding-bottom: 1rem;
  overflow-y: auto;
}
</style>

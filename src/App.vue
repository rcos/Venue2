<template>
  <div id="app">
    <div id="main-content">
      <NavBar v-if="this.$route.name != 'landing_page' && this.$route.name != 'set_permanent_password' && current_user"></NavBar>
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>

import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import LectureAPI from './services/LectureAPI';
import '@/assets/css/venue.css';

export default {
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
        LectureAPI.getLecturesForUser(this.current_user._id,"live", "none") 
          .then(res => {
            LectureAPI.getLecturesForUser(this.current_user._id,"upcoming", "none")
              .then(res2 => {
                let lectures = res.data.concat(res2.data)
                if (!("Notification" in window)) {
                  alert("This browser does not support desktop notification");
                } else if (Notification.permission === "granted") {
                  this.processNotifications(lectures)
                } else if (Notification.permission !== "denied") {
                  Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                      this.processNotifications(lectures)
                    }
                  });
                }
              })
          })
        LectureAPI.getLecturesForUser(this.current_user._id,"past", "none")
          .then(res => {
            this.processInstructorEmails(res.data)
          })
      } else {
        
      }
    },
    processNotifications(lectures) {
      for(let i=0;i<lectures.length;i++) {
        let timeuntil = Date.parse(lectures[i].submission_start_time) - Date.now()
        let self = this
        if(timeuntil > -2000) { //Within a second of lecturetime
          setTimeout(function() {self.attendanceNotification(lectures[i]._id)},timeuntil)
        }
      }
    },
    attendanceNotification(lectureid) {
      var notification = new Notification("Time to take attendance!");
      notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open('http://localhost:8080/lecture_info/'+lectureid, '_blank');
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
  color: #2c3e50;
  margin: 0 auto;
  padding: 0;
  min-height: 100%;
  position: relative;
}

#main-content {
  padding-bottom: 3rem;
}
</style>

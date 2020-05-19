<template>
  <div id="app">
    <div id="main-content">
      <NavBar v-if="this.$route.name != 'landing_page'"></NavBar>
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
  created() {
    if(this.$store.state.user.current_user && this.$store.state.user.current_user.is_instructor) {
      LectureAPI.getLecturesForUser(this.$store.state.user.current_user._id,"live")
      .then(res => {
        let livelectures = res.data
        LectureAPI.getLecturesForUser(this.$store.state.user.current_user._id,"upcoming")
          .then(res2 => {
            let upcominglectures = res2.data
            let lectures = livelectures.concat(upcominglectures)
            for(let i=0;i<lectures.length;i++) {
              let timeuntil = Date.parse(lectures[i].submission_start_time) - Date.now()
              let self = this
              if(timeuntil > -2000) { //Within a second of lecturetime
                setTimeout(function() {self.attendanceNotification(lectures[i]._id)},timeuntil)
              }
            }
          })
      })
    }
  },
  methods: {
    notifyStart(lectureid) {
      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }

      // Let's check whether notification permissions have already been granted
      else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        this.attendanceNotification(lectureid)
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            this.attendanceNotification(lectureid)
          }
        });
      }
    },
    attendanceNotification(lectureid) {
      var notification = new Notification("Time to take attendance!");
      notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open('http://localhost:8080/lecture_info/'+lectureid, '_blank');
      }
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

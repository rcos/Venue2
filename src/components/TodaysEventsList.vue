<<template>
  <div class="todays-events-list">
    <div v-if="todays_events.length > 0">
      <div class="todays-events-section">
        <div v-for="event in todays_events" class="todays-event-container">
          <div class="todays-event-time">{{ convertTimeToHourMinuteFormat(new Date(event.start_time)) }}</div>
          <TodaysEventCard />
        </div>
<!--         <div class="todays-event-container" style="margin-left:1rem;">
          <div class="todays-event-time">10a</div>
          <TodaysEventCard />
        </div>
        <div class="todays-event-container" style="margin-left:4rem;">
          <div class="todays-event-time">12p</div>
          <TodaysEventCard />
        </div>
        <div class="todays-event-container" style="margin-left:4rem;">
          <div class="todays-event-time">2p</div>
          <TodaysEventCard />
        </div> -->
      </div>
      <div class="time-line"></div>
    </div>
    <div v-else>
      <p class="no-container" id="no-today">No events today</p>
    </div>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js'
  import TodaysEventCard from '@/components/TodaysEventCard.vue'

  export default {
    name: 'TodaysEventsList',
    components: {
      TodaysEventCard
    },
    data(){
      return {
        todays_events: []
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.getTodaysEvents()
    },
    methods: {
      async getTodaysEvents() {
        let response = await EventAPI.getActiveOrTodaysEventsForUser(this.current_user._id, false)
        this.todays_events = response.data
        // console.log(this.todays_events)
      },
      convertTimeToHourMinuteFormat(time){
        let time_string = time.toLocaleTimeString('en-US')
        //remove all ':00's from the string
        time_string = time_string.replace(/:00/g,"")
        //replace 'PM' with 'p' and 'AM' with a
        time_string = time_string.replace("PM","pm")
        time_string = time_string.replace("AM","am")
        return time_string
      }
    }
  }
</script>

<style scoped>
.todays-events-section {
  /*border: blue solid;*/
  height: 9.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.todays-events-section::-webkit-scrollbar {
  width: 12px;
}

.todays-events-section::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5; 
}

.time-line {
  border: #f0f0f0 solid 2px;
  background-color: #f0f0f0;
  margin-top: -7.7em;
}

.todays-event-container {
  /*border: red solid;*/
  height: 5rem;
  width: 10rem;
  display: inline-block;
  vertical-align: top;
}

.todays-event-time {
  /*border: blue solid;*/
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: #757575;
}
</style>
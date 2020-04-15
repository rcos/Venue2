<<template>
  <div class="todays-events-list">
    <div v-if="todays_events.length > 0">
      <div class="todays-events-section">
        <div class="horizontal-timeline"></div>
        <div v-for="(event, index) in todays_events" class="todays-event-container" v-bind:class="{'mleft-one':index===0, 'mleft-four':index!==0}">
          <div v-if="event.started_today" class="todays-event-time">{{ convertToHourMinuteFormat(new Date(event.start_time)) }}</div>
          <div v-else class="todays-event-time">{{ convertToMonthDayFormat(new Date(event.start_time)) }} {{ convertToHourMinuteFormat(new Date(event.start_time)) }}</div>
          <router-link class="active-event-link" :to="{name: 'event_info', params: { event_id: event._id }}">
            <TodaysEventCard v-bind:event="event" />
          </router-link>
        </div>
      </div>
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
        //order events by start time
        this.sortTodaysEventsByStartTime()
        this.setEventsStartedStoday()
      },
      convertToHourMinuteFormat(time) {
        let time_string = time.toLocaleTimeString('en-US')
        //remove all ':00's from the string
        time_string = time_string.replace(/:00/g,"")
        return time_string
      },
      convertToMonthDayFormat(time) {
        let month = time.getMonth() + 1; //months from 1-12
        let day = time.getDate();
        return month + "/" + day
      },
      sortTodaysEventsByStartTime() {
        this.todays_events.sort(function(a,b){
          return new Date(a.start_time) - new Date(b.start_time); 
        });
      },
      setEventsStartedStoday() {
        this.todays_events.forEach(event => {
          if(this.isToday(new Date(event.start_time)))
            event.started_today = true
        })
      },
      isToday(time) {
        let current_time = new Date()
        return current_time.getFullYear() === time.getFullYear() &&
          current_time.getMonth() === time.getMonth() &&
          current_time.getDate() === time.getDate()
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
  padding-right: 2rem;
}

.todays-events-section::-webkit-scrollbar {
  width: 12px;
}

.todays-events-section::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5; 
}

.mleft-one {
  margin-left: 1rem;
}

.mleft-four {
  margin-left: 4rem;
}

.horizontal-timeline {
  border: #f0f0f0 solid 2px;
  background-color: #f0f0f0;
  position: absolute;
  width: 30rem;
  margin-top: 1.75rem;
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

.active-event-link {
  color: #2c3e50;
}
</style>
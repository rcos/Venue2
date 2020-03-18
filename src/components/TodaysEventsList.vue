<<template>
  <div class="todays-events-list">
    <div v-if="todays_events.length > 0">
      <h3 v-for="event in todays_events">{{ event.title }}</h3>
    </div>
    <div v-else>
      <p class="no-container" id="no-today">No events today</p>
    </div>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js'

  export default {
    name: 'TodaysEventsList',
    components: {
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
      }
    }
  }
</script>

<style scoped>
.todays-events-list {

}

/*.active-event-list {
  height: 12.5rem;
  overflow-y: auto;
}

.active-event-list::-webkit-scrollbar {
  width: 12px;
}

.active-event-list::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5; 
}*/
</style>
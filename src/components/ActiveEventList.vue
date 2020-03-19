<<template>
  <div class="active-event-list">
    <div v-if="active_events.length > 0">
      <ActiveEventCard v-for="event in active_events" v-bind:event="event" />
    </div>
    <p v-else class="no-container" id="no-active">No active events</p>
  </div>
</template>

<script>
  import ActiveEventCard from '@/components/ActiveEventCard.vue'
  import EventAPI from '@/services/EventAPI.js'

  export default {
    name: 'ActiveEventList',
    components: {
      ActiveEventCard
    },
    data(){
      return {
        active_events: []
      }
    },
    created() {
      this.current_user = this.$store.state.user.current_user
      this.getActiveEvents()
    },
    methods: {
      async getActiveEvents() {
        let response = await EventAPI.getActiveOrTodaysEventsForUser(this.current_user._id, true)
        let temp_active_events = response.data
        // temp_active_events.forEach((event) => {
        //   event.is_pending = "yup"
        //   console.log(event.is)
        // })
        this.active_events = response.data
      }
    }
  }
</script>

<style scoped>
.active-event-list {
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
}
</style>
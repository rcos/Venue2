<<template>
  <div class="active-event-list">
    <div v-if="active_events.length > 0">
      <div v-for="event in active_events" class="active-event-card-container">
        <ActiveEventCard v-bind:event="event" />
      </div>
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

.active-event-card-container {
  position: relative;
  width: 75%;
  height: 3.5rem;
  margin-left: 2rem;
  margin-top: 2rem;
  border: #FC5D60 solid;
  border-radius: 5px;
  background-color: #FC5D60;
  cursor: pointer;
  transition: background-color, border, width, 0.25s;
  /*padding-bottom: -5rem;*/
}

.active-event-card-container:hover {
  background-color: #cf4c4f;
  border: #cf4c4f solid;
}

/*Medium devices (tablets and below)*/
@media (max-width: 1128px) {
  .active-event-card-container {
    margin: auto;
    margin-top: 2rem;
    width: 50%;
  }
}

/*Small devices (phones and below)*/
@media (max-width: 575.98px) {
  .active-event-card-container {
    width: 80%;
  }
}
</style>
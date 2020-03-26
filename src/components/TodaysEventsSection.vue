<<template>
  <div class="todays-events-section">
    <div class="time-line">
    </div>
    <div class="todays-event-container">
      <div class="todays-event-time">10am</div>
      <TodaysEventCard />
    </div>
  </div>
</template>

<script>
  import TodaysEventCard from '@/components/TodaysEventCard.vue'

  export default {
    name: 'TodaysEventsSection',
    components: {
      TodaysEventCard
    },
    data(){
      return {
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style scoped>
.todays-events-section {
  /*border: blue solid;*/
  height: 4.5rem;
}

.time-line {
  border: #f0f0f0 solid 2px;
  background-color: #f0f0f0;
  margin-top: 2rem;
}

.todays-event-container {
  /*border: red solid;*/
  height: 5rem;
  width: 10rem;
  margin-left: 1rem;
  margin-top: -2rem;
}

.todays-event-time {
  /*border: blue solid;*/
  text-align: center;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  color: #4d4d4d;
}
</style>
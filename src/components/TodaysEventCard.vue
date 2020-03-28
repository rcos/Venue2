<<template>
  <div class="todays-event-card-container">
    <div class="todays-event-card">
      <div class="event-title">Class 3/25</div>
      <div class="course-title">CSCI 1200-01</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TodaysEventCard',
    components: {
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
  .todays-event-card-container {
    background-color: #FC895D;
    height: 3.5rem;
    margin-top: 1rem;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }

  .todays-event-card {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    position: absolute;
    background-color: white;
    margin-top: 0.4rem;
    margin-left: 0.4rem;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: background-color, box-shadow 0.25s;
  }

  .todays-event-card:hover {
    background-color: #e8e8e8;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.3);
  }

  .event-title {
    font-size: 1rem;
    margin-top: 0.5rem;
    font-weight: bold;
  }

  .course-title {
    font-size: 0.6rem;
    color: #1591C5;
  }
</style>
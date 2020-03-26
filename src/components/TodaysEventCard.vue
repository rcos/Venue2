<<template>
  <div class="todays-event-card-container">
    <div class="todays-event-card"></div>
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
  }
</style>
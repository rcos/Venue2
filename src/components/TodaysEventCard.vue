<<template>
  <div class="todays-event-card-container" v-bind:class="{'active-container':is_active, 'over-container':is_over}">
    <div class="todays-event-card">
      <div class="spinner-border event-card-spinner" role="status" v-if="!section_has_loaded">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>
        <div class="event-title">{{ event.title }}</div>
        <div class="course-title">{{ event.section.course.dept }} {{ event.section.course.course_number }}-{{ event.section.number}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js'

  export default {
    name: 'TodaysEventCard',
    components: {
    },
    props: {
      event: Object
    },
    data(){
      return {
        section_has_loaded: false,
        is_active: false,
        is_over: false
      }
    },
    created() {
      this.getEventSectionWithCourse()
      this.setEventStatus()
    },
    methods: {
      async getEventSectionWithCourse() {
        const response = await SectionAPI.getSectionWithCourse(this.event.section)
        this.event.section = response.data
        this.section_has_loaded = true
      },
      setEventStatus() {
        let current_time = new Date()
        let event_start_time = new Date(this.event.start_time)
        let event_end_time = new Date(this.event.end_time)
        if(current_time >= event_start_time) {
          if(current_time <= event_end_time)
            this.is_active = true
          else
            this.is_over = true
        }
      }
    }
  }
</script>

<style scoped>
  .todays-event-card-container {
    background-color: #f29f33;
    height: 3.5rem;
    margin-top: 1rem;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }

  .active-container {
    background-color: #516ded;
  }

  .over-container {
    background-color: #919191;
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

  .event-card-spinner {
    height:2rem; 
    width:2rem; 
    margin-top:1rem;
  }

  .todays-event-card:hover {
    background-color: #e8e8e8;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.3);
  }

  .event-title {
    font-size: 1rem;
    margin: auto;
    margin-top: 0.5rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 85%;
  }

  .course-title {
    font-size: 0.6rem;
    color: #1591C5;
  }
</style>
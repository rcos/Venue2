<<template>
  <div>
    <!-- Dekstops & Tablets -->
    <hide-at breakpoint="small">
      <div class="todays-event-card-container" v-bind:class="{'active-container':is_active, 'over-container':is_over}">
        <div class="todays-event-card">
          <div class="spinner-border event-card-spinner" role="status" v-if="!section_has_loaded">
            <span class="sr-only">Loading...</span>
          </div>
          <div v-else>
            <div class="event-title desktop-event-title">{{ event.title }}</div>
            <div class="course-title desktop-course-title">{{ event.section.course.dept }} {{ event.section.course.course_number }}-{{ event.section.number}}</div>
          </div>
        </div>
      </div>
    </hide-at>
    <!-- Phones -->
    <show-at breakpoint="small">
      <div style="position: relative;">
        <div class="mobile-event-card-extending-background" v-bind:class="{'active-container':is_active, 'over-container':is_over}"></div>
        <div class="mobile-event-card">
          <div class="spinner-border event-card-spinner" role="status" v-if="!section_has_loaded">
            <span class="sr-only">Loading...</span>
          </div>
          <div v-else>
            <div class="event-title mobile-event-title">{{ event.title }}</div>
            <div class="course-title mobile-course-title">{{ event.section.course.dept }} {{ event.section.course.course_number }}-{{ event.section.number}}</div>
          </div>
        </div>
      </div>
    </show-at>
  </div>
</template>

<script>
  import SectionAPI from '@/services/SectionAPI.js'
  import {showAt, hideAt} from 'vue-breakpoints'

  export default {
    name: 'TodaysEventCard',
    components: {
      hideAt,
      showAt
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
    margin-top: 1rem;
    height: 3.5rem;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }

  .mobile-event-card {
    background-color: white;
    height: 4rem;
    width: 17rem;
    border-radius: 5px;
    margin-top: -2rem;
    margin-left: 3rem;
    position: absolute;
    z-index: 2;
    box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.1);
  }

  .mobile-event-card-extending-background {
    height: 1.5rem;
    width: 19rem;
    border-radius: 5px; 
    margin-top: 1rem;
    position: relative;
    z-index: 1;
  }

  /*Very small phone sizes*/
  @media (max-width: 321px) {
    .mobile-event-card {
      width: 15rem;
    }

    .mobile-event-card-extending-background {
      width: 17rem;
    }
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
    margin: auto;
    margin-top: 0.5rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 85%;
  }

  .desktop-event-title {
    font-size: 1rem;
  }

  .mobile-event-title {
    font-size: 1.25rem;
  }

  .course-title {
    color: #1591C5;
  }

  .desktop-course-title {
    font-size: 0.6rem;
  }

  .mobile-course-title {
    font-size: 0.8rem;
  }
</style>
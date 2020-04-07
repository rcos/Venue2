<template>
  <div class="event-history-list">
    <div class="attendance-month-container" v-for="(month,index) in event_months">
      <div class="month">{{ month_names[month] }}</div>
      <div v-for="event in event_history_by_month[index]">
        <router-link :to="{name: 'event_info', params: { event_id: event._id }}">
          <div class="event-pill">
            <p class="event-card-section" id="event-name">{{ event.title }}</p>
            <p class="event-card-section" id="event-location">{{ event.location }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import EventAPI from '@/services/EventAPI.js';

  export default {
    name: 'EventHistoryList',
    props: {
      course: Object,
      section: Object
    },
    computed: {
    },
    components: {

    },
    data(){
      return {
        event_history: [],
        event_months: [],
        event_history_by_month: [],
        month_names: ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ]
      }
    },
    created() {
      if(this.course)
        this.getEventHistoryForCourse()
      else
        this.getEventHistoryForSection()
    },
    methods: {
      async getEventHistoryForCourse() {
        const response = await EventAPI.getEventHistoryForCourse(this.course._id)
        this.event_history = response.data
        this.sortEventsByStartTime()
        this.separateEventsByMonth()
      },
      async getEventHistoryForSection() {
        const response = await EventAPI.getEventHistoryForSection(this.section._id)
        this.event_history = response.data
        this.sortEventsByStartTime()
        this.separateEventsByMonth()
      },
      sortEventsByStartTime() {
        this.event_history.sort(function(a,b){
          return new Date(b.start_time) - new Date(a.start_time); 
        });
      },
      separateEventsByMonth() {
        this.event_history.forEach(event => {
          let start_time = new Date(event.start_time) 
          if(!this.event_months.includes(start_time.getMonth())){
            this.event_months.push(start_time.getMonth())
            this.event_history_by_month.push([event])
          } else {
            this.event_history_by_month[this.event_history_by_month.length-1].push(event)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .attendance-month-container {
    /*border: green solid;*/
    overflow: hidden;
    margin-top: 1rem;
  }

  .month {
    float: left;
    margin-left: 2rem;
    /*border: red solid;*/
    width: 100%;
    text-align: left;
    padding-left: 1rem;
  }

  .event-pill {
    width: 16rem;
    border: green solid;
    float: left;
    margin-left: 2rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
    color: black;
  }

  .event-card-section {
    /*border: purple solid;*/
    display: inline-block;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  #event-name {
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 45%;

  }

  #event-location {
    float: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 55%;
  }
</style>
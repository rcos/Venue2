<template>
  <div class="event-history-list">

    <div v-if="this.event_history_by_month.length == 0" class="empty-history">
      <p>~ No events ~</p>
    </div>

    <div v-else>

      <show-at breakpoint="small">

        
      </show-at>
      <hide-at breakpoint="small">

        <div>

          
        </div>

      </hide-at>

    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'EventHistoryList',
    props: {
      course: Object,
      section: Object,
      sorting: Function,
      grid_mode: {
        type: Boolean,
        default: false
      }
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

        this.event_history = response.data
        this.sortEventsByStartTime()
        this.separateEventsByMonth()
      },
      async getEventHistoryForSection() {
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

  .event-pill-list-mode {
    width: 45%;
    border: 1px solid #04852f;
    display: inline-block;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    box-sizing: border-box;
    margin-top: 0.6rem;
    font-size: 0.9rem;
    padding: 0px 10px;
    border-radius: 5px;
    box-shadow: 0px 3px 5px 5px rgba(0, 0, 0, 0.065);
    height: 40px;
    line-height: 40px;
  }

  .event-pill-list-item .event-date-section,
  .event-pill-list-item .event-name-section,
  .event-pill-list-item .event-location-section {
    display: inline-block;
  }

  .event-pill-list-item .event-date-section {
    width: 20%;
    color: rgba(0, 0, 0, 0.6);
  }

  .event-pill-list-item .event-name-section {
    width: 50%;
    color: rgba(0, 0, 0, 1);
  }

  .event-pill-list-item .event-location-section {
    width: 30%;
    color: rgba(0, 0, 0, 0.5);
  }

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
    border: 1px solid rgba(35, 217, 96, 0.5);
    width: 250px;
    height: 60px;
    min-width: 150px;
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

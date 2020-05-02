<template>
  <div class="event-history-list">

    <div v-if="this.event_history_by_month.length == 0" class="empty-history">
      <p>~ No events ~</p>
    </div>

    <div v-else class="attendance-month-container" v-for="(month,index) in sortedMonths(event_months)">
      <div class="month-bar" v-on:click="toggleMonthVisibility(month)" ><span class="month">{{ month_names[month] }}</span></div>
      <div class="event-pill-container">
        <div class="event-pill-list" v-if="monthVisible(month)" v-for="event in event_history_by_month[index]">
        <router-link :to="{name: 'event_info', params: { event_id: event._id }}">
          <div class="event-pill">
            <div class="left-side">
              <div class="day-of-week">Mon</div>
              <div class="day-of-month">10</div>
            </div>
            <div class="right-side">
              <div class="name-of-event">Online Class #1</div>
              <div class="location-of-event">WebEx Meeting</div>
            </div>
          </div>
        </router-link>
      </div>
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
      section: Object,
      sorting: Function
    },
    computed: {
    },
    components: {

    },
    data(){
      return {
        event_history: [],
        event_months: [],
        hidden_months: new Set(),
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
      sortedMonths(event_months) {
        if (this.sorting) {
          this.event_months.sort(this.sorting)
        }

        return event_months
      },
      async getEventHistoryForCourse() {
        const response = await EventAPI.getEventHistoryForCourse(this.course._id)
        this.event_history = response.data
        this.sortEventsByStartTime()
        this.separateEventsByMonth()
      },
      monthVisible (month_index) {
        return !this.hidden_months.has(month_index)
      },
      toggleMonthVisibility (month_index) {
        // if the month is hidden, show it. Otherwise, hide it.
        console.log(`Toggling visiblity for month ${this.month_names[month_index]}`)
        if (this.hidden_months.has(month_index)) {
          // remove from the set
          this.hidden_months.delete(month_index)
        }
        else this.hidden_months.add(month_index)

        this.$forceUpdate();
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

        console.log(this.event_history_by_month)
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

  .month-bar {
    margin-left: 2rem;
    /*border: red solid;*/
    width: 100%;
    text-align: left;
    padding-left: 1rem;
    font-family: "Segoe UI";
    position: relative;
    opacity: 0.9;
    transition: opacity 0.25s;
  }
  
  .empty-history {
    line-height: 100px;
    height: 100px;
    width: 85%;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 1.1rem;
    font-family: "Segoe UI";
    font-style: italic;
    text-align: center;
    color: rgba(0, 0, 0, 0.7);
  }

  .month-bar:hover {
    opacity: 1;
  }

  .month {
    position: relative;
    padding-right: 15px;
    cursor: pointer;
    color: #2c3e50;
    border-bottom: 1px dashed transparent;
    padding-bottom: 3px;
  }

  .month-bar:hover .month {
    border-bottom: 1px dashed black;
  }

  .month::after {
    content: "";
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid transparent;
    border-bottom: 5px solid rgba(0, 0, 0, 1);
    position: absolute;
    top: 10px;
    right: -5px;
    transform: rotate(180deg);
  }

  .event-pill-container {
    margin-left: 3.3rem;
    margin-right: 3.3rem;
  }

  .event-pill-list {
    margin-top: 10px;
    display: inline-block;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .event-pill {
    border: 1px solid rgba(35, 217, 96, 0.5);
    width: 250px;
    height: 70px;
    min-width: 150px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.055);
    color: rgba(0, 0, 0, 0.85);
    transition: border 0.25s, box-shadow 0.25s;
  }

  .event-pill:hover {
    border: 1px solid rgba(35, 217, 96, 1);
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.08);
  }

  .event-pill .left-side, .event-pill .right-side {
    display: inline-block;
    vertical-align: top;
  }

  .event-pill .left-side .day-of-week, .event-pill .left-side .day-of-month {
    width: 100%;
    display: block;
    text-align: center;
  }

  .event-pill .left-side .day-of-week {
    position: relative;
    top: 8px;
    font-size: 0.75rem;
  }

  .event-pill .left-side .day-of-month {
    font-weight: bold;
    font-size: 1.55rem;
  }

  .event-pill .left-side {
    width: 25%;
  }

  .event-pill .right-side {
    width: 70%;
    position: relative;
    top: 8px;
  }

  .event-pill .right-side .name-of-event {
    font-size: 0.9rem;
  }

  .event-pill .right-side .location-of-event {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
    position: relative;
    top: -5px;
  }

  .event-pill .event-day {
    width: 5%;
    min-width: 50px;
    color: #373434;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .event-pill .event-title {
    color: #373434;
  }

  .event-pill div {
    display: inline-block;
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
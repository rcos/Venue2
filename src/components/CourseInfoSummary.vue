<template>
    <div class="course-event-container">
        <div v-if="minimized" class="global">
            <div class="inline">
                <h3 class="course-name-min">{{courseName}}</h3>
            </div>
            <div class="inline">
                <div class="inline course-title-min">{{courseDept}} {{courseDeptNumber}}</div>
                <div class="inline time-block-min">2:00pm-3:50pm</div>
            </div>
            <div class="inline">
                <div class="inline ongoing-icon-min"></div>
                <div class="inline">35m remaining</div>
            </div>
            <div v-on:click="toggleMinimize" class="hide-course-blurb-icon"></div>
        </div>
        <div v-else>
            <div class="info-section" id="course-info">
                <div class="course-info-div">
                    <div class="course-name-div">
                    <h3 class="course-name">{{courseName}}</h3>
                    </div>
                    <div class="dept-and-time-area">
                    <div class="course-title-max">{{courseDept}} {{courseDeptNumber}}</div>
                    <div class="time-block">2:00pm-3:50pm</div>
                    </div>
                </div>
                </div>
                <div class="info-section">
                <div class="ongoing-icon inline"></div>
                <div class="remaining-text inline">
                    <div>35m</div>
                    <div>remaining</div>
                </div>
                </div>
                <div class="info-section" id="event-info">
                <router-link v-if="is_instructor" :to="{name: 'new_event', params: { course_id: course._id }}">
                    <button class="new-event-btn">Create new event for {{course.dept }} {{ course.course_number }}</button>
                </router-link>
                <div class="active-events-container">
                    <router-link class="active-event-pill" v-for="active_event in active_events" :key="active_event._id" :to="{name: 'event_info', params: { event_id: active_event._id }}">
                    <p class="active-event-card-section" id="active-event-name">{{ active_event.title }}</p>
                    <p class="active-event-card-section" id="active-event-location">{{ active_event.location }}</p>
                    <div class="active-event-card-section" id="active-event-time-remaining">
                        <span v-if="active_event.remaining_days > 0">{{ active_event.remaining_days }}d </span>
                        <span v-if="active_event.remaining_hours > 0">{{ active_event.remaining_hours }}h </span>
                        <span v-if="active_event.remaining_mins > 0">{{ active_event.remaining_mins }}m</span>
                    </div>
                    </router-link>
                </div>
                </div>
                <div class="info-section">
                <div v-on:click="toggleMinimize" class="hide-course-blurb-icon"></div>
            </div>
        </div>
      </div>
</template>
<script>
    export default {
        name: 'CourseInfoSUmmary',
        props: {
            courseName: {
                type: String
            },
            courseDept: {
                type: String
            },
            courseDeptNumber: {
                type: Number
            }
        },
        data() {
            return {
                minimized: false
            }
        },
        methods: {
            toggleMinimize () {
                this.minimized = !this.minimized
            }
        }

    }
</script>
<style>
.highlight {
    border: 1px solid red;
}
.active-event-card-section {
    display: inline-block;
    color: black;
}
.active-events-container {
    margin-top: 3rem;
  }
.course-event-container {
    /*border: green solid;*/
    text-align: left;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-bottom: 20px;
  }
.hide-course-blurb-icon {
    border: 1px solid rgba(0, 0, 0, 0.5);
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    border-radius: 3px;
    cursor: pointer;
    transition: border 0.25s, box-shadow 0.25s;
    text-align: center;
}

.hide-course-blurb-icon:hover {
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
}

  .global {
    font-family: "Segoe UI";
  }

  .info-section {
    display: inline-block;
    font-family: "Segoe UI";
    margin-left: 0;
    vertical-align: top;
  }
  .course-info-div {
    margin-left: 20px;
  }
   #course-info {
    /*border: black solid;*/
    min-width: 340px;
    width: 32%;
  }
  .course-name {
    font-size: 1.8rem;
    opacity: 0.8;
    color: #000;
    font-weight: normal;
  }

  .course-name-min {
    font-size: 1.5rem;
    opacity: 0.8;
    color: #000;
    font-weight: normal;
    margin-left: 20px;
  }

  .course-name-div {
    text-align: left;
  }
  #active-event-name {
    float: left;
  }

  #active-event-time-remaining {
    float: right;
  }
  .dept-and-time-area {
    display: inline-block;
    text-align: left;
    width: 100%;
    margin-top: -3px;
  }
  .course-title-max {
    width: 7.5rem;
    background-color: #393939;
    color: #C1EDFF;
    text-align: center;
    border-radius: 3px;
    height: 28px;
    cursor: pointer;
    line-height: 28px;
    display: inline-block;
    font-size: 1rem;
  }

  .course-title-min {
    width: 7.5rem;
    font-size: 0.8rem;
    background-color: #393939;
    color: #C1EDFF;
    text-align: center;
    border-radius: 3px;
    height: 28px;
    cursor: pointer;
    line-height: 28px;
    display: inline-block;
    margin-left: 1.5rem;
  }

  .time-block {
    width: 50%;
    display: inline-block;
    padding-left: 15px;
    box-sizing: border-box;
    opacity: 0.9;
  }

  .time-block-min {
    min-width: 250px;
    margin-left: 10px;
    display: inline-block;
    padding-left: 15px;
    box-sizing: border-box;
    opacity: 0.9;
  }

  .ongoing-icon {
    width: 60px;
    height: 60px;
    background-color: #FC5D60;
    border-radius: 5px;
  }

  .ongoing-icon-min {
    width: 25px;
    height: 25px;
    background-color: #FC5D60;
    border-radius: 3px;
    margin-right: 15px;
  }

  .inline {
    display: inline-block;
    vertical-align: top;
  }
  .remaining-text {
    font-size: 1.4rem;
    line-height: 18px;
    margin-top: 8px;
    margin-left: 8px;
  }
  .new-event-btn {
    background-color: white;
    border: #007bff solid;
    color: #black;
    border-radius: 5px;
  }
  .active-event-pill {
    display: inline-block;
    border: green solid;
    width: 18rem;
    border-radius: 3px;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: 2rem;
    cursor: pointer;
  }
</style>
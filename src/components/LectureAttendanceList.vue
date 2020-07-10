<template>
	<div>
    <div v-if="is_instructor">
      <div v-if="is_live">
        <div v-if="Object.keys(live_submissions).length > 0">
          <div class="namecard-edging live-color" v-for="(submission,i) in Object.keys(live_submissions)" :key="i">
            <div class="namecard">
              <p>{{live_submissions[submission][0].submitter.first_name}} {{live_submissions[submission][0].submitter.last_name}}</p>
              <p>{{live_submissions[submission][0].submitter.email}}</p>
              <p>{{live_submissions[submission].length / lecture.checkins.length * 100}}%</p>
            </div>
          </div>
        </div>
        <div v-else>
          None
        </div>
      </div>
      <div v-else-if="is_playback">
        <div v-if="submissions.length > 0">
          <div class="namecard-edging playback-color" v-for="(submission,i) in submissions" :key="i">
            <div class="namecard">
              <p>{{submission.submitter.first_name}} {{submission.submitter.last_name}}</p>
              <p>{{submission.submitter.email}}</p>
              <p>{{Math.ceil(submission.video_percent * 100)}}%</p>
            </div>
          </div>
        </div>
        <div v-else>
          None
        </div>
      </div>
      <div v-else-if="is_absent">
        <div v-if="submissions.length > 0">
          <div class="namecard-edging absent-color" v-for="(absentee,i) in submissions" :key="i">
            <div class="namecard">
              <p>{{absentee.first_name}} {{absentee.last_name}}</p>
              <p>{{absentee.email}}</p>
            </div>
          </div>
        </div>
        <div v-else>
          None
        </div>
      </div>
    </div>
    <!-- Student -->
    <div v-else>
      <div v-if="is_live">
        <div v-if="live_submissions[this.$store.state.user.current_user._id].length > 0">
          <div class="namecard-edging live-color" v-for="submission in live_submissions[this.$store.state.user.current_user._id]" :key="submission._id">
            <div class="namecard">
              <p>Submission Time:</p>
              <p>{{getPrettyDateTimeWithMS(new Date(submission.live_submission_time))}}</p>
            </div>
          </div>
        </div>
        <div v-else>
          None
        </div>
      </div>
      <div v-else-if="is_playback">
        <div v-if="submissions.length > 0">
          <div class="namecard-edging playback-color" v-for="submission in submissions" :key="submission._id">
            <div class="namecard">
              <p>Submission Time:</p>
              <p>{{getPrettyDateTimeWithMS(new Date(submission.live_submission_time))}}</p>
              <p>{{ submission.video_percent * 100 }}%</p>
            </div>
          </div>
        </div>
        <div v-else>
          None
        </div>
      </div>
    </div>
	</div>
</template>


<script>

  export default {
    name: 'LectureAttendanceList',
    props: {
      live_submissions: Object,
      submissions: Array,
      lecture: Object,
      is_live: {
        type: Boolean,
        default: false
      },
      is_playback: {
        type: Boolean,
        default: false
      },
      is_absent: {
        type: Boolean,
        default: false
      },
      is_instructor: Boolean
    },
    components: {
    },
    data(){
      return {
        selected_tab: 0
      }
    },
    created() {
    },
    methods: {
      getPrettyDateTimeWithMS(datetime) {
        if("Invalid Date" == datetime) {
          return ("Not set")
        }
        let hours = datetime.getHours()
        let minutes = datetime.getMinutes()
        if(minutes < 10) {
          minutes = "0" + minutes
        }
        let ms = datetime.getMilliseconds()
        if(ms < 10) {
          ms = "0" + ms
        }
        if(hours < 12) {
          return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==0 ? "12" : hours) + ":" + minutes + ":" + ms + " AM")
        } else {
          return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==12 ? hours : hours-12) + ":" + minutes + ":" + ms + " PM")
        }
      },
    }
  }
</script>

<style scoped>
	.namecard-edging {
	  display: inline-flex;
	  border-radius: .25rem;
	  padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
	  height: 100%;
	  margin-right: 1rem;
	  margin-bottom: 1rem;
	}

	.namecard-edging.live-color {
	  background: green;
	}

	.namecard-edging.playback-color {
	  background: blueviolet;
	}

	.namecard-edging.absent-color {
	  background: red;
	}

	.namecard {
	  position: relative;
	  background: white;
	  text-align: center;
	  border-radius: .25rem;
	  /* top: 0.5rem; */
	  /* margin-left: 0.5rem; */
    margin-bottom: -0.5rem;
    padding: 0.5rem 1rem;
	  /* width: 11rem; */
	  /* height: 4rem; */
	  box-shadow: 0 5px 10px -1px gray;
	  padding-top: 0.5rem;
	  z-index: 100;
	}
</style>
<template>
	<div>
    <div v-if="is_instructor">
      <div v-if="is_live">
        <div v-if="Object.keys(live_submissions).length > 0">
          <div class="namecard-edging live-color" v-for="(submission,i) in Object.keys(live_submissions)" :key="i">
            <div class="namecard">
              {{live_submissions[submission][0].submitter.first_name}} {{live_submissions[submission][0].submitter.last_name}}
              {{live_submissions[submission][0].submitter.email}}
              {{live_submissions[submission].length / lecture.checkins.length * 100}}%
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
              {{submission.submitter.first_name}} {{submission.submitter.last_name}}
              {{submission.submitter.email}}
              {{Math.ceil(submission.video_percent * 100)}}%
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
              {{absentee.first_name}} {{absentee.last_name}}
              {{absentee.email}}
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
              {{getPrettyDateTimeWithMS(new Date(submission.live_submission_time))}}
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
              {{ submission.video_percent * 100 }}%
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
        if(hours < 12) {
          return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==0 ? "12" : hours) + ":" + (datetime.getMinutes()) + ":" + (datetime.getMilliseconds()) + " AM")
        } else {
          return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours-12) + ":" + (datetime.getMinutes()) + ":" + (datetime.getMilliseconds()) + " PM")
        }
      }
    }
  }
</script>

<style scoped>
	.namecard-edging {
	  display: inline-block;
	  border-radius: .25rem;
	  width: 12rem;
	  height: 4rem;
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
	  top: 0.5rem;
	  margin-left: 0.5rem;
	  width: 11rem;
	  height: 4rem;
	  box-shadow: 0 5px 10px -1px gray;
	  padding-top: 0.5rem;
	  z-index: 100;
	}
</style>
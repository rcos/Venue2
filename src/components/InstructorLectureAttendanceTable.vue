<template>
	<div>
		<div id="table-header">
		  <h2>Attendance</h2>
		  <button v-if="lecture.lecture_status === 'is_live' && lecture.checkin_window_status === 'open'" @click="showQR" class="header-btn">Show QR</button>
		  <button v-else-if="lecture.lecture_status === 'is_over' && !lecture.allow_playback_submission">Upload Playback</button>
		  <button v-else-if="lecture.lecture_status === 'is_active_playback'">Watch Playback</button>

<!--       <LectureUploadModal v-if="lecture.lecture_status === 'is_over'" :update_lecture="true"/>
      <router-link v-else-if="((Date.now() > new Date(lecture.end_time)) || (undefined == lecture.end_time))
                    && lecture.video_ref.includes('.')" :to="{name: 'lecture_playback', params: { lecture_id: lecture._id }}">
	        <button class="btn btn-secondary watch-recording">Watch recording</button>
	     </router-link> -->
	  </div>
	  <div id="qr_modal" class="hidden">
	    <canvas id="qr_render_area"></canvas>
	    <button id="close_qr_btn" @click="hideQR">Hide</button>
	  </div>
<!-- 		  <div v-if="is_instructor">
		    <div class="tabs">
		      <button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)"><h5>Live ({{Object.keys(live_submissions).length}}/{{all_students.length}})</h5></button>
		      <button id="playback_btn" class="tab_btn" @click="selectTab(1)"><h5>Playback ({{playback_submissions.length}}/{{all_students.length}})</h5></button>
		      <button id="absent_btn" class="tab_btn" @click="selectTab(2)"><h5>Absent ({{absent.length}}/{{all_students.length}})</h5></button>
		      <button id="stats_btn" class="tab_btn" @click="selectTab(3)"><h5>Statistics</h5></button>
		    </div>
		    <div v-if="selected_tab == 0" id="live_submit" class="tab_section">
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
		    <div v-if="selected_tab == 1" id="playback_submit" class="tab_section">
		      <div v-if="playback_submissions.length > 0">
		        <div class="namecard-edging playback-color" v-for="(submission,i) in playback_submissions" :key="i">
		          <div class="namecard">
		            {{submission.submitter.first_name}} {{submission.submitter.last_name}}
		            {{submission.submitter.email}}
		          </div>
		        </div>
		      </div>
		      <div v-else>
		        None
		      </div>
		    </div>
		    <div v-if="selected_tab == 2" id="no_submit" class="tab_section">
		      <div v-if="absent.length > 0">
		        <div class="namecard-edging absent-color" v-for="(absentee,i) in absent" :key="i">
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
		    <div v-if="selected_tab == 3" id="stats" class="tab_section">
		      Statistics
		    </div>
		  </div>
		  <div v-else class="student_lecture_attendance_info">
		    <div v-if="self_submission_count > 0">
		      <div v-for="student_lecture_submission in student_lecture_submissions">
		        <div v-if="student_lecture_submission.is_live_submission">
		          <p>Live submission was made {{ self_submission_count }} time(s)</p>
		          <p>Live submission time: {{ new Date(student_lecture_submission.live_submission_time) }}</p>
		        </div>
		        <div v-else>
		          <p>Playback Submission was made</p>
		          <ul>
		            <li v-for="answer in student_poll_answers">{{answer}}</li>
		          </ul>
		        </div>
		      </div>
		    </div>
		    <p v-else>No Submission</p>
		  </div>
		</div> -->
	</div>
</template>


<script>
  import QRCode from "qrcode";

  export default {
    name: 'InstructorLectureAttendanceTable',
    props: {
    	lecture: Object
    },
    components: {
    },
    data(){
      return {
      }
    },
    created() {
    	console.log("In insturctor lecture attendance table. Lecture:",this.lecture)
    },
    methods: {
    	showQR() {
    	  QRCode.toCanvas(document.getElementById("qr_render_area"), this.lecture.current_checkin.code, function(error) {
    	    if (error) console.error(error)
    	  });
    	  document.getElementById("qr_modal").classList.remove("hidden")
    	},
    	hideQR() {
    	  document.getElementById("qr_modal").classList.add("hidden")
    	},
    }
  }
</script>

<style scoped>
	#table-header {
	  position: relative;
	  top: 3rem;
	  bottom: 0;
	  text-align: left;
	  padding-left: 5rem;
	  padding-right: 5rem;
	}

	#table-header h2 {
		display: inline-block;
	}

	.header-btn {
		display: inline-block;
		margin-left: 2rem;
	}

	.show-qr-btn {
	  margin-left: 2rem;
	}

	.tab_btn h5 {
	  color: gray;
	}

	.tab_btn.selected_tab {
	  color: blue;
	  border-bottom: .2rem solid blue;
	}

	.tab_btn.selected_tab h5 {
	  color: blue;
	}

	.tab_section {
	  margin-top: 3rem;
	  margin-left: 6rem;
	  overflow-y: auto;
	  height: 17rem;
	  padding-bottom: 3rem;
	}

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

	.hidden {
	  display: none;
	}

</style>
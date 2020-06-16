<template>
	<div>
		<div v-if="lecture.lecture_status === 'is_live' && lecture.checkin_window_status === 'open'" id="qr_modal" class="hidden">
			<qrcode v-bind:value="lecture.current_checkin.code" :options="{ width: 600 }"></qrcode>
		  <button class="btn btn-secondary" id="close_qr_btn" @click="hideQR" aria-label="Hide QR">Hide</button>
		</div>
		<div id="container-header">
			<h2>Attendance</h2>
			<button v-if="lecture.lecture_status === 'is_live' && lecture.checkin_window_status === 'open'" @click="showQR" class="header-btn btn btn-secondary">Show QR</button>
			<LectureUploadModal v-else-if="lecture.lecture_status === 'is_over' && !lecture.allow_playback_submissions" :lecture="lecture" :update_lecture="true" />
			<router-link class="header-btn btn btn-secondary" v-else-if="lecture.allow_playback_submissions" :to="{name: 'lecture_playback', params: { lecture_id: lecture._id }}" aria-label="Watch Playback">
				Watch Playback
			</router-link>
			<div class="float-right" id="manual-override-container">
				<div v-if="override_err_msg != ''" id="override-err-msg">
					<p class="err-msg">{{override_err_msg}}</p>
				</div>
				<div class="input-group row">
					<label for="rcs-ids" id="override-label">Manual override:</label>
					<input id="rcs-ids" type="text" v-model.lazy="overrides" class="form-control" placeholder="eg: 'whitte3,mbizin'" aria-label="RCS IDs to override" aria-describedby="basic-addon2"/>
					<div class="input-group-append">
						<span class="input-group-text" id="basic-addon2">@rpi.edu</span>
					</div>
					<div class="input-group-append">
						<button id="submit-manual-override" class="btn btn-primary" aria-label="Submit Override" @click="handleOverride">Override</button>
					</div>
				</div>
			</div>
	  </div>
	  <LectureAttendanceTable :is_instructor="true" :lecture="lecture" :live_submissions="live_submissions" :playback_submissions="playback_submissions" :absent="absent" :all_students="all_students" />
	</div>
</template>


<script>
  import LectureUploadModal from "@/components/LectureUploadModal";
  import LectureAttendanceTable from "@/components/LectureAttendanceTable.vue";
	import LectureSubmissionAPI from "@/services/LectureSubmissionAPI.js"
	import qrcode from '@chenfengyuan/vue-qrcode';

  export default {
    name: 'InstructorLectureAttendanceContainer',
    props: {
    	lecture: Object,
    	live_submissions: Object,
    	playback_submissions: Array,
    	absent: Array,
    	all_students: Array,
    },
    components: {
    	LectureUploadModal,
    	LectureAttendanceTable,
    	qrcode
    },
    data(){
      return {
				overrides: "",
				override_err_msg: "",
				modal_open: false,
				lecture_has_checkin: false
      }
    },
    created() {
    },
    methods: {
    	showQR() {
    	  document.getElementById("qr_modal").classList.remove("hidden")
    	},
    	hideQR() {
    	  document.getElementById("qr_modal").classList.add("hidden")
    	},
			handleOverride() {
				let rcs_list = this.overrides.replace(/\s/g,'').split(",")
				console.log(rcs_list)
				if(rcs_list.length == 1 && rcs_list[0]=="") {
					this.overrides = ""
					this.override_err_msg = "Empty"
				} else {
					LectureSubmissionAPI.addLiveSubmissionByRCS(rcs_list,this.lecture._id)
					.then(res => {
						if(res.data.length == 0) {
							this.overrides = ""
							this.override_err_msg = ""
						} else {
							this.overrides = res.data.join(",")
							this.override_err_msg = "Remaining are invalid"
						}
					})
				}
			}
    }
  }
</script>

<style scoped>
	#qr_modal {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 5;
		top: 0;
		background-color: white;
	}

	#container-header {
	  position: relative;
	  top: 3rem;
	  bottom: 0;
	  text-align: left;
	  padding-left: 5rem;
	  padding-right: 5rem;
	}

	#container-header h2 {
		display: inline-block;
	}

	.header-btn {
		display: inline-block;
		margin-left: 2rem;
	}

	.show-qr-btn {
	  margin-left: 2rem;
	}

	.tabs {
	  margin-top: 3rem;
	  margin-left: 3rem;
	}

	.tab_btn {
	  background: none;
	  outline: none;
	  border: none;
	  color: gray;
	  margin-right: 3rem;
	}

	.tab_btn h5 {
	  color: gray;
	}

	.tab_btn.selected_tab {
	  color: #0078c2;
	  border-bottom: .2rem solid #0078c2;
	}

	.tab_btn.selected_tab h5 {
	  color: #0078c2;
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

	#rcs-ids {
		height: 100%;
	}

	#override-label {
		margin: auto 1rem;
		font-size: 1.2rem;
	}

	#manual-override-container {
		display: inline-flex;
	}

	#submit-manual-override {
		display: inline;
	}

	#override-err-msg {
		color:#c40000;
		padding: 0.5rem;
	}

</style>
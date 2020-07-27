<template>
	<div>
		<div v-if="current_checkin" id="qr_modal">
			<qrcode v-bind:value="current_checkin.code" :options="{ width: 600 }"></qrcode>
		  <button class="btn btn-secondary" id="close_qr_btn" @click="hideQR" aria-label="Hide QR">Hide</button>
		</div>
		<div id="container-header">
			<h2>Attendance</h2>
			<!-- Pre-set/Random Checkins -->
			<div v-for="(checkin,i) in lecture.checkins" :key="i" class="header-btn">
				<button v-if="checkin.activation != 'Manual Activation' && checkinIsOpen(checkin)" type="button" class="header-btn btn btn-secondary" @click="showQR(i)">Show QR</button>
			</div>
			<LectureUploadModal v-if="lectureIsOver() && !lecture.allow_playback_submissions && polls_loaded" :lecture="lecture" :need_timestamp="polls" :update_lecture="true" />
			<router-link class="header-btn btn btn-secondary" v-else-if="lecture.allow_playback_submissions" :to="{name: 'lecture_playback', params: { lecture_id: lecture._id }}" aria-label="Watch Playback">
				Watch Playback
			</router-link>
			<button class="header-btn btn btn-primary" @click="download_submitty_csv" id="submitty_export">Export for Submitty...</button>
			<!-- Manual Checkins -->
			<div class="float-right" v-for="(checkin,i) in lecture.checkins" :key="'Live'+i">
				<button v-if="checkin.activation == 'Manual Activation'" class="btn btn-secondary" @click="showQR(i)">Open Check-in {{i+1}}</button>
			</div>
	  </div>
	  <LectureAttendanceTable :is_instructor="true" :lecture="lecture" :submissions="submissions" :all_students="all_students" />
	</div>
</template>


<script>
  import LectureUploadModal from "@/components/LectureUploadModal";
  import LectureAttendanceTable from "@/components/LectureAttendanceTable.vue";
	import LectureSubmissionAPI from "@/services/LectureSubmissionAPI.js"
	import SectionAPI from '@/services/SectionAPI.js'
	import qrcode from '@chenfengyuan/vue-qrcode';
	import PlaybackPollAPI from '@/services/PlaybackPollAPI';

  export default {
    name: 'InstructorLectureAttendanceContainer',
    props: {
    	lecture: Object,
    	submissions: Array,
    	all_students: Array,
    },
    components: {
    	LectureUploadModal,
    	LectureAttendanceTable,
    	qrcode
    },
    data(){
      return {
				modal_open: false,
				lecture_has_checkin: false,
				manual_checkins: [],
				current_checkin: null,
				polls: [],
				polls_loaded: false
      }
    },
    created() {
			this.manual_checkins = this.getManualCheckins()
			PlaybackPollAPI.getByLecture(this.lecture._id)
			.then(res => {
				this.polls = res.data
				this.polls_loaded = true
			})
    },
    methods: {
    	showQR(i) {
				this.current_checkin = this.lecture.checkins[i]
    	},
    	hideQR() {
				this.current_checkin = null
    	},
			checkinIsOpen(checkin) {
				let now = new Date()
				return (Date.parse(checkin.start_time) <= now && Date.parse(checkin.end_time) >= now)
			},
			lectureIsOver() {
				return (!this.lecture.end_time || Date.parse(this.lecture.end_time) < Date.now())
			},
			getManualCheckins() {
				return this.lecture.checkins.filter(a => a.activation == 'Manual Activation')
			},
			manuallyOpenCheckin(i) {
				this.lecture.manual_checkin = this.lecture.checkins[i]
			},
			download_submitty_csv() {
				let data = []

				SectionAPI.getSectionsForCourse(this.lecture.sections[0].course._id)
				.then(res => {
					let course_sections = res.data

					let csv = 'Submission Timestamp,User ID,First Name,Last Name,Registration Section,Submission Type,Grade\n';
					data.forEach(function(row) {
						csv += row.join(',');
						csv += "\n";
					});

					let downloadname = this.lecture.sections[0].course.name + '_' + this.lecture.title + '_attendance.csv'

					var hiddenElement = document.createElement('a');
					hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
					hiddenElement.target = '_blank';
					hiddenElement.download = downloadname;
					hiddenElement.click();
				})
			}
    }
  }
</script>

<style scoped>
	#qr_modal {
		position: fixed;
		top: 4rem;
		left: 0;
		right: 0;
		bottom: 2rem;
		z-index: 115;
		background-color: white;
	}

	#container-header {
	  position: relative;
	  top: 3rem;
	  bottom: 0;
	  text-align: left;
	}

	.row {
		margin: 0;
		width: 100%;
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
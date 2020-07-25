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
			<button class="header-btn btn btn-primary" @click="download_submitty_csv" id="submitty_export">Export for Submitty...</button>
	  </div>
	  <LectureAttendanceTable :is_instructor="true" :lecture="lecture" :live_submissions="live_submissions" :playback_submissions="playback_submissions" :absent="absent" :all_students="all_students" />
	</div>
</template>


<script>
  import LectureUploadModal from "@/components/LectureUploadModal";
  import LectureAttendanceTable from "@/components/LectureAttendanceTable.vue";
	import LectureSubmissionAPI from "@/services/LectureSubmissionAPI.js"
	import SectionAPI from '@/services/SectionAPI.js'
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
		download_submitty_csv() {
			let data = []

			SectionAPI.getSectionsForCourse(this.lecture.sections[0].course._id)
			.then(res => {
				let course_sections = res.data

				let self = this
				this.all_students.forEach(function(student) {
					course_sections.forEach(function(section) {
						if(section.students.includes(student._id)) {
							let stud_data = []
							
							let live = self.live_submissions[student._id]
							let playback = self.playback_submissions.find(x => x.submitter._id == student._id)
							
							if(undefined != live && undefined != playback) {
								if(live.length / self.lecture.checkins.length >= playback.video_percent) {
									stud_data.push(live[live.length-1].live_submission_time)
									stud_data.push(student.user_id)
									stud_data.push(student.first_name)
									stud_data.push(student.last_name)
									stud_data.push(section.number)
									stud_data.push("Live")
									stud_data.push(live.length / self.lecture.checkins.length)
								} else {
									stud_data.push(playback.playback_submission_time)
									stud_data.push(student.user_id)
									stud_data.push(student.first_name)
									stud_data.push(student.last_name)
									stud_data.push(section.number)
									stud_data.push("Playback")
									stud_data.push(playback.video_percent)
								}
							} else if(undefined != live) {
								stud_data.push(live[live.length-1].live_submission_time)
								stud_data.push(student.user_id)
								stud_data.push(student.first_name)
								stud_data.push(student.last_name)
								stud_data.push(section.number)
								stud_data.push("Live")
								stud_data.push(live.length / self.lecture.checkins.length)
							} else if(undefined != playback) {
								stud_data.push(playback.playback_submission_time)
								stud_data.push(student.user_id)
								stud_data.push(student.first_name)
								stud_data.push(student.last_name)
								stud_data.push(section.number)
								stud_data.push("Playback")
								stud_data.push(playback.video_percent)
							} else {
								stud_data.push(null)
								stud_data.push(student.user_id)
								stud_data.push(student.first_name)
								stud_data.push(student.last_name)
								stud_data.push(section.number)
								stud_data.push(null)
								stud_data.push(0)
							}

							data.push(stud_data)
						}
					})
				})

				let csv = 'Submission Timestamp,User ID,First Name,Last Name,Registration Section,Submission Type,Grade\n';
				data.forEach(function(row) {
					csv += row.join(',');
					csv += "\n";
				});

				let downloadname = self.lecture.sections[0].course.name + '_' + self.lecture.title + '_attendance.csv'

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
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 115;
		top: 0;
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
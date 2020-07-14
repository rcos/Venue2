<template>
	<div id="lecture-attendance-table">
		<div class="tabs" v-if="all_students">
			<button id="live_btn" class="tab_btn selected_tab" tabindex="0" @click="selectTab(0)" aria-label="Show Live Attendance"
				role="tab" aria-selected="true" aria-controls="live_submit"><h5>Live ({{Object.keys(live_submissions).length}}/{{all_students.length}})</h5></button>
			<button id="playback_btn" class="tab_btn" tabindex="0" @click="selectTab(1)" aria-label="Show Playback Attendance"
				role="tab" aria-selected="false" aria-controls="playback_submit"><h5>Playback ({{playback_submissions.length}}/{{all_students.length}})</h5></button>
			<button id="absent_btn" class="tab_btn" tabindex="0" @click="selectTab(2)" aria-label="Show Absent"
				role="tab" aria-selected="false" aria-controls="no_submit"><h5>Absent ({{absent.length}}/{{all_students.length}})</h5></button>
			<button id="instructors_only_btn" class="tab_btn" tabindex="0" @click="selectTab(3)" aria-label="Show Instructors Only"
				role="tab" aria-selected="false" aria-controls="instructors_only"><h5>Instructors Only</h5></button>
		</div>
		<div class="tabs" v-else>
			<button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)" tabindex="0" aria-label="Show Live Attendance"
				role="tab" aria-selected="true" aria-controls="live_submit"><h5>Live</h5></button>
			<button id="playback_btn" class="tab_btn" @click="selectTab(1)" tabindex="0" aria-label="Show Playback Attendance"
				role="tab" aria-selected="false" aria-controls="playback_submit"><h5>Playback</h5></button>
			<button id="absent_btn" class="tab_btn" @click="selectTab(2)" tabindex="0" aria-label="Show Absent"
				role="tab" aria-selected="false" aria-controls="no_submit"><h5>Absent</h5></button>
		</div>
		<div v-if="selected_tab === 0" role="tabpanel" aria-labelledby="live_btn" id="live_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :live_submissions="live_submissions" :is_live="true" />
		</div>
		<div v-if="selected_tab === 1" role="tabpanel" aria-labelledby="playback_btn" id="playback_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions="playback_submissions" :is_playback="true" />
		</div>
		<div v-if="selected_tab === 2" role="tabpanel" aria-labelledby="absent_btn" id="no_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions="absent" :is_absent="true" />
		</div>
		<div v-if="selected_tab === 3" role="tabpanel" aria-labelledby="instructors_only_btn" id="instructors_only" class="tab_section">
			<div id="manual-override-container">
				<div v-if="override_err_msg != ''" id="override-err-msg">
					<p class="err-msg">{{override_err_msg}}</p>
				</div>
				<div class="input-group">
					<label for="rcs-ids" id="override-label">Manual override:</label>
					<input id="rcs-ids" type="text" v-model.lazy="overrides" class="form-control" placeholder="eg: 'whitte3,mbizin'" aria-label="RCS IDs to override"/>
					<div class="input-group-append">
						<button id="submit-manual-override" class="btn btn-primary" aria-label="Submit Override" @click="handleOverride">Override</button>
					</div>
				</div>
			</div>
			<div class="row justify-content-center">
				<div id="table-container">
					<label id="checkin-table-label">Check-in Windows</label>
					<table id="checkins-container" aria-labelledby="checkin-table-label">
						<thead>
							<tr>
								<th>Start Time</th>
								<th>End Time</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(checkin,i) in lecture.checkins" :key="i">
								<td>{{ getPrettyDateTime(new Date(checkin.start_time)) }}</td>
								<td>{{ getPrettyDateTime(new Date(checkin.end_time)) }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js'
  import LectureAttendanceList from '@/components/LectureAttendanceList.vue'

  export default {
    name: 'LectureAttendanceTable',
    props: {
      lecture: Object,
    	live_submissions: Object,
    	playback_submissions: Array,
    	absent: Array,
    	all_students: Array,
      is_instructor: Boolean
    },
    components: {
      LectureAttendanceList
    },
    data(){
      return {
        selected_tab: 0,
				overrides: "",
				override_err_msg: ""
      }
    },
    created() {
    },
    methods: {
    	selectTab(i) {
    	  let btns = [
    	    document.getElementById("live_btn"),
    	    document.getElementById("playback_btn"),
    	    document.getElementById("absent_btn")
    	  ]
				if(this.all_students) {
					btns.push(document.getElementById("instructors_only_btn"))
				}
    	  for(let j=0;j<btns.length;j++) {
    	    if(j==i) {
    	      btns[j].classList.add("selected_tab")
			  		btns[j].setAttribute("aria-selected","true")
    	    } else {
    	      btns[j].classList.remove("selected_tab")
			  		btns[j].setAttribute("aria-selected","false")
    	    }
    	  }
    	  this.selected_tab = i
    	},
			handleOverride() {
				let rcs_list = this.overrides.replace(/\s/g,'').split(",")
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
			},
			getPrettyDateTime(datetime) {
				if("Invalid Date" == datetime) {
					return ("Not set")
				}
				let hours = datetime.getHours()
				let minutes = datetime.getMinutes()
				if(minutes < 10) {
					minutes = "0" + minutes
				}
				if(hours < 12) {
					return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==0 ? "12" : hours) + ":" + minutes + " AM")
				} else {
					return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==12 ? hours : hours-12) + ":" + minutes + " PM")
				}
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
				})
			},
			getPrettyDateTime(datetime) {
				if("Invalid Date" == datetime) {
					return ("Not set")
				}
				let hours = datetime.getHours()
				if(hours < 12) {
					return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==0 ? "12" : hours) + ":" + (datetime.getMinutes()) + " AM")
				} else {
					return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours-12) + ":" + (datetime.getMinutes()) + " PM")
				}
			}
		}
	}
</script>

<style scoped>
	#lecture-attendance-table {
		margin-top: 2rem;
		text-align: start;
	}

	.tabs {
	  margin-top: 5rem;
		margin-left: 2rem;
	}

	.tab_btn {
	  background: none;
	  outline: none;
	  border: none;
	  color: #636363;
	  margin-right: 3rem;
	}

	.tab_btn h5 {
	  color: #636363;
	}

	.tab_btn.selected_tab {
	  color: #0078c2;
	  border-bottom: .2rem solid #0078c2;
	}

	.tab_btn.selected_tab h5 {
	  color: #0078c2;
	}

	.tab_btn:hover,
	.tab_btn:focus {
	  color: #636363;
	  border-bottom: .2rem solid #636363;
	}

	.tab_btn.selected_tab:hover,
	.tab_btn.selected_tab:focus {
	  color: #636363;
	  border-bottom: .2rem solid #636363;
	}

	.tab_btn.selected_tab:hover h5,
	.tab_btn.selected_tab:focus h5 {
	  color: #636363;
	}

	#stats_btn {

	}

	.tab_section {
		text-align: center;
	  margin-top: 3rem;
	  overflow-y: auto;
	  padding-bottom: 3rem;
	}

	.row,
	.col {
		margin: 0;
		padding: 0;
		margin-top: 2rem;
	}

	#rcs-ids {
		height: 100%;
	}

	#override-label {
		margin: auto 1rem;
		font-size: 1.2rem;
	}

	.override-row {
		height: 2rem;
	}

	#manual-override-container {
		display: flex;
		height: 3rem;
	}

	#override-err-msg {
		color:#c40000;
		padding: 0.5rem;
	}

	#checkins-section {
		display: inline-block;
	}

	table, th, td {
		border: 1px solid black;
		padding: 0.5rem;
	}

	th {
		font-weight: 900;
	}

	#instructors_only {
		/* max-width: 70%; */
		margin: 0 auto;
		margin-top: 2rem;
	}

	#stats {
		margin: 0;
		padding: 0;
	}
</style>
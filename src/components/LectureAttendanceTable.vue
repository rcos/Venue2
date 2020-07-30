<template>
	<div id="lecture-attendance-table">
		<div class="tabs" v-if="all_students">
			<button id="live_btn" class="tab_btn selected_tab" tabindex="0" @click="selectTab(0)" aria-label="Show Live Attendance"
				role="tab" aria-selected="true" aria-controls="live_submit"><h5>
					Live ({{(live_percent*100).toFixedDecimals(1)}}%)
				</h5></button>
			<button id="playback_btn" class="tab_btn" tabindex="0" @click="selectTab(1)" aria-label="Show Playback Attendance"
				role="tab" aria-selected="false" aria-controls="playback_submit"><h5>
					Recording ({{(playback_percent*100).toFixedDecimals(1)}}%)
				</h5></button>
			<button id="absent_btn" class="tab_btn" tabindex="0" @click="selectTab(2)" aria-label="Show Absent"
				role="tab" aria-selected="false" aria-controls="no_submit"><h5>
					Absent ({{(submissions_with_nothing.length/all_students.length*100).toFixedDecimals(1)}}%)
				</h5></button>
			<button id="instructors_only_btn" class="tab_btn" tabindex="0" @click="selectTab(3)" aria-label="Show Instructors Only"
				role="tab" aria-selected="false" aria-controls="instructors_only"><h5>Instructors Only</h5></button>
		</div>
		<div class="tabs" v-else>
			<button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)" tabindex="0" aria-label="Show Live Attendance"
				role="tab" aria-selected="true" aria-controls="live_submit"><h5>Live</h5></button>
			<button id="playback_btn" class="tab_btn" @click="selectTab(1)" tabindex="0" aria-label="Show Playback Attendance"
				role="tab" aria-selected="false" aria-controls="playback_submit"><h5>Recording</h5></button>
			<button id="absent_btn" class="tab_btn" @click="selectTab(2)" tabindex="0" aria-label="Show Absent"
				role="tab" aria-selected="false" aria-controls="no_submit"><h5>Absent</h5></button>
		</div>
		<div v-if="selected_tab === 0" role="tabpanel" aria-labelledby="live_btn" id="live_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions_with_live="submissions_with_live" :is_live="true" />
		</div>
		<div v-if="selected_tab === 1" role="tabpanel" aria-labelledby="playback_btn" id="playback_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions_with_playback="submissions_with_playback" :is_playback="true" />
		</div>
		<div v-if="selected_tab === 2" role="tabpanel" aria-labelledby="absent_btn" id="no_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions_with_nothing="submissions_with_nothing" :is_absent="true" />
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
				<div id="table-container" v-if="lecture.checkins.length > 0">
					<label id="checkin-table-label">Check-in Windows</label>
					<table id="checkins-container" aria-labelledby="checkin-table-label">
						<thead>
							<tr>
								<th>Start Time</th>
								<th>End Time</th>
								<th>Timestamp</th>
								<th>Poll</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(checkin,i) in lecture.checkins" :key="i">
								<td v-if="checkin.start_time">{{ getPrettyDateTime(new Date(checkin.start_time)) }}</td>
								<td v-else>Manual</td>
								<td v-if="checkin.end_time">{{ getPrettyDateTime(new Date(checkin.end_time)) }}</td>
								<td v-else>Manual</td>
								<td v-if="polls[i] && polls[i].timestamp">{{ polls[i].timestamp }}</td>
								<td v-else>X</td>
								<td v-if="polls[i]">
									<div id="edit-poll-modal-container" v-if="edit_poll_index != -1 && edit_poll_index == i">
										<div id="edit-poll-modal-contents">
											<CreatePoll :playback_only="false" :checkin="i" :poll="polls[i]" @cancel="handleCancelEditPoll" @addPoll="handleEditPoll"/>
										</div>
									</div>
									{{polls[i].question}}
									<button type="button" v-if="!checkin.start_time || (checkin.start_time && Date.parse(checkin.start_time) > Date.now())" class="btn btn-secondary" @click="edit_poll_index = i" :title="'Edit '+polls[i].question">
										<img src="@/assets/icons8-edit.svg" alt="Edit" width="40" aria-label="Edit">
									</button>
								</td>
								<td v-else>X</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div id="table-container" v-else-if="polls.length > 0">
					<label id="checkin-table-label">Video Polls</label>
					<table id="checkins-container" aria-labelledby="checkin-table-label">
						<thead>
							<tr>
								<th>Seconds In</th>
								<th>Poll</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(poll,i) in polls" :key="i">
								<td>{{poll.timestamp}}</td>
								<td>
									<div id="edit-poll-modal-container" v-if="edit_poll_index != -1 && edit_poll_index == i">
										<div id="edit-poll-modal-contents">
											<CreatePoll :playback_only="false" :checkin="i" :poll="polls[i]" @cancel="handleCancelEditPoll" @addPoll="handleEditPoll"/>
										</div>
									</div>
									{{polls[i].question}}
									<button type="button" v-if="Date.parse(lecture.playback_submission_start_time) > Date.now()" class="btn btn-secondary" @click="edit_poll_index = i" :title="'Edit '+polls[i].question">
										<img src="@/assets/icons8-edit.svg" alt="Edit" width="40" aria-label="Edit">
									</button>
								</td>
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
	import PlaybackPollAPI from '@/services/PlaybackPollAPI'

  import LectureAttendanceList from '@/components/LectureAttendanceList.vue'
	import CreatePoll from '@/components/CreatePoll.vue'

  export default {
    name: 'LectureAttendanceTable',
    props: {
      lecture: Object,
    	submissions: Array,
    	all_students: Array,
      is_instructor: Boolean,
			polls: Array
    },
    components: {
      LectureAttendanceList,
			CreatePoll
    },
    data(){
      return {
        selected_tab: 0,
				overrides: "",
				override_err_msg: "",
				submissions_with_live: [],
				submissions_with_playback: [],
				submissions_with_nothing: [],
				live_percent: 0,
				playback_percent: 0,
				absent_percent: 0,
				edit_poll_index: -1
      }
    },
    created() {
			this.parseSubmissions()
    },
    methods: {
			parseSubmissions() {
				let livesum = 0
				let playsum = 0
				this.submissions.forEach(submission => {
					let hasAttendance = false
					if(submission.live_progress) {
						this.submissions_with_live.push(submission)
						hasAttendance = true
						livesum += submission.live_percent
					}
					if(submission.video_progress) {
						this.submissions_with_playback.push(submission)
						hasAttendance = true
						playsum += submission.video_percent
					}
					if(!hasAttendance) {
						this.submissions_with_nothing.push(submission)
					}
				})
				if(this.all_students) {
					this.live_percent = livesum / this.all_students.length
					this.playback_percent = playsum / this.all_students.length
					let submitted_student_ids = this.submissions.map(a=>a.submitter._id)
					this.all_students.forEach(stud => {
						if(!submitted_student_ids.includes(stud._id)) {
							this.submissions_with_nothing.push({
								lecture: this.lecture._id,
								submitter: stud
							})
						}
					})
				}
			},selectTab(i) {
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
			handleCancelEditPoll() {
				this.edit_poll_index = -1
			},
			handleEditPoll(poll) {
				PlaybackPollAPI.update(poll).then(res => {location.reload()})
			}
		}
	}
</script>

<style scoped>
	#lecture-attendance-table {
		margin-top: 3rem;
		text-align: start;
	}

	#edit-poll-modal-container {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.65);
	}

	#edit-poll-modal-contents {
		position: fixed;
		top: 25%;
		bottom: 25%;
		left: 25%;
		right: 25%;
		background: white;
		border: 1px solid gray;
		padding: 1rem;
		border-radius: 1rem;
	}

	.tabs {
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
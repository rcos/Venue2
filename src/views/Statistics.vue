<template>
	<div id="stats-container">
		<div id="stats-left">
			<div id="side-panel" class="stats-panel">
				<div class="row side-panel-section">
					<div class="col selector-label">
						Course:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="course-selector" v-if="courses.all.length > 0" :options="courses.all" property="name" @update="handleCourseChange" :max="1" :n="0" ref="courseSelector"/>
					</div>
				</div>
				<div class="row side-panel-section">
					<div class="col selector-label">
						Sections:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="sections-selector" v-if="sections.filtered.length > 0" :options="sections.filtered" property="number" @update="handleSectionsChange" :max="4" :n="1" ref="sectionsSelector"/>
					</div>
				</div>
				<div class="row side-panel-section">
					<div class="col selector-label">
						Lectures:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="lectures-selector" v-if="lectures.filtered.length > 0" :options="lectures.filtered" property="title" @update="handleLecturesChange" :max="4" :n="2" ref="lecturesSelector"/>
					</div>
				</div>
			</div>
		</div>
		<div id="stats-right">
			<div id="stats-right-top">
				<div id="top-panel" class="stats-panel">
					<ToggleSwitch v-if="lectures.active.length != 1 && courses.active" label="Stacked" :start="stacked" @toggle="handleToggleStacked"/>
					<ToggleSwitch v-if="lectures.active.length == 1 && courses.active" label="Half" :start="half" @toggle="handleToggleHalf"/>
				</div>
			</div>
			<div id="stats-right-bottom">
				<div id="stats-render">
					<div v-if="lectures.active.length > 0">
						<canvas id="lectureChart"></canvas>
					</div>
					<div v-else-if="sections.active.length > 0">
						<canvas v-for="section in sections.active" :id="'sectionChart_'+section.number" :key="section.number"></canvas>
					</div>
					<canvas v-else-if="courses.active" id="courseChart"></canvas>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CourseAPI from '@/services/CourseAPI.js'
import SectionAPI from '@/services/SectionAPI.js'
import LectureAPI from '@/services/LectureAPI.js'
import LectureSubmissionAPI from '@/services/LectureSubmissionAPI.js'

import chartjs from 'chart.js'

import MultiSelectDropdown from '@/components/MultiSelectDropdown.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'

export default {
	name: 'Statistics',
	props: {
	},
	computed: {
	},
	components: {
		MultiSelectDropdown,
		ToggleSwitch
	},
	data(){
		return {
			current_user: null,
			courses: {
				all: [],
				active: null //selected from dropdown
			},
			sections: {
				all: [],
				filtered: [], //for course
				active: [] //selected from dropdown
			},
			lectures: {
				all: [],
				filtered: [], //for sections/course
				active: [] //selected from dropdown
			},
			lectureSubmissions: {
				all: [],
				filtered: [] //for lectures/sections/course
			},
			colors: {
				green: {
					fill: '#bfffc6',
					stroke: '#04dd74',
				},
				blue: {
					fill: '#92bed2',
					stroke: '#3282bf',
				},
				red: {
					fill: '#ff8787',
					stroke: '#e95454'
				}
			},
			charts: [],
			stacked: true,
			half: true,
			pieLabel: 0
		}
	},
	created() {
		this.current_user = this.$store.state.user.current_user;
		this.fetchData()
	},
	methods: {
		fetchData() {
			CourseAPI.getInstructorCourses(this.current_user._id)
			.then(res => {
				this.courses.all = res.data
				this.courses.all.forEach(course => {
					SectionAPI.getSectionsForCourse(course._id)
					.then(res2 => {
						this.sections.all = this.sections.all.concat(res2.data)
					})
				})
			})
			LectureAPI.getLecturesForUser(this.current_user._id,'none')
			.then(res => {
				this.lectures.all = res.data
				let all_submissions = []
				this.lectures.all.forEach(lecture => {
					all_submissions = all_submissions.concat(new Promise((resolve,reject) => {
						LectureSubmissionAPI.getLectureSubmissionsForLecture(lecture._id)
						.then(res => {
							let submissions = []
							res.data.forEach(lectSub => {
								submissions.push(new Promise((resolve2,reject2) => {
									resolve2(lectSub)
								}))
							})
							Promise.all(submissions).then(resolved => {
								resolve(resolved)
							})
						})
					}))
				})
				Promise.all(all_submissions).then(resolved => {
					this.lectureSubmissions.all = [].concat.apply([], resolved)
				})
			})
		},
		setupGraphs() {
			if(this.lectures.active.length > 0) {
				let lecturesAttendance = {}
				this.lectures.active.forEach(lecture => {
					lecturesAttendance[lecture._id] = {
						obj: {},
						live: null,
						playback: null,
						absent: null,
						date: null
					}
					lecture.students = {}
					lecture.sections.forEach(sectID => {
						let section = this.sections.all.find(section => section._id == sectID)
						section.students.forEach(studID => {
							lecture.students[studID] = {
								live: [],
								playback: null
							}
						})
					})
					let subsForLecture = this.lectureSubmissions.filtered.filter(a => a.lecture == lecture._id)
					subsForLecture.forEach(sub => {
						Object.keys(lecture.students).forEach(studID => {
							if(sub.submitter._id == studID) {
								if(sub.is_live_submission) {
									lecture.students[studID].live.push(sub)
								} else {
									lecture.students[studID].playback = sub
								}
							}
						})
					})
					let lectAttendance = this.getAttendanceForLecture(lecture)
					lecturesAttendance[lecture._id].live = lectAttendance.live
					lecturesAttendance[lecture._id].playback = lectAttendance.playback
					lecturesAttendance[lecture._id].absent = lectAttendance.absent
					if(lecture.start_time) {
						lecturesAttendance[lecture._id].date = lecture.start_time
					} else if(lecture.playback_submission_start_time) {
						lecturesAttendance[lecture._id].date = lecture.playback_submission_start_time
					}
					lecturesAttendance[lecture._id].obj = lecture
				})
				let lectIDs = Object.keys(lecturesAttendance)
				if(lectIDs.length == 1) {
					this.createPieGraph({
						chartID: "lectureChart",
						title: lecturesAttendance[lectIDs[0]].obj.title + " Attendance",
						live: lecturesAttendance[lectIDs[0]].live,
						playback: lecturesAttendance[lectIDs[0]].playback,
						absent: lecturesAttendance[lectIDs[0]].absent
					})
					this.pieLabel = 100 - lecturesAttendance[lectIDs[0]].absent
				} else {
					lectIDs.sort((a,b) => {
						(lecturesAttendance[a].obj.start_time > lecturesAttendance[b].obj.start_time ||
						lecturesAttendance[a].obj.playback_submission_start_time > lecturesAttendance[b].obj.playback_submission_start_time ||
						lecturesAttendance[a].obj.start_time > lecturesAttendance[b].obj.playback_submission_start_time ||
						lecturesAttendance[a].obj.playback_submission_start_time > lecturesAttendance[b].obj.start_time) ? 1 : -1}
					)
					let live = []
					let playback = []
					let absent = []
					let labels = []
					lectIDs.forEach(lectID => {
						live.push(lecturesAttendance[lectID].live)
						playback.push(lecturesAttendance[lectID].playback)
						absent.push(lecturesAttendance[lectID].absent)
						labels.push(lecturesAttendance[lectID].obj.title)
					})
					this.createBarsGraph({
						chartID: "lectureChart",
						title: "Lectures Attendance",
						live: live,
						playback: playback,
						absent: absent,
						labels: labels
					})
				}
			} else if(this.sections.active.length > 0) {
				let sections = {}
				this.sections.active.sort((a,b) => a.number > b.number ? 1 : -1)
				this.sections.active.forEach(section => {
					sections[section.number] = {
						live: [],
						playback: [],
						absent: [],
						dates: []
					}
					this.lectures.filtered.sort((a, b) => 
						(a.start_time > b.start_time || a.playback_submission_start_time > b.playback_submission_start_time ||
						a.start_time > b.playback_submission_start_time || a.playback_submission_start_time > b.start_time) ? 1 : -1
					)
					this.lectures.filtered.forEach(lecture => {
						if(lecture.sections.includes(section._id)) {
							lecture.students = {}
							lecture.sections.forEach(sectID => {
								let section = this.sections.all.find(section => section._id == sectID)
								section.students.forEach(studID => {
									lecture.students[studID] = {
										live: [],
										playback: null
									}
								})
							})
							let subsForLecture = this.lectureSubmissions.filtered.filter(a => a.lecture == lecture._id)
							subsForLecture.forEach(sub => {
								Object.keys(lecture.students).forEach(studID => {
									if(sub.submitter._id == studID) {
										if(sub.is_live_submission) {
											lecture.students[studID].live.push(sub)
										} else {
											lecture.students[studID].playback = sub
										}
									}
								})
							})
							let lectAttendance = this.getAttendanceForLecture(lecture)
							sections[section.number].live.push(lectAttendance.live)
							sections[section.number].playback.push(lectAttendance.playback)
							sections[section.number].absent.push(lectAttendance.absent)
							if(lecture.start_time) {
								sections[section.number].dates.push(lecture.start_time)
							} else if(lecture.playback_submission_start_time) {
								sections[section.number].dates.push(lecture.playback_submission_start_time)
							} else {
								sections[section.number].dates.push(null)
							}
						}
					})
					this.createAreaGraph({
						chartID: "sectionChart_"+section.number,
						title: this.courses.active.name + " - Section " + section.number + " Attendance",
						live: sections[section.number].live,
						playback: sections[section.number].playback,
						absent: sections[section.number].absent,
						dates: sections[section.number].dates
					})
				})
			} else if(this.courses.active) {
				let live = []
				let playback = []
				let absent = []
				let dates = []
				this.lectures.filtered.sort((a, b) => 
					(a.start_time > b.start_time || a.playback_submission_start_time > b.playback_submission_start_time ||
					a.start_time > b.playback_submission_start_time || a.playback_submission_start_time > b.start_time) ? 1 : -1
				)
				this.lectures.filtered.forEach(lecture => {
					lecture.students = {}
					lecture.sections.forEach(sectID => {
						let section = this.sections.all.find(section => section._id == sectID)
						section.students.forEach(studID => {
							lecture.students[studID] = {
								live: [],
								playback: null
							}
						})
					})
					let subsForLecture = this.lectureSubmissions.filtered.filter(a => a.lecture == lecture._id)
					subsForLecture.forEach(sub => {
						Object.keys(lecture.students).forEach(studID => {
							if(sub.submitter._id == studID) {
								if(sub.is_live_submission) {
									lecture.students[studID].live.push(sub)
								} else {
									lecture.students[studID].playback = sub
								}
							}
						})
					})
					let lectAttendance = this.getAttendanceForLecture(lecture)
					live.push(lectAttendance.live)
					playback.push(lectAttendance.playback)
					absent.push(lectAttendance.absent)
					if(lecture.start_time) {
						dates.push(lecture.start_time)
					} else if(lecture.playback_submission_start_time) {
						dates.push(lecture.playback_submission_start_time)
					} else {
						dates.push(null)
					}
				})
				this.createAreaGraph({
					chartID: "courseChart",
					title: this.courses.active.name + " Attendance",	
					live: live,
					playback: playback,
					absent: absent,
					dates: dates
				})
			}
		},
		getAttendanceForLecture(lecture) {
			let lectureStudents = Object.keys(lecture.students)
			let lectureLive = 0
			let lecturePlayback = 0
			let lectureAbsent = 0
			lectureStudents.forEach(studID => {
				let studSubmissions = lecture.students[studID]
				if(studSubmissions.live.length > 0 && studSubmissions.playback != null) {
					let percentage = Math.max(
						studSubmissions.live.length / lecture.checkins.length * 100,
						Math.ceil(studSubmissions.playback.video_percent * 100)
					)
					if(studSubmissions.live.length / lecture.checkins.length == percentage) {
						lectureLive += percentage
					} else {
						lecturePlayback += percentage
					}
					lectureAbsent += (100 - percentage)
				} else if(studSubmissions.live.length > 0) {
					let percentage = studSubmissions.live.length / lecture.checkins.length * 100
					lectureLive += percentage
					lectureAbsent += (100 - percentage)
				} else if(studSubmissions.playback != null) {
					let percentage = Math.ceil(studSubmissions.playback.video_percent * 100)
					lecturePlayback += percentage
					lectureTotal += (100 - percentage)
				} else {
					lectureAbsent += 100
				}
			})
			lectureLive /= lectureStudents.length
			lecturePlayback /= lectureStudents.length
			lectureAbsent /= lectureStudents.length
			return {
				live: lectureLive,
				playback: lecturePlayback,
				absent: lectureAbsent
			}
		},
		createPieGraph(chartInfo) {
			let ctx = document.getElementById(chartInfo.chartID).getContext('2d')
			this.charts.push(new Chart(ctx, {
				type: 'pie',
				data: {
					labels: ['Live', 'Playback', 'Absent'],
					datasets: [{
						data: [chartInfo.live,chartInfo.playback,chartInfo.absent],
						backgroundColor: [
							this.colors.green.fill,
							this.colors.blue.fill,
							this.colors.red.fill
						],
						borderColor: [
							this.colors.green.stroke,
							this.colors.blue.stroke,
							this.colors.red.stroke
						],
						borderWidth: 3
					}]
				},
				options: {
					title: {
						text: chartInfo.title,
						display: true,
						fontSize: 24
					},
					cutoutPercentage: 65,
					responsive: true,
					rotation: (this.half ? 1*Math.PI : 1.5*Math.PI),
					circumference: (this.half ? 1*Math.PI : 2*Math.PI)
				}
			}))
		},
		createBarsGraph(chartInfo) {
			let ctx = document.getElementById(chartInfo.chartID).getContext('2d')
			this.charts.push(new Chart(ctx, {
				type: 'bar',
				data: {
					labels: chartInfo.labels,
					datasets: [{
						label: 'Live',
						backgroundColor: this.colors.green.fill,
						borderColor: this.colors.green.stroke,
						borderWidth: 3,
						data: chartInfo.live,
					}, {
						label: 'Playback',
						backgroundColor: this.colors.blue.fill,
						borderColor: this.colors.blue.stroke,
						borderWidth: 3,
						data: chartInfo.playback,
					}, {
						label: 'Absent',
						backgroundColor: this.colors.red.fill,
						borderColor: this.colors.red.stroke,
						borderWidth: 3,
						data: chartInfo.absent,
					}],
				},
				options: {
					title: {
						text: chartInfo.title,
						display: true,
						fontSize: 24
					},
					tooltips: {
						displayColors: true,
						callbacks:{
							mode: 'x',
						},
					},
					scales: {
						xAxes: [{
							stacked: this.stacked,
							gridLines: {
								display: false,
							}
						}],
						yAxes: [{
							stacked: this.stacked,
							ticks: {
								beginAtZero: true,
							},
							type: 'linear',
							ticks: {
								callback: function(value, index, values) {
									return value+"%";
								}
							}
						}]
					},
					responsive: true
				}
			}
			))
		},
		createAreaGraph(chartInfo) {
			let self = this
			let ctx = document.getElementById(chartInfo.chartID).getContext('2d')
			this.charts.push(new Chart(ctx, {
				type: 'line',
				data: {
					labels: chartInfo.dates,
					datasets: [{
						label: "Live",
						fill: true,
						backgroundColor: this.colors.green.fill,
						pointBackgroundColor: this.colors.green.stroke,
						borderColor: this.colors.green.stroke,
						pointHighlightStroke: this.colors.green.stroke,
						borderCapStyle: 'butt',
						pointRadius: 5,
						pointHoverRadius: 10,
						data: chartInfo.live,
					}, {
						label: "Playback",
						fill: true,
						backgroundColor:this.colors.blue.fill,
						pointBackgroundColor: this.colors.blue.stroke,
						borderColor: this.colors.blue.stroke,
						pointHighlightStroke: this.colors.blue.stroke,
						borderCapStyle: 'butt',
						pointRadius: 5,
						pointHoverRadius: 10,
						data: chartInfo.playback,
					}, {
						label: "Absent",
						fill: true,
						backgroundColor: this.colors.red.fill,
						pointBackgroundColor: this.colors.red.stroke,
						borderColor: this.colors.red.stroke,
						pointHighlightStroke: this.colors.green.stroke,
						borderCapStyle: 'butt',
						pointRadius: 5,
						pointHoverRadius: 10,
						data: chartInfo.absent,
					}]
				},
				options: {
					responsive: true,
					title: {
						display: true,
						text: chartInfo.title,
						fontSize: 24
					},
					scales: {
						yAxes: [{
							stacked: this.stacked,
							ticks: {
								callback: function(value, index, values) {
									return value+"%";
								}
							}
						}],
						xAxes: [{
							ticks: {
								callback: function(value, index, values) {
									return self.getPrettyDateTime(value);
								}
							}
						}]
					},
					animation: {
						duration: 1000,
					},
				}
			}))
		},
		handleCourseChange(data) {
			this.clearCharts()
			this.lectures.active = []
			this.sections.active = []
			this.courses.active = data[0]
			this.getSectionsForCourse(data[0])
			.then(sections => {
				if(undefined != this.sections.filtered && this.sections.filtered.length > 0) {
					this.$refs.sectionsSelector.repopulate(sections)
				}
				this.sections.filtered = sections
				this.execLecturesForSections(sections)
			})
		},
		handleSectionsChange(data) {
			this.clearCharts()
			this.lectures.active = []
			this.sections.active = data
			this.execLecturesForSections(data)
		},
		handleLecturesChange(data) {
			this.clearCharts()
			this.lectures.active = data
			this.execSubmissionsForLectures(data)
		},
		execLecturesForSections(data) {
			this.getLecturesForSections(data)
			.then(lectures => {
				let clean = lectures.filter(a => undefined != a)
				if(undefined != this.lectures.filtered && this.lectures.filtered.length > 0) {
					this.$refs.lecturesSelector.repopulate(clean)
				}
				this.lectures.filtered = clean
				this.execSubmissionsForLectures(clean)
			})
		},
		execSubmissionsForLectures(lectures) {
			this.getSubmissionsForLectures(lectures)
			.then(submissions => {
				this.lectureSubmissions.filtered = submissions
				this.setupGraphs()
			})
		},
		async getSectionsForCourse(course) {
			let sectionsForCourse = []
			this.sections.all.forEach(section => {
				if(section.course == course._id) {
					sectionsForCourse.push(new Promise((resolve,reject) => {
						resolve(section)
					}))
				}
			})
			return Promise.all(sectionsForCourse)
		},
		async getLecturesForSections(sections) {
			let lecturesForSections = []
			this.lectures.all.forEach(lecture => {
				let ids
				if(sections.length == 0) {
					ids = this.sections.filtered.map(a => a._id)
				} else {
					ids = sections.map(a => a._id)
				}
				if(ids.some(v => lecture.sections.includes(v))) {
					lecturesForSections.push(
						new Promise((resolve,reject) => {
							resolve(lecture)
						})
					)
				}
			})
			return Promise.all(lecturesForSections)
		},
		async getSubmissionsForLectures(lectures) {
			let submissions = []
			this.lectureSubmissions.all.forEach(submission => {
				let ids
				if(lectures.length == 0) {
					ids = this.lectures.filtered.map(a => a._id)
				} else {
					ids = lectures.map(a => a._id)
				}
				if(ids.includes(submission.lecture)) {
					submissions.push(
						new Promise((resolve,reject) => {
							resolve(submission)
						})
					)
				}
			})
			return Promise.all(submissions)
		},
		getPrettyDateTime(datetime) {
			datetime = new Date(datetime)
			if("Invalid Date" == datetime) {
				return ("Not set")
			}
			let hours = datetime.getHours()
			if(hours < 12) {
				return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours==0 ? "12" : hours) + ":" + (datetime.getMinutes()) + " AM")
			} else {
				return ((datetime.getMonth()+1) + "/" + (datetime.getDate()) + "/" + (datetime.getFullYear()) + " " + (hours-12) + ":" + (datetime.getMinutes()) + " PM")
			}
		},
		clearCharts() {
			this.charts.forEach(chart => {
				chart.destroy()
			})
			this.charts = []
		},
		handleToggleStacked(stacked) {
			this.stacked = stacked
			this.charts.forEach(chart => {
				if(chart.config.type == 'line') {
					chart.options.scales.yAxes[0].stacked = stacked
					chart.update()
				} else if(chart.config.type == 'bar') {
					chart.options.scales.xAxes[0].stacked = stacked
					chart.options.scales.yAxes[0].stacked = stacked
					chart.update()
				}
			})
		},
		handleToggleHalf(half) {
			this.half = half
			this.charts.forEach(chart => {
				if(chart.config.type == 'pie') {
					if(half) {
						chart.options.rotation = 1 * Math.PI
						chart.options.circumference = 1 * Math.PI
					} else {
						chart.options.rotation = 1.5 * Math.PI
						chart.options.circumference = 2 * Math.PI
					}
					chart.update()
				}
			})
		}
	}
}
</script>

<style scoped>
#stats-container {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.row {
	width: 100%;
	margin: 0;
	padding: 0;
}
.col {
	margin: 0;
	padding: 0;
}

#stats-left,
#stats-right {
	position: absolute;
	display: inline-block;
	height: 100%;
}
#stats-left {
	left: 0;
	width: 20rem;
}
#stats-right {
	left: 20rem;
	right: 0;
}
#stats-right-top,
#stats-right-bottom {
	position: absolute;
	width: 100%;
}
#stats-right-top {
	top: 0;
	height: 5rem;
}
#stats-right-bottom {
	top: 5rem;
	bottom: 0;
	padding: 0rem 1rem;
	padding-bottom: 1rem;
	overflow-y: auto;
}
#stats-render {
	padding: 0rem 10%;
}
canvas:only-of-type {
	margin-top: 10%;
}
canvas:not(:first-of-type) {
	margin-top: 1rem;
}
canvas:last-of-type {
	margin-bottom: 2rem;
}

.stats-panel {
	position: absolute;
	top: 1rem;
	left: 1rem;
	bottom: 1rem;
	right: 1rem;
	background: #c4c4c4;
	border-radius: 1rem;
}
#side-panel {
	right: 0;
}
#top-panel {
	text-align: left;
}

.side-panel-section {
	margin: 0rem 2rem;
	width: 15rem;
	padding: 2rem 0rem;
	border-bottom: 1px solid black;
}

#course-section {
	height: 2.5rem;
	width: 18rem;
	padding: 1rem;
}
#course-selector {
	position: relative;
	top: 0;
}

.selector-label {
	text-align: right;
}

.selector-col {
	width: 10rem;
}
</style>
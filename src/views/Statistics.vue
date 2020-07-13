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
						<MultiSelectDropdown id="lectures-selector" v-if="lectures.filtered.length > 0" :options="lectures.filtered" property="title" @update="handleLectureChange" :max="0" :n="2" ref="lecturesSelector"/>
					</div>
				</div>
			</div>
		</div>
		<div id="stats-right">
			<div id="stats-right-top">
				<div id="top-panel" class="stats-panel">
					<canvas id="myChart"></canvas>
				</div>
			</div>
			<div id="stats-right-bottom">
				<div id="stats-render"></div>
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

export default {
	name: 'Statistics',
	props: {
	},
	computed: {
	},
	components: {
		MultiSelectDropdown
	},
	data(){
		return {
			current_user: null,
			courses: {
				all: [],
				active: null
			},
			sections: {
				all: [],
				filtered: [],
				active: []
			},
			lectures: {
				all: [],
				filtered: [],
				active: []
			},
			lectureSubmissions: {
				all: [],
				filtered: [],
				active: []
			},
			colors: {
				green: {

				},
				blue: {

				},
				red: {
					
				}
			}
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
		createGraphs() {
			if(this.courses.active) {

			}
		},
		handleCourseChange(data) {
			this.courses.active = data[0]
			this.getSectionsForCourse(data[0])
			.then(sections => {
				if(undefined != this.sections.filtered && this.sections.filtered.length > 0) {
					this.$refs.sectionsSelector.repopulate(sections)
				}
				this.sections.filtered = sections
				this.execLecturesForSections(sections,false)
			})
		},
		handleSectionsChange(data) {
			this.execLecturesForSections(data,true)
		},
		handleLectureChange(data) {
			this.execLecturesForSections(data,true)
		},
		execLecturesForSections(data,needs_every) {
			this.getLecturesForSections(data,needs_every)
			.then(lectures => {
				let clean = lectures.filter(a => undefined != a)
				if(undefined != this.lectures.filtered && this.lectures.filtered.length > 0) {
					this.$refs.lecturesSelector.repopulate(clean)
				}
				this.lectures.filtered = clean

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
		async getLecturesForSections(sections,needs_every) {
			let lecturesForSections = []
			if(sections.length == 0) {
				this.lectures.all.forEach(lecture => {
					lecturesForSections.push(
						new Promise((resolve,reject) => {
							let ids = this.sections.filtered.map(a => a._id)
							if(ids.some(v => lecture.sections.includes(v))) {
								resolve(lecture)
							} else {
								resolve()
							}
						})
					)
				})
			} else {
				this.lectures.all.forEach(lecture => {
					lecturesForSections.push(
						new Promise((resolve,reject) => {
							let ids = sections.map(a => a._id)
							if(needs_every) {
								if(ids.every(v => lecture.sections.includes(v))) {
									resolve(lecture)
								} else {
									resolve()
								}
							} else if(ids.some(v => lecture.sections.includes(v))) {
								resolve(lecture)
							} else {
								resolve()
							}
						})
					)
				})
			}
			return Promise.all(lecturesForSections)
		},
		async getSubmissionsForLectures() {

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
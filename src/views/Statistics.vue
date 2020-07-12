<template>
	<div id="stats-container">
		<div id="stats-left">
			<div id="side-panel" class="stats-panel">
				<div class="row side-panel-section">
					<div class="col selector-label">
						Course:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="course-selector" v-if="course_options.length > 0" :options="course_options" @update="handleCourseChange" :max="1" ref="courseSelector"/>
					</div>
				</div>
				<div class="row side-panel-section">
					<div class="col selector-label">
						Sections:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="sections-selector" v-if="section_options.length > 0" :options="section_options" @update="handleSectionsChange" :max="4" ref="sectionsSelector"/>
					</div>
				</div>
				<div class="row side-panel-section">
					<div class="col selector-label">
						Lectures:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="lectures-selector" v-if="lecture_options.length > 0" :options="lecture_options" @update="handleLectureChange" :max="4" ref="lecturesSelector"/>
					</div>
				</div>
			</div>
		</div>
		<div id="stats-right">
			<div id="stats-right-top">
				<div id="top-panel" class="stats-panel">

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
			courses: [],
			course_options: [],
			active_course: null,
			sections: [],
			section_options: [],
			active_sections: [],
			lectures: [],
			lecture_options: [],
			active_lectures: []
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
				this.courses = res.data
				this.courses.forEach(course => {
					this.course_options.push(course.name)
					SectionAPI.getSectionsForCourse(course._id)
					.then(res2 => {
						this.sections = this.sections.concat(res2.data)
					})
				})
			})
			LectureAPI.getLecturesForUser(this.current_user._id,'none')
			.then(res => {
				this.lectures = res.data
			})
		},
		handleCourseChange(data) {
			this.courses.forEach(course => {
				if(course.name == data[0]) {
					this.active_course = course
					this.active_sections = []
					let section_options = []
					let lecture_options = []
					this.sections.forEach(section => {
						if(section.course == course._id) {
							section_options.push(new Promise((resolve,reject) => {
								resolve(section.number)
							}))
							this.lectures.forEach(lecture => {
								lecture.sections.forEach(sectID => {
									if(sectID == section._id) {
										lecture_options.push(new Promise((resolve,reject) => {
											resolve(lecture.title)
										}))
									}
								})
							})
						}
					})
					Promise.all(section_options)
					.then(resolved => {
						if(this.section_options.length > 0) {
							this.$refs.sectionsSelector.repopulate(resolved)
						}
						this.section_options = resolved
					})
					Promise.all(lecture_options)
					.then(resolved => {
						let reduced = [...(new Set(resolved))]
						if(this.lecture_options.length > 0) {
							this.$refs.lecturesSelector.repopulate(reduced)
						}
						this.lecture_options = reduced
					})
				}
			})
		},
		handleSectionsChange(data) {
			let active_sections = []
			data.forEach(sectID => {
				this.sections.forEach(section => {
					if(section.course == this.active_course._id && sectID == section.number) {
						active_sections.push(new Promise((resolve,reject) => {
							resolve(section)
						}))
					}
				})
			})
			Promise.all(active_sections)
			.then(resolved => {
				this.active_sections = resolved
				let lecture_options = []
				this.active_sections.forEach(section => {
					this.lectures.forEach(lecture => {
						lecture.sections.forEach(sectID => {
							if(sectID == section._id) {
								lecture_options.push(new Promise((resolve,reject) => {
									resolve(lecture.title)
								}))
							}
						})
					})
				})
				Promise.all(lecture_options)
				.then(resolved => {
					let reduced = [...(new Set(resolved))]
					if(this.lecture_options.length > 0) {
						this.$refs.lecturesSelector.repopulate(reduced)
					}
					this.lecture_options = reduced
				})
			})
		},
		handleLectureChange(data) {

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
	padding: 1rem;
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
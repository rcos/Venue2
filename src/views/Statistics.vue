<template>
	<div id="stats-container">
		<div id="stats-left">
			<div id="side-panel" class="stats-panel">
				<div class="row side-panel-section">
					<div class="col selector-label">
						Course:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="course-selector" v-if="course_options.length > 0" :options="course_options" @selection="handleCourseChange" :max="1"/>
					</div>
				</div>
				<div class="row side-panel-section">
					<div class="col selector-label">
						Sections:
					</div>
					<div class="col col-8 selector-col">
						<MultiSelectDropdown id="sections-selector" v-if="course_options.length > 0" :options="course_options" @selection="handleCourseChange" :max="4"/>
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
import CourseAPI from '@/services/CourseAPI.js';

import MultiSelectDropdown from '@/components/MultiSelectDropdown.vue';

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
			selected_courses: [],
			sections: [],
			lectures: [],
			students: []
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
				})
			})
		},
		handleCourseChange(data) {

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
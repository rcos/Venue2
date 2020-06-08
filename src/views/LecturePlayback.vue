<template>
	<div id="lecture_playback">
		<div v-if="unrestricted">
			<UnrestrictedPlayback :lecture="lecture"/>
		</div>
	</div>
</template>

<script>
import LectureAPI from "../services/LectureAPI";
import LectureSubmissionAPI from '../services/LectureSubmissionAPI';
import RestrictedPlayback from "../components/RestrictedPlayback";
import UnrestrictedPlayback from "../components/UnrestrictedPlayback";

export default {
	name: 'LecturePlayback',
	components: {
		RestrictedPlayback,
		UnrestrictedPlayback
	},
	data(){
		return {
			is_instructor: false,
			lecture: {},
			lecture_loaded: false,
			unrestricted: false
		}
	},
	created() {
		this.is_instructor = this.$store.state.user.current_user.is_instructor
		LectureAPI.getLecture(this.$route.params.lecture_id)
			.then(res => {
				this.lecture = res.data
				if(new Date() > new Date(this.lecture.playback_submission_end_time) || this.is_instructor) {
					this.unrestricted = true
					this.lecture_loaded = true
				} else {
					LectureSubmissionAPI.getLectureSubmissionsForStudent(this.lecture._id,this.$store.state.user.current_user._id)
						.then(res => {
							let submissions = res.data
						})
				}
			})
	},
	mounted() {
	},
	methods: {
	}
}
</script>

<style scoped>
#video_player {
	width: 100%;
	height: 100%;
}
.vjs-tech {
	position:unset;
}
.hide {
	display: none;
}
#polls {
	position: absolute;
	top: 25%;
	bottom: 25%;
	left: 25%;
	right: 25%;
	background: white;
	z-index: 999;
	padding: 20px;
}
</style>
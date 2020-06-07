<template>
	<div id="lecture_playback">
		<div v-if="lecture_loaded">
			<UnrestrictedPlayback v-if="is_instructor || unrestricted" :lecture="lecture"/>
			<RestrictedPlayback v-else :lecture="lecture"/>
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
	props: {
	},
	computed: {
	},
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
				this.lecture_loaded = true
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
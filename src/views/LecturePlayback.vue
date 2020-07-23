<template>
	<div id="lecture_playback">
		<div v-if="unrestricted && lecture_loaded">
			<UnrestrictedPlayback :lecture="lecture"/>
		</div>
		<div v-else-if="!unrestricted && !needs_decision && lecture_loaded">
			<RestrictedPlayback :lecture="lecture"/>
		</div>
		<div v-else-if="needs_decision" id="playback-opt">
			<button class="btn btn-secondary" id="opt-unrestricted" @click="handleOptIntoUnrestricted">Watch lecture without restrictions, and ignore my attendance grade</button>
			<button class="btn btn-primary" id="opt-restricted" @click="handleOptIntoRestricted">Watch lecture with restrictions, and improve my attendance grade</button>
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
			unrestricted: false,
			needs_decision: true
		}
	},
	created() {
		this.is_instructor = this.$store.state.user.current_user.is_instructor
		LectureAPI.getLecture(this.$route.params.lecture_id)
			.then(res => {
				this.lecture = res.data
				this.lecture_loaded = true
				if(new Date() > new Date(this.lecture.playback_submission_end_time) || this.is_instructor) {
					this.unrestricted = true
					this.needs_decision = false
				} else {
					LectureSubmissionAPI.getLectureSubmissionsForStudent(this.lecture._id,this.$store.state.user.current_user._id)
						.then(res => {
							let submissions = res.data
							let live = []
							let playback
							submissions.forEach(sub => {
								if(sub.is_live_submission) {
									live.push(sub)
								} else {
									playback = sub
								}
							})
							if(undefined != playback && playback.video_percent == 1) {
								this.unrestricted = true
								this.needs_decision = false
							} else if(live.length == 0) {
								this.unrestricted = false
								this.needs_decision = false
							} else if(this.lecture.checkins.length > 0 && live.length == this.lecture.checkins.length) {
								this.unrestricted = true
								this.needs_decision = false
							}
						})
				}
			})
	},
	methods: {
		handleOptIntoUnrestricted() {
			this.unrestricted = true
			this.needs_decision = false
		},
		handleOptIntoRestricted() {
			this.unrestricted = false
			this.needs_decision = false
		}
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
#playback-opt {
	position: absolute;
	top: 25%;
	height: 50%;
	left: 25%;
	right: 25%;
	padding: 1rem
}
#opt-restricted,
#opt-unrestricted {
	display: inline-block;
	height: calc(100% - 2rem);
	width: calc(50% - 2rem);
	margin-top: 1rem;
}
#opt-unrestricted {
	margin-right: 1rem;
}
</style>
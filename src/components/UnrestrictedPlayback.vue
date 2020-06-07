<template>
	<div id="restricted_playback">
		<video id="video_player" class="video-js vjs-big-play-centered" controls></video>
	</div>
</template>

<script>
import videojs from "video.js"

export default {
	name: 'RestrictedPlayback',
	props: {
		lecture: Object
	},
	data(){
		return {
		}
	},
	mounted() {
		let self = this
		videojs("video_player", {}, function() {
			this.src('http://localhost:9000' + self.lecture.video_ref)
			this.load()
		})
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
</style>
<template>
	<div id="unrestricted_playback">
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
	mounted() {
		let self = this
		videojs("video_player", {}, function() {
			this.src('http://localhost:9000' + self.lecture.video_ref)
			this.load()
		})
	},
}
</script>

<style scoped>
#unrestricted_playback {
	position: absolute;
	top: 4rem;
	bottom: 2rem;
}
#video_player {
	width: 100%;
	height: 100%;
}
.vjs-tech {
	position:unset;
}
</style>
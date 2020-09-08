<template>
	<div id="unrestricted_playback">
		<video id="video_player" class="video-js vjs-big-play-centered" controls>
			<source v-bind:src="lecture.video_ref" :type="lecture.video_type">
		</video>
	</div>
</template>

<script>
import videojs from "video.js"
require('videojs-youtube')

export default {
	name: 'RestrictedPlayback',
	props: {
		lecture: Object
	},
	data() {
		return {
			vjs: null
		}
	},
	mounted() {
		let self = this
		videojs("video_player", {}, function() {
			self.vjs = this
		})
	},
	beforeDestroy() {
		if(this.vjs) {
			this.vjs.dispose()
		}
	}
}
</script>

<style scoped>
#unrestricted_playback {
	position: fixed;
	left: 0;
	right: 0;
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
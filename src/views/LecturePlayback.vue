<template>
  <div id="lecture_playback">
    <video id="video_player" class="video-js vjs-big-play-centered" controls></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import LectureAPI from "../services/LectureAPI";
import axios from 'axios';
import fs from 'fs';

export default {
	name: 'LecturePlayback',
	props: {
	},
	computed: {
	},
	components: {
	},
	data(){
		return {
			lecture: {},
			vjs: null,
			prevTime: null
		}
	},
	created() {
	},
	mounted() {
		LectureAPI.getLecture(this.$route.params.id)
			.then(res => {
				this.lecture = res.data;
				// 'http://localhost:9000/videos/sample/sample.mp4'
				// this.setSource('http://localhost:9000/videos/sample/sample.mp4')
				let self = this
				videojs("video_player", {}, function() {
					self.vjs = this
					this.src('http://localhost:9000/videos/sample/sample.mp4')
					this.load()
					this.on('timeupdate', function () {
						if(null != self.prevTime) {
							console.log("Prev:",self.prevTime)
							console.log("Curr:",this.currentTime())
						}
						self.prevTime = this.currentTime()
					})
				})
			})
	},
	beforeDestroy() {
		this.vjs.dispose();
	},
	methods: {
		setSource(src) {
			var srcEl = document.createElement("source")
			srcEl.setAttribute("src",src)
			document.getElementById("video_player").prepend(srcEl)
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
</style>
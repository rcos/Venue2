<template>
  <div id="lecture_playback">
    <video id="video_player" class="video-js vjs-big-play-centered" controls></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import LectureAPI from "../services/LectureAPI";
import lectureSubmissionAPI from "../services/LectureSubmissionAPI";
import axios from 'axios';
import fs from 'fs';
import LectureSubmissionAPI from '../services/LectureSubmissionAPI';

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
			prevTime: 0,
			currentUser: null,
			lectureSubmission: null,
			polls: []
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

					let vid = this;

					self.currentUser = self.$store.state.user.current_user

					LectureSubmissionAPI.getOrMake(self.lecture._id,self.currentUser._id)
						.then(res => {
							self.lectureSubmission = res.data
							vid.on('timeupdate', function () {
								let currTime = vid.currentTime()
								for (let i in self.polls) {
									if (currTime >= self.polls[i].timestamp && self.lectureSubmission.student_poll_answers[i].length == 0) {
										//pause the video player
										//open the poll modal
									}
								}
								if(currTime - self.prevTime < 0.5) {
									//Considered NOT a jump, video is playing normally
									if(self.lectureSubmission.video_progress < currTime) {
										self.lectureSubmission.video_progress = currTime
									}
								} else {
									//Considered a jump forward
									if(currTime > self.lectureSubmission.video_progress) {
										vid.currentTime(self.prevTime)
									}
								}
								self.prevTime = vid.currentTime()
							})
						})
					
					//TODO handle updating the submission where needed
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
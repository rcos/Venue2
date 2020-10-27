<template>
	<div id="restricted_playback">
		<video id="video_player" class="video-js vjs-big-play-centered" controls playsinline>
			<source v-if="isProduction" v-bind:src="lecture.video_ref + (lecture.video_type=='video/youtube'?'?showinfo=0&enablejsapi=1&origin=https://www.venue-meetings.com':'')" :type="lecture.video_type">
			<source v-else v-bind:src="lecture.video_ref + (lecture.video_type=='video/youtube'?'?showinfo=0&enablejsapi=1&origin=http://localhost:8080':'')" :type="lecture.video_type">
		</video>
		<div id="polls" class="hide">
			<!--Poll Modals Start-->
			<div id="poll_contents">
				<div v-for="(poll,i) in polls" :key="i" class="poll hide" :id="'poll'+(i+1)">
					<div class="row question">
						<h2>{{poll.question}}</h2>
					</div>
					<div class="row labelrow">
						<label id="number_label">Number</label>
						<label id="answer_label">Option</label>
						<label id="correct_label">Correct</label>
					</div>
					<ol class="optionslist">
						<li v-for="(possible_answer,j) in poll.possible_answers" :key="j" class="row option">
							<p class="optionnumber" aria-labelledby="number_label">{{(j+1)}}:</p>
							<p class="optiontext" aria-labelledby="answer_label">{{possible_answer}}</p>
							<input class="optioncheck" type="checkbox" :id="'student_answer_'+(i+1)+'_'+(j+1)" aria-labelledby="correct_label"/>
						</li>
					</ol>
					<button class="answer_btn btn btn-primary" :id="'answer_btn_'+(i+1)" @click="answerPoll(i,poll)">Submit</button>
				</div>
			</div>
			<!--Poll Modals End-->
		</div>
	</div>
</template>

<script>
require('dotenv')
import videojs from "video.js";
import LectureSubmissionAPI from "../services/LectureSubmissionAPI";
import PlaybackPollAPI from "../services/PlaybackPollAPI";
require('videojs-youtube')

export default {
	name: 'RestrictedPlayback',
	props: {
		lecture: Object,
		submission: Object
	},
	computed: {
		isProduction(){ process.env.NODE_ENV === 'production' }
	},
	data(){
		return {
			vjs: null,
			prevTime: 0,
			currentUser: null,
			polls: [],
			bigbrotherinstance: null
		}
	},
	created() {
		if(!this.submission.video_progress) {
			this.submission.video_progress = 0
		}
		if(!this.submission.video_percent) {
			this.submission.video_percent = 0
		}
		if(!this.submission.student_poll_answers) {
			this.submission.student_poll_answers = {}
		}
	},
	mounted() {
		let self = this
		
		const vidOptions = {
			controlBar: {
				fullscreenToggle: false
			},
			forceSSL: true
		}

		videojs("video_player", vidOptions, function() {
			self.vjs = this

			let vid = this;

			vid.on("fullscreenchange", function(){
				if(vid.isFullscreen()){
					vid.exitFullscreen();
				}
			});

			self.currentUser = self.$store.state.user.current_user
			
			PlaybackPollAPI.getByLecture(self.lecture._id)
			.then(resp => {
				self.polls = resp.data

				// vid.on('timeupdate',
				var bigbrother = () => {
					let currTime = vid.currentTime()
					let committed = false
					if(currTime - self.prevTime < 1.5 && currTime >= self.prevTime) {
						//Considered NOT a 'seek', video is playing normally
						if(self.submission.video_progress < Math.floor(currTime)) {
							self.submission.video_progress = Math.floor(currTime)
							self.submission.video_percent = Math.floor(currTime) / self.lecture.video_length
							if(self.submission.video_progress%5 == 0) {
								self.submission.playback_submission_time = new Date()
								LectureSubmissionAPI.update(self.submission).then(res => {
									if(res.data.rewindTo) {
										vid.currentTime(res.data.rewindTo)
									}
								})
							}
						}
						for (let i = 0; i < self.polls.length; i++) {
							if (currTime > self.polls[i].timestamp) {
								//if there is not an answer for the code, and there is not an answer for the timestamp, show the poll
								if(	!((self.polls[i].code && self.submission.student_poll_answers[self.polls[i].code])
								 ||	(self.polls[i].timestamp && self.submission.student_poll_answers[self.polls[i].timestamp]))
								) {
									vid.currentTime(self.polls[i].timestamp)
									vid.pause()
									self.startPoll(i)
									committed = true
								}
							}
						}
					} else {
						//Considered a 'seek'
						if(currTime > self.submission.video_progress) {
							vid.currentTime(self.prevTime)
							committed = true
						} else if(currTime < self.prevTime) {
							for (let i = 0; i < self.polls.length; i++) {
								self.hidePoll(i)
							}
						}
					}
					if(!committed) {
						self.prevTime = vid.currentTime()
					}
				}
				this.bigbrotherinstance = setInterval(function() {bigbrother()},1000)
				vid.on('ended', function() {
					self.submission.video_progress = self.lecture.video_length
					self.submission.video_percent = 1
					self.submission.playback_submission_time = new Date()
					LectureSubmissionAPI.update(self.submission)
				});
			})
		})
	},
	beforeDestroy() {
		if(this.vjs) {
			this.vjs.dispose()
		}
		if(this.bigbrotherinstance) {
			clearInterval(this.bigbrotherinstance)
		}
	},
	methods: {
		startPoll(i) {
			let modal = document.getElementById("polls")
			modal.classList.remove("hide")
			let poll = document.getElementById("poll"+(i+1))
			poll.classList.remove("hide")
		},
		hidePoll(i) {
			let modal = document.getElementById("polls")
			modal.classList.add("hide")
			let poll = document.getElementById("poll"+(i+1))
			poll.classList.add("hide")
		},
		answerPoll(i,poll) {
			let student_answers = []
			for(let j=0;j<this.polls[i].possible_answers.length;j++) {
				if(document.getElementById('student_answer_'+(i+1)+'_'+(j+1)).checked) {
					student_answers.push(this.polls[i].possible_answers[j])
				}
			}
			this.submission.student_poll_answers[poll.timestamp] = student_answers
			this.submission.playback_submission_time = new Date()
			LectureSubmissionAPI.update(this.submission)
			
			this.hidePoll(i)
			this.vjs.play()
		}
	}
}
</script>

<style scoped>
#restricted_playback {
	position: absolute;
	top: 0rem;
	left: 0rem;
	right: 0rem;
	bottom: 0rem;
	padding: 0rem 2rem;
}
#video_player {
	width: 100%;
	height: 100%;
}
.vjs-tech {
	position:unset;
}
#polls {
	position: absolute;
	/* display: inline-block; */
	top: 1rem;
	height: calc(100vh - 10rem);
	min-width: 25rem;
	width: 50%;
	left: -2rem;
	background: var(--poll-background);
	border-radius: 1.25rem;
	z-index: 999;
}
#poll_contents {
	position: relative;
	background: var(--main-background-color);
	border-radius: 1rem;
	height: 100%;
	padding: 1rem;
	padding-left: 2rem;
	margin: 0.5rem;
	margin-bottom: -1rem;
	overflow-y: auto;
}
.poll {
	margin: 1rem;
}
.row {
	margin: 0;
	text-align: center;
}
h2 {
	width: 100%;
	margin-top: 1rem;
}
.question {
	margin-bottom: 2rem;
}
.option {
	margin-bottom: 1rem;
}
.labelrow {
	margin-bottom: 1rem;
	border-bottom: 1px solid var(--main-text-color);
}
#number_label {
	width: 10%;
}
.optionnumber {
	margin: 0;
	width: 10%;
}
#answer_label {
	width: 80%;
}
.optiontext {
	margin: 0;
	width: 80%;
}
#correct_label {
	width: 10%;
}
.optioncheck {
	margin: 0;
	width: 10%;
}
.answer_btn {
	margin: 1rem 0;
}
.optionslist {
	margin: 0;
	padding: 0;
}
.hide {
	display: none;
}
</style>
<template>
	<div id="restricted_playback">
		<video id="video_player" class="video-js vjs-big-play-centered" controls></video>
		<div id="polls" class="hide">
			<!--Poll Modals Start-->
			<div id="poll_contents">
				<div v-for="(poll,i) in polls" :key="i" class="poll hide" :id="'poll'+(i+1)">
					<div class="row question">
						<h2>{{poll.question}}</h2>
					</div>
					<div class="row">
						<h6 id="number_label">Number</h6>
						<h6 id="answer_label">Option</h6>
						<h6 id="correct_label">Correct</h6>
					</div>
					<div v-for="(possible_answer,j) in poll.possible_answers" :key="j" class="row option">
						<p class="optionnumber">{{(j+1)}}:</p>
						<p class="optiontext">{{possible_answer}}</p>
						<input class="optioncheck" type="checkbox" :id="'student_answer_'+(i+1)+'_'+(j+1)"/>
					</div>
					<button class="answer_btn btn btn-primary" :id="'answer_btn_'+(i+1)" @click="answerPoll(i)">Submit</button>
				</div>
			</div>
			<!--Poll Modals End-->
		</div>
	</div>
</template>

<script>
import videojs from "video.js";
import LectureSubmissionAPI from "../services/LectureSubmissionAPI";
import PlaybackPollAPI from "../services/PlaybackPollAPI";

export default {
	name: 'RestrictedPlayback',
	props: {
		lecture: Object
	},
	data(){
		return {
			vjs: null,
			prevTime: 0,
			currentUser: null,
			lectureSubmission: null,
			polls: []
		}
	},
	mounted() {
		let self = this
		videojs("video_player", {}, function() {
			self.vjs = this
			this.src('http://localhost:9000' + self.lecture.video_ref)
			this.load()

			let vid = this;

			self.currentUser = self.$store.state.user.current_user
			if(!self.currentUser.is_instructor) {
				LectureSubmissionAPI.getOrMake(self.lecture._id,self.currentUser._id)
					.then(res => {
						self.lectureSubmission = res.data
						PlaybackPollAPI.getByLecture(self.lecture._id)
							.then(resp => {
								self.polls = resp.data
								vid.on('timeupdate', function () {
									let currTime = vid.currentTime()
									if(currTime - self.prevTime < 0.5 && currTime >= self.prevTime) {
										//Considered NOT a 'seek', video is playing normally
										if(self.lectureSubmission.video_progress < Math.floor(currTime)) {
											self.lectureSubmission.video_progress = Math.floor(currTime)
											self.lectureSubmission.video_percent = currTime / vid.duration()
											if(self.lectureSubmission.video_progress%5 == 0) {
												LectureSubmissionAPI.update(self.lectureSubmission)
											}
										}
										for (let i = 0; i < self.polls.length; i++) {
											if (currTime > self.polls[i].timestamp) {
												if(undefined == self.lectureSubmission.student_poll_answers[i] || self.lectureSubmission.student_poll_answers[i].length == 0) {
													//THERE IS NO ANSWER FROM THE STUDENT YET
													vid.currentTime(self.polls[i].timestamp)
													vid.pause()
													self.startPoll(i)
												}
											}
										}
									} else {
										//Considered a 'seek'
										if(currTime > self.lectureSubmission.video_progress) {
											vid.currentTime(self.prevTime)
										} else if(currTime < self.prevTime) {
											for (let i = 0; i < self.polls.length; i++) {
												self.hidePoll(i)
											}
										}
									}
									self.prevTime = vid.currentTime()
								})
								vid.on('ended', function() {
									self.lectureSubmission.video_progress = vid.duration()
									self.lectureSubmission.video_percent = 1
									LectureSubmissionAPI.update(self.lectureSubmission)
								});
							})
					})
			}
		})
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
		answerPoll(i) {
			let student_answers = []
			for(let j=0;j<this.polls[i].possible_answers.length;j++) {
				student_answers.push(document.getElementById('student_answer_'+(i+1)+'_'+(j+1)).checked)
			}
			if(undefined == this.lectureSubmission.student_poll_answers[i]) {
				this.lectureSubmission.student_poll_answers.push(student_answers)
			} else {
				this.lectureSubmission.student_poll_answers[i] = student_answers
			}

			LectureSubmissionAPI.update(this.lectureSubmission)

			this.hidePoll(i)
		}
	}
}
</script>

<style scoped>
#restricted_playback {
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
#polls {
	position: absolute;
	top: 25%;
	left: 25%;
	right: 25%;
	background: lightskyblue;
	border-radius: 1rem;
	z-index: 999;
}
#poll_contents {
	position: relative;
	background: white;
	border-radius: 1rem;
	padding: 1rem;
	margin: 1rem;
	margin-bottom: -1rem;
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
#number_label {
	width: 10%;
}
.optionnumber {
	margin: 0;
	width: 10%;
}
#option_label {
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
.hide {
	display: none;
}
</style>
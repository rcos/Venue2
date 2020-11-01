<template>
	<div id="add-poll-container">
		<h2>Edit Poll</h2>
		<div class="poll_card">
			<div class="row questionrow">
				<label id="question_label">Question</label>
				<textarea id="question" class="col" type="text" placeholder="eg. Which of the following...?" aria-labelledby="question_label" v-model.lazy="question"/>
			</div>
			<div class="row timestamprow" v-if="playback_only">
				<div class="col-4">
				<!-- <label for="hour">Hour:</label> -->
					<label id="hour_label">Hour</label>
					<input type="number" id="hour" min="0" max="5" aria-labelledby="hour_label"/>
				</div>
				<div class="col-4">
				<!-- <label for="min">Minute:</label> -->
					<label id="minute_label">Min</label>
					<input type="number" id="min" min="0" max="59" aria-labelledby="minute_label"/>
				</div>
				<div class="col-4">
				<!-- <label for="sec">Second:</label> -->
					<label id="seconds_label">Sec</label>
					<input type="number" id="sec" min="0" max="59" aria-labelledby="seconds_label"/>
				</div>
			</div>
			<h4>Possible Answers</h4>
			<div class="row">
				<label id="spacer1">Number</label>
				<label id="a_label">Answer</label>
				<label id="correct_label">Correct</label>
			</div>
			<ol class="row possible_answer">
				<li v-for="(current_answer,i) in possible_answers" v-bind:key="i">
				<!-- <p class="answernumber">{{i + 1}}</p> -->
				<input class="answerfield" type="text" v-model.lazy="possible_answers[i]" aria-labelledby="a_label"/>
				<input class="iscorrectfield" type="checkbox" v-model.lazy="current_is_correct[i]" aria-labelledby="correct_label"/>
				<button type="button" class="btn btn-danger removeanswer" @click="possible_answers.splice(i,1);current_is_correct.splice(i,1)" :aria-label="'Remove Answer '+(i+1)">X</button>
				</li>
			</ol>
			<div class="row addanswerrow">
				<button type="button" id="add_answer_btn" class="btn btn-secondary" @click="possible_answers.push('');current_is_correct.push(false)">Add Option</button>
			</div>
			<div class="row">
				<button type="button" id="cancel_add_poll_btn" class="btn btn-secondary" @click="cancel">Cancel</button>
				<button type="button" id="add_poll_btn" class="btn btn-primary" @click="addPoll">Save Poll</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CreatePoll",
	props: {
		playback_only: Boolean,
		checkin: Number,
		poll: Object
	},
  components: {
	},
  data() {
    return {
			question: "",
			possible_answers: [],
      current_is_correct: []
		};
  },
  created() {
		if(this.poll) {
			this.question = this.poll.question
			this.possible_answers = this.poll.possible_answers
			this.possible_answers.forEach(possible => {
				if(this.poll.correct_answers.includes(possible)) {
					this.current_is_correct.push(true)
				} else {
					this.current_is_correct.push(false)
				}
			})
		}
		this.$forceUpdate()
	},
  methods: {
		addPoll() {
			let correct_answers = []
			this.possible_answers.forEach((answer,i) => {
				if(this.current_is_correct[i]) {
					correct_answers.push(answer)
				}
			});
			let self = this
			if(this.playback_only) {
				this.$emit('addPoll',{})
			} else {
				this.$emit('addPoll',{
					_id: (self.poll?self.poll._id:null),
					question: self.question,
					possible_answers: self.possible_answers,
					correct_answers: correct_answers,
					checkin: self.checkin
				})
			}
			this.question = ""
			this.possible_answers = []
			this.current_is_correct = []
		},
		cancel() {
			this.$emit('cancel')
		}
	}
}
</script>

<style scoped>
#add-poll-container {
	text-align: center;
	position: relative;
	width: 100%;
	margin-bottom: 1rem;
}
textarea {
	border-radius: 0.25rem;
	border: 1px solid var(--modal-border);
}
.row {
	margin: 0;
	width: 100%;
}
.col {
	color: var(--input-text) !important;
	background: var(--input-background) !important;
	outline: none;
}
h2 {
  text-align: center;
}
li {
  width: 100%;
}
#pq_label {
  width: 100%;
  text-align: center;
}
.possible_answer {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  margin: 0;
}
#spacer1 {
  width: 15%;
}
.answernumber {
  width: 15%;
  text-align: center;
}
#a_label {
  width: 65%;
  text-align: center;
}
.answerfield {
  position: relative;
  width: calc(80% - 3rem);
	margin-left: 3rem;
  height: 1rem;
  font-size: 1rem;
}
#correct_label {
  width: 10%;
}
.iscorrectfield {
  /* margin-left: 2rem; */
  margin-top: 0.5rem;
  width: 10%;
  height: 1rem;
}
.removeanswer {
  width: 10%;
  padding: 0;
}
#add_answer_btn {
  position: absolute;
  left: 0;
  width: 100%;
  margin: 0;
}
#add_poll_btn {
  position: absolute;
  right: 0;
  margin: 0;
}
#spacer1 {
	text-align: left;
}
.addanswerrow {
  height: 2.5rem;
  margin-bottom: 1rem;
}
#question,
#hour,
#min,
#sec {
  font-size: 1rem;
}

#question {
  height: 3rem;
  resize: none;
}

h4 {
  padding-top: 1rem;
	text-align: center;
}

p {
  position: relative;
  margin: 0;
  height: 1rem;
  font-size: 1rem;
  top: 0.45rem;
}
</style>
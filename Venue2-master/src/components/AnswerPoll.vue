<template>
	<div id="answer-poll-modal">
		<div id="answer-poll-contents">
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
					<input class="optioncheck" type="checkbox" v-model.lazy="current_is_correct[j]" aria-labelledby="correct_label" @change="handleChange"/>
				</li>
			</ol>
			<button class="cancel_btn btn btn-secondary float-left" type="button" @click="cancel">Cancel</button>
			<button class="answer_btn btn btn-primary float-right" type="button" id="answer_poll_btn" @click="answer">Submit</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "AnswerPoll",
	props: {
		poll: Object
	},
  components: {
	},
  data() {
    return {
      current_is_correct: []
		};
  },
  created() {
		this.poll.possible_answers.forEach(possible => {
			this.current_is_correct.push(false)
		});
	},
  methods: {
		answer() {
			let student_answers = []
			this.current_is_correct.forEach((is_marked,i) => {
				if(is_marked) {
					student_answers.push(this.poll.possible_answers[i])
				} 
			})
			this.$emit('answer',student_answers,this.poll.code)
		},
		cancel() {
			this.$emit('cancel')
		},
		handleChange() {
			console.log(this.current_is_correct)
		}
	}
}
</script>

<style scoped>
#answer-poll-modal {
	z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
	padding: 1rem;
  background: var(--modal-container-background);
	text-align: center;
}
#answer-poll-contents {
  position: relative;
  top: 25%;
  bottom: 25%;
	max-width: 50rem;
	margin: 0rem auto;
  background: var(--modal-background);
  border: 1px solid var(--modal-border);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow: auto;
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
	border-bottom: 1px solid var(--modal-border);
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
.optionslist {
	margin: 0;
	padding: 0;
}
</style>
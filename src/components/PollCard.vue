<template>
	<div class="poll_card">
		<div class="row questionrow">
			<p class="questionlabel col-3">Question:</p> <input class="question col" type="text" v-model.lazy="question"/>
		</div>
		<div v-for="(possible_answer,i) in possible_answers" v-bind:key="i" class="row">
			<div class="col-1 answerpart">
				{{i + 1}}
			</div>
			<div class="col answerpart">
				<input class="answerfield" type="text" v-model.lazy="possible_answers[i]"/>
			</div>
			<div class="col-1 answerpart">
				<input type="checkbox" v-model.lazy="correct_answers[i]"/>
			</div>
		</div>
		<button id="add_answer_btn" class="btn" @click="addAnswer">+</button>
	</div>
</template>

<script>
import PlaybackPollAPI from "../services/PlaybackPollAPI";

export default {
	name: "PollCard",
	props: {},
	computed: {},
	components: {},
	data() {
		return {
			question: "",
			is_mult_coice: true,
			possible_answers: [],
			correct_answers: [],
			timestamp: 0,
			lecture: null
		}
	},
	created() {
	},
	mounted() {	
	},
	methods: {
		addAnswer(evt) {
      evt.preventDefault();
			this.possible_answers.push('')
			this.correct_answers.push(false)
		},
		savePoll(lecture_id) {
			this.lecture = lecture_id;
			PlaybackPollAPI.addPoll(this.$data);
		}
	}
}
</script>

<style scoped>
.poll_card {
	margin-bottom: 15px;
	background: white;
	border: 2px solid black;
	padding: 10px;
	width: 100%;
}
.answer {
	margin-left: 15px;
}
.answerfield {
	margin-left: 10px;
	width: 100%;
}
#add_answer_btn {
	margin-top: 10px;
	width: 100%;
}
#add_answer_btn:hover {
	border: 1px solid black;
}
.answerpart {
	margin-left: 5px;
	margin-right: 5px;
	padding: 0;
}
.questionrow {
	padding-left: 15px;
}
.questionlabel {
	margin: 0;
}
.question {
	position: relative;
	width: 50%;
	margin-left: 15px;
	margin-right: 15px;
}
.row {
	margin-top: 5px;
	margin-bottom: 5px;
}
</style>
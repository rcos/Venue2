<template>
	<div class="poll_card">
		<div class="row questionrow">
			Question: <input class="question" type="text"/>
		</div>
		<div v-for="(possible_answer, i) in possible_answers" v-bind:key="i" class="row">
			<div class="col-1 answerpart">
				{{i + 1}}
			</div>
			<div class="col answerpart">
				<input class="answerfield" type="text"/>
			</div>
			<div class="col-1 answerpart">
				<input type="checkbox"/>
			</div>
		</div>
		<button id="add_answer_btn" class="btn" @click="possible_answers.push('')">+</button>
	</div>
</template>

<script>
export default {
	name: "PollCard",
	props: ["timestamp"],
	computed: {},
	components: {},
	data() {
		return {
			question: "",
			is_mult_coice: true,
			possible_answers: [],
			is_correct: []
		};
	},
	created() {
		this.timestamp = this.$props.timestamp
	},
	mounted() {},
	methods: {}
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
.question {
	margin-left: 15px;
}
.row {
	margin-top: 5px;
	margin-bottom: 5px;
}
</style>
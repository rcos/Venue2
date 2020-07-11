<template>
	<div id="stats-container">
		<div id="stats-left">
			<div id="side-panel" class="stats-panel">

			</div>
		</div>
		<div id="stats-right">
			<div id="stats-right-top">
				<div id="top-panel" class="stats-panel">

				</div>
			</div>
			<div id="stats-right-bottom">
				<div id="stats-render"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Statistics',
	props: {
	},
	computed: {
	},
	components: {
	},
	data(){
		return {
		}
	},
	created() {
	},
	methods: {
	}
}
</script>

<style scoped>
#stats-container {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

#stats-left,
#stats-right {
	position: absolute;
	display: inline-block;
	height: 100%;
}
#stats-left {
	left: 0;
	width: 20rem;
}
#stats-right {
	left: 20rem;
	right: 0;
}
#stats-right-top,
#stats-right-bottom {
	position: absolute;
	width: 100%;
}
#stats-right-top {
	top: 0;
	height: 5rem;
}
#stats-right-bottom {
	top: 5rem;
	bottom: 0;
}

.stats-panel {
	position: absolute;
	top: 1rem;
	left: 1rem;
	bottom: 1rem;
	right: 1rem;
	background: #868686;
	border-radius: 1rem;
}
#side-panel {
	right: 0;
}
</style>
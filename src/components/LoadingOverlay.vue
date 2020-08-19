<template>
  	<div class="loading-overlay-background row my-auto">
    	<SquareLoader/>
  	</div>
</template>

<script>
import SquareLoader from '@/components/Loaders/SquareLoader.vue'

export default {
	name: 'LoadingOverlay',
	components: {
		SquareLoader
	},
	props: {
		mobileMode: Boolean,
		live_lectures: Array,
		colorCallback: Function,
		loaded: Boolean
	},
	data () {
		return {}
	},
	created () {
	},
	methods: {
	}
}
</script>

<style scoped>
.loading-overlay-background {
	background: rgba(255,255,255,0.9);
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100000000;
	padding: auto;
	justify-content: center;
	align-items: center;
}
</style>
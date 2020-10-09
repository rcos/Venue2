<template>
    <footer class="footer">
    	Venue | 
    	<a href="https://github.com/rcos/Venue2" target="_blank" aria-label="Github Repository">
    		<img class="github-mark" src="../assets/github_mark.png" aria-label="Github Icon" alt="Github Icon"/>
    	</a>
    	| An RCOS project | Icons by <a target="_blank" href="https://icons8.com">Icons8</a>
    </footer>
</template>

<script>
import PaletteAPI from '../services/PaletteAPI';

export default {
	
created() {
	this.setPalette()
},
  name: "Footer",
  methods: {
	  setPalette() {
	  	this.current_user = this.$store.state.user.current_user
	  	let root = document.documentElement;
		PaletteAPI.setPalette(root, this.current_user.dark_mode)
	  }
    }
};
</script>

<style>

:root {
	--main-background-color: #ffffff;
	--main-text-color: #1d2324;

	--widgets-color: #1d2324;
} 

.footer {
	position: relative;	
	width: 100%;
	/* border-top: #e0e0e0 solid thin; */
	/* border-bottom: #e0e0e0 solid thin; */
	/* background: var(--background-color, white);
	color: var(--text-color, #1d2324); */
	font-size: 1rem;
	/* padding-top: 0.2rem; */
	margin: auto;
	text-align: center;
	padding: 5px;
}

.github-mark {
	width: 1rem;
	cursor: pointer;
	filter: var(--widgets-color);
}
</style>

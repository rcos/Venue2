<template>
    <footer class="footer">
    	Venue | 
    	<a href="https://github.com/rcos/Venue2" target="_blank" aria-label="Github Repository">
    		<img class="icon github-icon" src="../assets/github_mark.png" aria-label="Github Icon" alt="Github Icon"/>
    	</a> |
		<a href="https://blacklivesmatter.com/" target="_blank" aria-label="Black Lives Matter">
    		<img class="icon" src="../assets/venue-black-lives-matter.svg" aria-label="BLM Icon" alt="BLM Icon"/>
    	</a> |
		<a href="https://girlswhocode.com/" target="_blank" aria-label="Girls Who Code">
			<img class="icon girls-who-code-icon" src="../assets/Girls_who_code_logo.svg" aria-label="Girls Who Code Icon" alt="Girls Who Code Icon"/>
	</a> |
		An RCOS project
    </footer>
</template>

<script>
import PaletteAPI from '../services/PaletteAPI';

export default {
	
created() {
	if(this.$store.state.user) {
		this.setPalette()
	}
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
	padding: 0.25rem;
}

.icon {
	filter: var(--widgets-color); 
	width: 1.5rem;
	cursor: pointer;
}

.github-mark {
	width: 1rem;
	cursor: pointer;
	filter: var(--widgets-color);
}

.github-icon {
	width: 1.25rem;
}

.girls-who-code-icon {
	width: 3rem;
}
</style>

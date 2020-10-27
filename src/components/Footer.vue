<template>
    <footer class="footer">
    	Venue | 
    	<a href="https://github.com/rcos/Venue2" target="_blank" aria-label="Github Repository">
    		<img class="icon github-icon" src="../assets/github_mark.png" aria-label="Github Icon" alt="Github Icon"/>
    	</a> |
		<a href="https://blacklivesmatter.com/" target="_blank" aria-label="Black Lives Matter">
    		<img class="icon" src="../assets/black_lives_matter.svg" aria-label="BLM Icon" alt="BLM Icon"/>
    	</a> |
		An RCOS project | Icons by <a target="_blank" href="https://icons8.com">Icons8</a> and <a target="_blank" href="https://www.flaticon.com/authors/freepik">Freepik</a>
		<ghost @click="boo()">
			<img class="icon" src="../assets/hw/icons8-ghost-48.png" alt="ooooooo"/>
		</ghost>
    </footer>
</template>

<script>
import PaletteAPI from '../services/PaletteAPI';
import ghost from '@/assets/hw/hw.css'

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
	  },
	  boo() {
		  alert('boo')
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
</style>

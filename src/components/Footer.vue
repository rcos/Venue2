<template>
    <footer class="footer">
    	Venue | 
    	<a href="https://github.com/rcos/Venue2" target="_blank" aria-label="Github Repository">
    		<img class="icon github-icon" src="../assets/github_mark.png" aria-label="Github Icon" alt="Github Icon"/>
    	</a> |
		<a href="https://blacklivesmatter.com/" target="_blank" aria-label="Black Lives Matter">
    		<img class="icon" src="../assets/black_lives_matter.svg" aria-label="BLM Icon" alt="BLM Icon"/>
    	</a> |
    	An RCOS project | Icons by <a target="_blank" href="https://icons8.com">Icons8</a>
    </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
	position: relative;
	bottom: 0;	
	width: 100%;
	height: 2rem;
	/* border-top: #e0e0e0 solid thin; */
	/* border-bottom: #e0e0e0 solid thin; */
	background: white;
	font-size: 1rem;
	padding-top: 0.2rem;
	text-align: center;
}

.icon {
	width: 1.5rem;
	cursor: pointer;
}

.github-icon {
	width: 1.25rem;
}
</style>

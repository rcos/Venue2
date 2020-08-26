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
	border-top: #e0e0e0 solid thin;
	border-bottom: #e0e0e0 solid thin;
	background: white;
	font-size: 1rem;
	padding-top: 0.2rem;
	text-align: center;
}

.github-mark {
	width: 1rem;
	cursor: pointer;
}
</style>

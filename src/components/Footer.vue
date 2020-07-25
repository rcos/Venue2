<template>
    <footer class="footer">
    	© 2020 Venue v2.0 | 
    	<a href="https://github.com/rcos/Venue2" target="_blank" aria-label="Github Repository">
    		<img class="github-mark" src="../assets/github_mark.png" aria-label="Github Icon" alt="Github Icon"/>
    	</a>
    	| An RCOS project
    </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
	/*position: absolute;*/
	bottom: 0;
	width: 100%;
	height: 2rem;
	border-top: #e0e0e0 solid thin;
}

.github-mark {
	width: 1rem;
	cursor: pointer;
}
</style>

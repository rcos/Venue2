<<template>
  <div class="course-card">
  	<div class="color-box"></div>
  </div>
</template>

<script>

  export default {
    name: 'CourseCard',
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
.course-card {
	border: black solid;
	display: inline-block;
	margin-left: 2rem;
	width: 10rem;
	height: 3rem;
}

.color-box {
	background-color: #B77DC2;
	border-radius: 3px;
	width: 1.5rem;
	height: 1.5rem;
	margin-top: 0.5rem;
	margin-left: 0.5rem;
}
</style>
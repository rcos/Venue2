<<template>
  <div class="course-card">
  	<div class="color-box"></div>
    <div class="course-info">
      <div class="course-title">CSCI 1200</div>
      <div class="course-name">Data Structures</div>
    </div>
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
	display: inline-block;
	margin-left: 2rem;
  margin-top: 1rem;
	width: 16rem;
	height: 3rem;
  padding-top: 0.7rem;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.07);
  border-radius: 3px;
  cursor: pointer;
  transition: background-color, box-shadow, width, 0.25s;
}

.course-card:hover {
  background-color: #e8e8e8;
  box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.3);
}


.color-box {
	background-color: #B77DC2;
	border-radius: 3px;
	width: 1.5rem;
	height: 1.5rem;
	/*margin-top: 0.5rem;*/
	margin-left: 0.5rem;
  display: inline-block;
  vertical-align: top;
}

.course-info {
  /*border: blue solid;*/
  display: inline-block;
  width: 80%;
  height: 1.5rem;
  margin-left: 0.5rem;
}

.course-title {
  display: inline-block;
  font-size: 0.7rem;
  vertical-align: middle;
  /*color: #1591C5;*/
  color: #1591C5;

  /*font-weight: bold;*/
}

.course-name {
  /*border: yellow solid;*/
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.85rem;
}

/*Desktop*/
@media (min-width: 1200px) {
  .course-card:hover {
    width: 17rem;
  }
}

/*Medium devices (tablets and below)*/
@media (max-width: 1128px) {
  .course-card {
    width: 20rem;
    margin-top: 2.5rem;
  }
}

/*Small devices (phones and below)*/
@media (max-width: 575.98px) {
  .course-card {
    margin: auto;
    margin-top: 2.5rem;
  }
}
</style>
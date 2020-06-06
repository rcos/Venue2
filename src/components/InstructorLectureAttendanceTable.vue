<template>
	<div>
    <div class="tabs">
      <button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)"><h5>Live ({{Object.keys(live_submissions).length}}/{{all_students.length}})</h5></button>
      <button id="playback_btn" class="tab_btn" @click="selectTab(1)"><h5>Playback ({{playback_submissions.length}}/{{all_students.length}})</h5></button>
      <button id="absent_btn" class="tab_btn" @click="selectTab(2)"><h5>Absent ({{absent.length}}/{{all_students.length}})</h5></button>
      <button id="stats_btn" class="tab_btn" @click="selectTab(3)"><h5>Statistics</h5></button>
    </div>
    <div v-if="selected_tab == 0" id="live_submit" class="tab_section">
      <div v-if="Object.keys(live_submissions).length > 0">
        <div class="namecard-edging live-color" v-for="(submission,i) in Object.keys(live_submissions)" :key="i">
          <div class="namecard">
            {{live_submissions[submission][0].submitter.first_name}} {{live_submissions[submission][0].submitter.last_name}}
            {{live_submissions[submission][0].submitter.email}}
            {{live_submissions[submission].length / lecture.checkins.length * 100}}%
          </div>
        </div>
      </div>
      <div v-else>
        None
      </div>
    </div>
    <div v-if="selected_tab == 1" id="playback_submit" class="tab_section">
      <div v-if="playback_submissions.length > 0">
        <div class="namecard-edging playback-color" v-for="(submission,i) in playback_submissions" :key="i">
          <div class="namecard">
            {{submission.submitter.first_name}} {{submission.submitter.last_name}}
            {{submission.submitter.email}}
          </div>
        </div>
      </div>
      <div v-else>
        None
      </div>
    </div>
    <div v-if="selected_tab == 2" id="no_submit" class="tab_section">
      <div v-if="absent.length > 0">
        <div class="namecard-edging absent-color" v-for="(absentee,i) in absent" :key="i">
          <div class="namecard">
            {{absentee.first_name}} {{absentee.last_name}}
            {{absentee.email}}
          </div>
        </div>
      </div>
      <div v-else>
        None
      </div>
    </div>
    <div v-if="selected_tab == 3" id="stats" class="tab_section">
      Statistics
    </div>
		</div>
	</div>
</template>


<script>

  export default {
    name: 'InstructorLectureAttendanceTable',
    props: {
    	live_submissions: Array,
    	playback_submissions: Array,
    	absent: Array,
    	all_students: Array
    },
    components: {
    },
    data(){
      return {
        selected_tab: 0
      }
    },
    created() {

    },
    methods: {
    	selectTab(i) {
    	  let btns = [
    	    document.getElementById("live_btn"),
    	    document.getElementById("playback_btn"),
    	    document.getElementById("absent_btn"),
    	    document.getElementById("stats_btn")
    	  ]
    	  for(let j=0;j<btns.length;j++) {
    	    if(j==i) {
    	      btns[j].classList.add("selected_tab")
    	    } else {
    	      btns[j].classList.remove("selected_tab")
    	    }
    	  }
    	  this.selected_tab = i
    	}
    }
  }
</script>

<style scoped>
	.tabs {
	  margin-top: 5rem;
	  margin-left: 3rem;
	}

	.tab_btn {
	  background: none;
	  outline: none;
	  border: none;
	  color: gray;
	  margin-right: 3rem;
	}

	.tab_btn h5 {
	  color: gray;
	}

	.tab_btn.selected_tab {
	  color: blue;
	  border-bottom: .2rem solid blue;
	}

	.tab_btn.selected_tab h5 {
	  color: blue;
	}

	.tab_section {
	  margin-top: 3rem;
	  margin-left: 6rem;
	  overflow-y: auto;
	  height: 17rem;
	  padding-bottom: 3rem;
	}

	.namecard-edging {
	  display: inline-block;
	  border-radius: .25rem;
	  width: 12rem;
	  height: 4rem;
	  margin-right: 1rem;
	  margin-bottom: 1rem;
	}

	.namecard-edging.live-color {
	  background: green;
	}

	.namecard-edging.playback-color {
	  background: blueviolet;
	}

	.namecard-edging.absent-color {
	  background: red;
	}

	.namecard {
	  position: relative;
	  background: white;
	  text-align: center;
	  border-radius: .25rem;
	  top: 0.5rem;
	  margin-left: 0.5rem;
	  width: 11rem;
	  height: 4rem;
	  box-shadow: 0 5px 10px -1px gray;
	  padding-top: 0.5rem;
	  z-index: 100;
	}

	.hidden {
	  display: none;
	}

</style>
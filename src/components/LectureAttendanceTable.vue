<template>
	<div id="lecture-attendance-table">
		<div class="tabs" v-if="all_students">
			<button id="live_btn" class="tab_btn selected_tab" tabindex="0" @click="selectTab(0)" aria-label="Show Live Attendance"
				role="tab" aria-selected="true" aria-controls="live_submit"><h5>Live ({{Object.keys(live_submissions).length}}/{{all_students.length}})</h5></button>
			<button id="playback_btn" class="tab_btn" tabindex="0" @click="selectTab(1)" aria-label="Show Playback Attendance"
				role="tab" aria-selected="false" aria-controls="playback_submit"><h5>Playback ({{playback_submissions.length}}/{{all_students.length}})</h5></button>
			<button id="absent_btn" class="tab_btn" tabindex="0" @click="selectTab(2)" aria-label="Show Absent"
				role="tab" aria-selected="false" aria-controls="no_submit"><h5>Absent ({{absent.length}}/{{all_students.length}})</h5></button>
			<button id="stats_btn" class="tab_btn" tabindex="0" @click="selectTab(3)" aria-label="Show Statistics"
				role="tab" aria-selected="false" aria-controls="stats"><h5>Statistics</h5></button>
		</div>
		<div class="tabs" v-else>
			<button id="live_btn" class="tab_btn selected_tab" @click="selectTab(0)" tabindex="0" aria-label="Show Live Attendance"
				role="tab" aria-selected="true" aria-controls="live_submit"><h5>Live</h5></button>
			<button id="playback_btn" class="tab_btn" @click="selectTab(1)" tabindex="0" aria-label="Show Playback Attendance"
				role="tab" aria-selected="false" aria-controls="playback_submit"><h5>Playback</h5></button>
			<button id="absent_btn" class="tab_btn" @click="selectTab(2)" tabindex="0" aria-label="Show Absent"
				role="tab" aria-selected="false" aria-controls="no_submit"><h5>Absent</h5></button>
			<button id="stats_btn" class="tab_btn" @click="selectTab(3)" tabindex="0" aria-label="Show Statistics"
				role="tab" aria-selected="false" aria-controls="stats"><h5>Statistics</h5></button>
		</div>
		<div v-if="selected_tab === 0" role="tabpanel" aria-labelledby="live_btn" id="live_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :live_submissions="live_submissions" :is_live="true" />
		</div>
		<div v-if="selected_tab === 1" role="tabpanel" aria-labelledby="playback_btn" id="playback_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions="playback_submissions" :is_playback="true" />
		</div>
		<div v-if="selected_tab === 2" role="tabpanel" aria-labelledby="absent_btn" id="no_submit" class="tab_section">
			<LectureAttendanceList :is_instructor="is_instructor" :lecture="lecture" :submissions="absent" :is_absent="true" />
		</div>
		<div v-if="selected_tab === 3" role="tabpanel" aria-labelledby="stats_btn" id="stats" class="tab_section">
			Statistics
		</div>
	</div>
</template>


<script>
  import LectureAttendanceList from '@/components/LectureAttendanceList.vue'

  export default {
    name: 'LectureAttendanceTable',
    props: {
      lecture: Object,
    	live_submissions: Object,
    	playback_submissions: Array,
    	absent: Array,
    	all_students: Array,
      is_instructor: Boolean
    },
    components: {
      LectureAttendanceList
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
		  let panels = [
			document.getElementById("live_submit"),
    	    document.getElementById("playback_submit"),
    	    document.getElementById("no_submit"),
    	    document.getElementById("stats")
		  ]
    	  for(let j=0;j<btns.length;j++) {
    	    if(j==i) {
    	      btns[j].classList.add("selected_tab")
			  btns[j].setAttribute("aria-selected","true")
    	    } else {
    	      btns[j].classList.remove("selected_tab")
			  btns[j].setAttribute("aria-selected","false")
    	    }
    	  }
    	  this.selected_tab = i
    	}
    }
  }
</script>

<style scoped>
	#lecture-attendance-table {
		margin-top: 2rem;
	}

	.tabs {
	  margin-top: 5rem;
	  margin-left: 3rem;
	}

	.tab_btn {
	  background: none;
	  outline: none;
	  border: none;
	  color: #636363;
	  margin-right: 3rem;
	}

	.tab_btn h5 {
	  color: #636363;
	}

	.tab_btn.selected_tab {
	  color: #0078c2;
	  border-bottom: .2rem solid #0078c2;
	}

	.tab_btn.selected_tab h5 {
	  color: #0078c2;
	}

	.tab_btn:hover,
	.tab_btn:focus {
	  color: #636363;
	  border-bottom: .2rem solid #636363;
	}

	.tab_btn.selected_tab:hover,
	.tab_btn.selected_tab:focus {
	  color: #636363;
	  border-bottom: .2rem solid #636363;
	}

	.tab_btn.selected_tab:hover h5,
	.tab_btn.selected_tab:focus h5 {
	  color: #636363;
	}

	.tab_section {
	  margin-top: 3rem;
	  margin-left: 6rem;
	  overflow-y: auto;
	  /* height: 17rem; */
	  padding-bottom: 3rem;
	}
</style>